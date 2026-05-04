import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const envPath = fileURLToPath(new URL('../.env', import.meta.url));
dotenv.config({ path: envPath });

const seedData = JSON.parse(await fs.readFile(new URL('../seed-data.json', import.meta.url), 'utf8'));
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const BATCH_SIZE = 50;
let insertedCount = 0;
let duplicateCount = 0;
let errorCount = 0;

const makeKey = (item) => `${item.name}||${item.link}`;

const fetchExistingPairs = async (batch) => {
  const links = batch.map((tool) => tool.link);
  const { data, error } = await supabase
    .from('tools')
    .select('name,link')
    .in('link', links);

  if (error) {
    throw error;
  }

  return new Set((data ?? []).map((row) => `${row.name}||${row.link}`));
};

const insertBatch = async (batch) => {
  if (batch.length === 0) {
    return 0;
  }

  const { data, error } = await supabase.from('tools').insert(batch).select();

  if (error) {
    throw error;
  }

  return (data ?? []).length;
};

const run = async () => {
  console.log(`Seeding ${seedData.length} tools into Supabase...`);

  for (let i = 0; i < seedData.length; i += BATCH_SIZE) {
    const batch = seedData.slice(i, i + BATCH_SIZE);
    try {
      const existingKeys = await fetchExistingPairs(batch);
      const uniqueBatch = batch.filter((tool) => !existingKeys.has(makeKey(tool)));
      duplicateCount += batch.length - uniqueBatch.length;

      if (uniqueBatch.length === 0) {
        console.log(`Batch ${Math.floor(i / BATCH_SIZE) + 1}: all records already exist, skipping.`);
        continue;
      }

      const added = await insertBatch(uniqueBatch);
      insertedCount += added;
      console.log(`Batch ${Math.floor(i / BATCH_SIZE) + 1}: inserted ${added}, skipped ${batch.length - uniqueBatch.length}.`);
    } catch (error) {
      errorCount += 1;
      console.error(`Batch ${Math.floor(i / BATCH_SIZE) + 1} failed:`, error.message || error);

      if (error?.code === '23505') {
        for (const tool of batch) {
          try {
            const { data, error: rowError } = await supabase.from('tools').insert(tool).select().single();
            if (rowError) {
              if (rowError.code === '23505') {
                duplicateCount += 1;
                continue;
              }
              throw rowError;
            }
            insertedCount += 1;
          } catch (rowError) {
            errorCount += 1;
            console.error('Row insert failed:', rowError.message || rowError);
          }
        }
      }
    }
  }

  console.log(`Inserted: ${insertedCount}`);
  console.log(`Duplicates skipped: ${duplicateCount}`);
  console.log(`Errors: ${errorCount}`);
  process.exit(errorCount > 0 ? 1 : 0);
};

run();
