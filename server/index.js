import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const toolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  link: { type: String, required: true },
  category: { type: String, required: true },
  tags: [{ type: String }],
  // Optional icon so older records remain valid
  icon: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

const Tool = mongoose.model('Tool', toolSchema);

const seedData = [
  { name: 'ChatGPT', link: 'https://chat.openai.com', category: 'AI Writing', tags: ['chatbot', 'assistant'], icon: 'https://logo.clearbit.com/openai.com' },
  { name: 'Claude', link: 'https://claude.ai', category: 'AI Writing', tags: ['assistant', 'chat'], icon: 'https://logo.clearbit.com/anthropic.com' },
  { name: 'Gemini', link: 'https://gemini.google.com', category: 'AI Writing', tags: ['google', 'chatbot'], icon: 'https://logo.clearbit.com/google.com' },
  { name: 'Perplexity', link: 'https://www.perplexity.ai', category: 'Research', tags: ['search', 'qa'], icon: 'https://logo.clearbit.com/perplexity.ai' },
  { name: 'Notion AI', link: 'https://www.notion.so/product/ai', category: 'Productivity', tags: ['notes', 'docs'], icon: 'https://logo.clearbit.com/notion.so' },
  { name: 'Canva', link: 'https://www.canva.com', category: 'Design', tags: ['graphics', 'marketing'], icon: 'https://logo.clearbit.com/canva.com' },
  { name: 'Figma', link: 'https://www.figma.com', category: 'Design', tags: ['ui', 'collaboration'], icon: 'https://logo.clearbit.com/figma.com' },
  { name: 'Adobe Firefly', link: 'https://firefly.adobe.com', category: 'Design', tags: ['image', 'generation'], icon: 'https://logo.clearbit.com/adobe.com' },
  { name: 'GitHub Copilot', link: 'https://github.com/features/copilot', category: 'Coding', tags: ['code', 'pair'], icon: 'https://logo.clearbit.com/github.com' },
  { name: 'Cursor', link: 'https://www.cursor.com', category: 'Coding', tags: ['code editor', 'ai'], icon: 'https://logo.clearbit.com/cursor.sh' },
  { name: 'Replit Ghostwriter', link: 'https://replit.com/ghostwriter', category: 'Coding', tags: ['replit', 'assistant'], icon: 'https://logo.clearbit.com/replit.com' },
  { name: 'Codeium', link: 'https://codeium.com', category: 'Coding', tags: ['autocomplete', 'code'], icon: 'https://logo.clearbit.com/codeium.com' },
  { name: 'Tabnine', link: 'https://www.tabnine.com', category: 'Coding', tags: ['autocomplete', 'ai'], icon: 'https://logo.clearbit.com/tabnine.com' },
  { name: 'Runway ML', link: 'https://runwayml.com', category: 'Video', tags: ['video', 'generation'], icon: 'https://logo.clearbit.com/runwayml.com' },
  { name: 'Descript', link: 'https://www.descript.com', category: 'Audio', tags: ['podcast', 'edit'], icon: 'https://logo.clearbit.com/descript.com' },
  { name: 'Synthesia', link: 'https://www.synthesia.io', category: 'Video', tags: ['avatar', 'video'], icon: 'https://logo.clearbit.com/synthesia.io' },
  { name: 'Midjourney', link: 'https://www.midjourney.com', category: 'Design', tags: ['art', 'image'], icon: 'https://logo.clearbit.com/midjourney.com' },
  { name: 'Leonardo AI', link: 'https://leonardo.ai', category: 'Design', tags: ['image', 'creative'], icon: 'https://logo.clearbit.com/leonardo.ai' },
  { name: 'Stable Diffusion', link: 'https://stability.ai', category: 'Design', tags: ['image', 'model'], icon: 'https://logo.clearbit.com/stability.ai' },
  { name: 'Tome', link: 'https://tome.app', category: 'Presentation', tags: ['slides', 'story'], icon: 'https://logo.clearbit.com/tome.app' },
  { name: 'Gamma', link: 'https://gamma.app', category: 'Presentation', tags: ['slides', 'deck'], icon: 'https://logo.clearbit.com/gamma.app' },
  { name: 'SlidesAI', link: 'https://www.slidesai.io', category: 'Presentation', tags: ['slides', 'google'], icon: 'https://logo.clearbit.com/slidesai.io' },
  { name: 'Jasper', link: 'https://www.jasper.ai', category: 'AI Writing', tags: ['marketing', 'copy'], icon: 'https://logo.clearbit.com/jasper.ai' },
  { name: 'Copy.ai', link: 'https://www.copy.ai', category: 'AI Writing', tags: ['copy', 'social'], icon: 'https://logo.clearbit.com/copy.ai' },
  { name: 'Writer', link: 'https://writer.com', category: 'AI Writing', tags: ['brand', 'style'], icon: 'https://logo.clearbit.com/writer.com' },
  { name: 'GrammarlyGO', link: 'https://www.grammarly.com/grammarlygo', category: 'AI Writing', tags: ['grammar', 'assistant'], icon: 'https://logo.clearbit.com/grammarly.com' },
  { name: 'Otter.ai', link: 'https://otter.ai', category: 'Audio', tags: ['transcription', 'notes'], icon: 'https://logo.clearbit.com/otter.ai' },
  { name: 'Fireflies', link: 'https://fireflies.ai', category: 'Audio', tags: ['meetings', 'notes'], icon: 'https://logo.clearbit.com/fireflies.ai' },
  { name: 'Krisp', link: 'https://krisp.ai', category: 'Audio', tags: ['noise cancel', 'calls'], icon: 'https://logo.clearbit.com/krisp.ai' },
  { name: 'ElevenLabs', link: 'https://elevenlabs.io', category: 'Audio', tags: ['voice', 'tts'], icon: 'https://logo.clearbit.com/elevenlabs.io' },
  { name: 'Lumen5', link: 'https://lumen5.com', category: 'Video', tags: ['video', 'social'], icon: 'https://logo.clearbit.com/lumen5.com' },
  { name: 'Kapwing', link: 'https://www.kapwing.com', category: 'Video', tags: ['editor', 'meme'], icon: 'https://logo.clearbit.com/kapwing.com' },
  { name: 'Pika Labs', link: 'https://pika.art', category: 'Video', tags: ['video', 'ai'], icon: 'https://logo.clearbit.com/pika.art' },
  { name: 'V0 by Vercel', link: 'https://v0.dev', category: 'Coding', tags: ['ui', 'generator'], icon: 'https://logo.clearbit.com/vercel.com' },
  { name: 'Recraft', link: 'https://www.recraft.ai', category: 'Design', tags: ['vector', 'logo'], icon: 'https://logo.clearbit.com/recraft.ai' },
  { name: 'Uizard', link: 'https://uizard.io', category: 'Design', tags: ['wireframe', 'ui'], icon: 'https://logo.clearbit.com/uizard.io' },
  { name: 'Murf AI', link: 'https://murf.ai', category: 'Audio', tags: ['voice', 'tts'], icon: 'https://logo.clearbit.com/murf.ai' },
  { name: 'Play.ht', link: 'https://play.ht', category: 'Audio', tags: ['tts', 'voice'], icon: 'https://logo.clearbit.com/play.ht' },
  { name: 'Humata', link: 'https://www.humata.ai', category: 'Research', tags: ['documents', 'qa'], icon: 'https://logo.clearbit.com/humata.ai' },
  { name: 'You.com', link: 'https://you.com', category: 'Research', tags: ['search', 'assistant'], icon: 'https://logo.clearbit.com/you.com' },
  { name: 'Phind', link: 'https://www.phind.com', category: 'Coding', tags: ['search', 'dev'], icon: 'https://logo.clearbit.com/phind.com' },
  { name: 'Metaphor', link: 'https://metaphor.systems', category: 'Research', tags: ['search', 'semantic'], icon: 'https://logo.clearbit.com/metaphor.systems' },
  { name: 'AirOps', link: 'https://www.airops.com', category: 'Automation', tags: ['workflows', 'data'], icon: 'https://logo.clearbit.com/airops.com' },
  { name: 'Zapier AI', link: 'https://zapier.com/ai', category: 'Automation', tags: ['automation', 'builder'], icon: 'https://logo.clearbit.com/zapier.com' },
  { name: 'AgentGPT', link: 'https://agentgpt.reworkd.ai', category: 'Agents', tags: ['auto', 'agent'], icon: 'https://logo.clearbit.com/reworkd.ai' },
  { name: 'Dust', link: 'https://www.dust.tt', category: 'Agents', tags: ['agents', 'workflows'], icon: 'https://logo.clearbit.com/dust.tt' },
  { name: 'LangChain Templates', link: 'https://templates.langchain.com', category: 'Coding', tags: ['starter', 'ai'], icon: 'https://logo.clearbit.com/langchain.com' },
  // New tools (deduplicated against existing list)
  { name: 'Grok AI', link: 'https://x.ai', category: 'AI Writing', tags: ['chat', 'assistant'], icon: 'https://logo.clearbit.com/x.ai' },
  { name: 'OpenAssistant', link: 'https://open-assistant.io', category: 'AI Writing', tags: ['open-source', 'assistant'], icon: 'https://logo.clearbit.com/open-assistant.io' },
  { name: 'Jan.ai', link: 'https://jan.ai', category: 'AI Writing', tags: ['chat', 'local'], icon: 'https://logo.clearbit.com/jan.ai' },
  { name: 'FreedomGPT', link: 'https://freedomgpt.com', category: 'AI Writing', tags: ['chat', 'uncensored'], icon: 'https://logo.clearbit.com/freedomgpt.com' },
  { name: 'LocalAI', link: 'https://localai.io', category: 'AI Writing', tags: ['local', 'api'], icon: 'https://logo.clearbit.com/localai.io' },
  { name: 'LM Studio', link: 'https://lmstudio.ai', category: 'AI Writing', tags: ['local', 'inference'], icon: 'https://logo.clearbit.com/lmstudio.ai' },
  { name: 'GPT4All', link: 'https://gpt4all.io', category: 'AI Writing', tags: ['local', 'models'], icon: 'https://logo.clearbit.com/gpt4all.io' },
  { name: 'Ora.sh', link: 'https://ora.sh', category: 'AI Writing', tags: ['chat', 'share'], icon: 'https://logo.clearbit.com/ora.sh' },
  { name: 'ChatHub', link: 'https://chathub.gg', category: 'AI Writing', tags: ['chat', 'multi-model'], icon: 'https://logo.clearbit.com/chathub.gg' },
  { name: 'TypingMind', link: 'https://www.typingmind.com', category: 'AI Writing', tags: ['chat', 'ui'], icon: 'https://logo.clearbit.com/typingmind.com' },
  { name: 'Sweep AI', link: 'https://sweep.dev', category: 'Coding', tags: ['pr', 'auto-fix'], icon: 'https://logo.clearbit.com/sweep.dev' },
  { name: 'Refact AI', link: 'https://refact.ai', category: 'Coding', tags: ['code', 'assistant'], icon: 'https://logo.clearbit.com/refact.ai' },
  { name: 'CodeGeeX', link: 'https://codegeex.cn', category: 'Coding', tags: ['code', 'llm'], icon: 'https://logo.clearbit.com/codegeex.cn' },
  { name: 'Blackbox AI', link: 'https://www.useblackbox.io', category: 'Coding', tags: ['search', 'autocomplete'], icon: 'https://logo.clearbit.com/useblackbox.io' },
  { name: 'AskCodi', link: 'https://www.askcodi.com', category: 'Coding', tags: ['assistant', 'ide'], icon: 'https://logo.clearbit.com/askcodi.com' },
  { name: 'Bito AI', link: 'https://www.bito.co', category: 'Coding', tags: ['assistant', 'ide'], icon: 'https://logo.clearbit.com/bito.co' },
  { name: 'CodeRabbit', link: 'https://coderabbit.ai', category: 'Coding', tags: ['code review', 'pr'], icon: 'https://logo.clearbit.com/coderabbit.ai' },
  { name: 'Ponicode', link: 'https://ponicode.com', category: 'Coding', tags: ['tests', 'generation'], icon: 'https://logo.clearbit.com/ponicode.com' },
  { name: 'Kodezi', link: 'https://kodezi.com', category: 'Coding', tags: ['debug', 'assistant'], icon: 'https://logo.clearbit.com/kodezi.com' },
  { name: 'CodiumAI', link: 'https://www.codium.ai', category: 'Coding', tags: ['tests', 'analysis'], icon: 'https://logo.clearbit.com/codium.ai' },
  { name: 'Ideogram AI', link: 'https://ideogram.ai', category: 'Design', tags: ['image', 'text-to-image'], icon: 'https://logo.clearbit.com/ideogram.ai' },
  { name: 'Artbreeder', link: 'https://www.artbreeder.com', category: 'Design', tags: ['image', 'blend'], icon: 'https://logo.clearbit.com/artbreeder.com' },
  { name: 'Fotor AI', link: 'https://www.fotor.com/features/ai', category: 'Design', tags: ['edit', 'image'], icon: 'https://logo.clearbit.com/fotor.com' },
  { name: 'Pixlr AI', link: 'https://pixlr.com/ai', category: 'Design', tags: ['edit', 'image'], icon: 'https://logo.clearbit.com/pixlr.com' },
  { name: 'ImgCreator AI', link: 'https://imgcreator.zmo.ai', category: 'Design', tags: ['image', 'generation'], icon: 'https://logo.clearbit.com/zmo.ai' },
  { name: 'Dezgo', link: 'https://dezgo.com', category: 'Design', tags: ['image', 'api'], icon: 'https://logo.clearbit.com/dezgo.com' },
  { name: 'StarryAI', link: 'https://starryai.com', category: 'Design', tags: ['image', 'art'], icon: 'https://logo.clearbit.com/starryai.com' },
  { name: 'PhotoRoom AI', link: 'https://www.photoroom.com', category: 'Design', tags: ['background', 'edit'], icon: 'https://logo.clearbit.com/photoroom.com' },
  { name: 'Clip Studio AI', link: 'https://www.clipstudio.net', category: 'Design', tags: ['illustration', 'ai'], icon: 'https://logo.clearbit.com/clipstudio.net' },
  { name: 'AI Picasso', link: 'https://aipicasso.app', category: 'Design', tags: ['image', 'creative'], icon: 'https://logo.clearbit.com/aipicasso.app' },
  { name: 'Genmo AI', link: 'https://www.genmo.ai', category: 'Video', tags: ['video', 'gen'], icon: 'https://logo.clearbit.com/genmo.ai' },
  { name: 'PixVerse AI', link: 'https://www.pixverse.ai', category: 'Video', tags: ['video', 'animation'], icon: 'https://logo.clearbit.com/pixverse.ai' },
  { name: 'DeepBrain AI', link: 'https://www.deepbrain.io', category: 'Video', tags: ['avatar', 'video'], icon: 'https://logo.clearbit.com/deepbrain.io' },
  { name: 'Colossyan', link: 'https://www.colossyan.com', category: 'Video', tags: ['avatar', 'studio'], icon: 'https://logo.clearbit.com/colossyan.com' },
  { name: 'HeyGen', link: 'https://www.heygen.com', category: 'Video', tags: ['avatar', 'video'], icon: 'https://logo.clearbit.com/heygen.com' },
  { name: 'Elai.io', link: 'https://elai.io', category: 'Video', tags: ['avatar', 'video'], icon: 'https://logo.clearbit.com/elai.io' },
  { name: 'D-ID', link: 'https://www.d-id.com', category: 'Video', tags: ['avatar', 'talking'], icon: 'https://logo.clearbit.com/d-id.com' },
  { name: 'Reface AI', link: 'https://hey.reface.ai', category: 'Video', tags: ['face-swap', 'fun'], icon: 'https://logo.clearbit.com/reface.ai' },
  { name: 'Synthesys AI', link: 'https://synthesys.io', category: 'Video', tags: ['avatar', 'voice'], icon: 'https://logo.clearbit.com/synthesys.io' },
  { name: 'Hour One AI', link: 'https://www.hourone.ai', category: 'Video', tags: ['avatar', 'video'], icon: 'https://logo.clearbit.com/hourone.ai' },
  { name: 'Peppertype AI', link: 'https://www.peppertype.ai', category: 'AI Writing', tags: ['copy', 'marketing'], icon: 'https://logo.clearbit.com/peppertype.ai' },
  { name: 'Ink AI', link: 'https://inkforall.com', category: 'AI Writing', tags: ['seo', 'copy'], icon: 'https://logo.clearbit.com/inkforall.com' },
  { name: 'Anyword', link: 'https://anyword.com', category: 'AI Writing', tags: ['copy', 'ads'], icon: 'https://logo.clearbit.com/anyword.com' },
  { name: 'Sudowrite', link: 'https://www.sudowrite.com', category: 'AI Writing', tags: ['creative', 'longform'], icon: 'https://logo.clearbit.com/sudowrite.com' },
  { name: 'Writecream', link: 'https://www.writecream.com', category: 'AI Writing', tags: ['copy', 'email'], icon: 'https://logo.clearbit.com/writecream.com' },
  { name: 'ClosersCopy', link: 'https://www.closerscopy.com', category: 'AI Writing', tags: ['copy', 'sales'], icon: 'https://logo.clearbit.com/closerscopy.com' },
  { name: 'NeuralText', link: 'https://www.neuraltext.com', category: 'AI Writing', tags: ['seo', 'content'], icon: 'https://logo.clearbit.com/neuraltext.com' },
  { name: 'Frase AI', link: 'https://www.frase.io', category: 'AI Writing', tags: ['seo', 'briefs'], icon: 'https://logo.clearbit.com/frase.io' },
  { name: 'Copysmith', link: 'https://copysmith.ai', category: 'AI Writing', tags: ['copy', 'ecommerce'], icon: 'https://logo.clearbit.com/copysmith.ai' },
  { name: 'TextCortex', link: 'https://textcortex.com', category: 'AI Writing', tags: ['rewrite', 'assistant'], icon: 'https://logo.clearbit.com/textcortex.com' },
  { name: 'Superhuman AI', link: 'https://superhuman.com', category: 'Productivity', tags: ['email', 'productivity'], icon: 'https://logo.clearbit.com/superhuman.com' },
  { name: 'Magical AI', link: 'https://www.getmagical.com', category: 'Productivity', tags: ['meetings', 'notes'], icon: 'https://logo.clearbit.com/getmagical.com' },
  { name: 'Bardeen AI', link: 'https://www.bardeen.ai', category: 'Productivity', tags: ['automation', 'browser'], icon: 'https://logo.clearbit.com/bardeen.ai' },
  { name: 'Trevor AI', link: 'https://www.trevorai.com', category: 'Productivity', tags: ['time', 'tasks'], icon: 'https://logo.clearbit.com/trevorai.com' },
  { name: 'Clockwise AI', link: 'https://www.getclockwise.com', category: 'Productivity', tags: ['calendar', 'scheduling'], icon: 'https://logo.clearbit.com/getclockwise.com' },
  { name: 'tl;dv', link: 'https://www.tldv.io', category: 'Productivity', tags: ['meetings', 'notes'], icon: 'https://logo.clearbit.com/tldv.io' },
  { name: 'Fathom AI', link: 'https://fathom.video', category: 'Productivity', tags: ['meetings', 'notes'], icon: 'https://logo.clearbit.com/fathom.video' },
  { name: 'Supernormal AI', link: 'https://www.supernormal.com', category: 'Productivity', tags: ['meetings', 'notes'], icon: 'https://logo.clearbit.com/supernormal.com' },
  { name: 'Softr AI', link: 'https://www.softr.io', category: 'Coding', tags: ['nocode', 'apps'], icon: 'https://logo.clearbit.com/softr.io' },
  { name: 'Glide AI', link: 'https://www.glideapps.com', category: 'Coding', tags: ['nocode', 'mobile'], icon: 'https://logo.clearbit.com/glideapps.com' },
  { name: 'Adalo AI', link: 'https://www.adalo.com', category: 'Coding', tags: ['nocode', 'mobile'], icon: 'https://logo.clearbit.com/adalo.com' },
  { name: 'Draftbit AI', link: 'https://draftbit.com', category: 'Coding', tags: ['nocode', 'mobile'], icon: 'https://logo.clearbit.com/draftbit.com' },
  { name: 'Appgyver AI', link: 'https://www.appgyver.com', category: 'Coding', tags: ['nocode', 'apps'], icon: 'https://logo.clearbit.com/appgyver.com' },
  { name: 'Bravo Studio AI', link: 'https://www.bravostudio.app', category: 'Coding', tags: ['mobile', 'nocode'], icon: 'https://logo.clearbit.com/bravostudio.app' },
  { name: 'Locofy AI', link: 'https://www.locofy.ai', category: 'Coding', tags: ['builder', 'codegen'], icon: 'https://logo.clearbit.com/locofy.ai' },
  { name: 'Plasmic AI', link: 'https://www.plasmic.app', category: 'Coding', tags: ['builder', 'headless'], icon: 'https://logo.clearbit.com/plasmic.app' },
  { name: 'Quest AI', link: 'https://www.quest.ai', category: 'Coding', tags: ['website', 'builder'], icon: 'https://logo.clearbit.com/quest.ai' },
  { name: 'UIzard Autodesigner', link: 'https://uizard.io', category: 'Design', tags: ['autodesign', 'ui'], icon: 'https://logo.clearbit.com/uizard.io' },
  { name: 'Resemble AI', link: 'https://www.resemble.ai', category: 'Audio', tags: ['voice', 'clone'], icon: 'https://logo.clearbit.com/resemble.ai' },
  { name: 'Coqui AI', link: 'https://coqui.ai', category: 'Audio', tags: ['tts', 'voice'], icon: 'https://logo.clearbit.com/coqui.ai' },
  { name: 'Descript AI', link: 'https://www.descript.com', category: 'Audio', tags: ['podcast', 'edit'], icon: 'https://logo.clearbit.com/descript.com' },
  { name: 'Altered AI', link: 'https://www.altered.ai', category: 'Audio', tags: ['voice', 'studio'], icon: 'https://logo.clearbit.com/altered.ai' },
  { name: 'Listnr AI', link: 'https://www.listnr.tech', category: 'Audio', tags: ['tts', 'podcast'], icon: 'https://logo.clearbit.com/listnr.tech' },
  { name: 'WellSaid Labs', link: 'https://www.wellsaidlabs.com', category: 'Audio', tags: ['tts', 'enterprise'], icon: 'https://logo.clearbit.com/wellsaidlabs.com' },
  { name: 'Voicemod AI', link: 'https://www.voicemod.net', category: 'Audio', tags: ['voice', 'changer'], icon: 'https://logo.clearbit.com/voicemod.net' },
  { name: 'Speechify', link: 'https://speechify.com', category: 'Audio', tags: ['tts', 'read'], icon: 'https://logo.clearbit.com/speechify.com' },
  { name: 'Replica Studios', link: 'https://replicastudios.com', category: 'Audio', tags: ['voice', 'actors'], icon: 'https://logo.clearbit.com/replicastudios.com' },
  { name: 'Narakeet', link: 'https://www.narakeet.com', category: 'Audio', tags: ['tts', 'video'], icon: 'https://logo.clearbit.com/narakeet.com' },
  { name: 'NotebookLM', link: 'https://notebooklm.google', category: 'Research', tags: ['notes', 'llm'], icon: 'https://logo.clearbit.com/notebooklm.google' },
  { name: 'SciSpace', link: 'https://typeset.io', category: 'Research', tags: ['papers', 'search'], icon: 'https://logo.clearbit.com/typeset.io' },
  { name: 'Litmaps', link: 'https://www.litmaps.com', category: 'Research', tags: ['literature', 'maps'], icon: 'https://logo.clearbit.com/litmaps.com' },
  { name: 'Connected Papers', link: 'https://www.connectedpapers.com', category: 'Research', tags: ['papers', 'graph'], icon: 'https://logo.clearbit.com/connectedpapers.com' },
  { name: 'Iris.ai', link: 'https://iris.ai', category: 'Research', tags: ['papers', 'search'], icon: 'https://logo.clearbit.com/iris.ai' },
  { name: 'Genei AI', link: 'https://www.genei.io', category: 'Research', tags: ['summarize', 'papers'], icon: 'https://logo.clearbit.com/genei.io' },
  { name: 'ScholarAI', link: 'https://www.scholarai.co', category: 'Research', tags: ['papers', 'qa'], icon: 'https://logo.clearbit.com/scholarai.co' },
  { name: 'Semantic Scholar AI', link: 'https://www.semanticscholar.org', category: 'Research', tags: ['papers', 'search'], icon: 'https://logo.clearbit.com/semanticscholar.org' },
  { name: 'ExplainLikeImFive AI', link: 'https://www.explainlikeimfive.ai', category: 'Research', tags: ['simplify', 'qa'], icon: 'https://logo.clearbit.com/explainlikeimfive.ai' },
  { name: 'Studyable AI', link: 'https://www.studyable.dev', category: 'Research', tags: ['study', 'flashcards'], icon: 'https://logo.clearbit.com/studyable.dev' },
  { name: 'Penpot AI', link: 'https://penpot.app', category: 'Design', tags: ['open-source', 'design'], icon: 'https://logo.clearbit.com/penpot.app' },
  { name: 'Sketch2Code', link: 'https://sketch2code.azurewebsites.net', category: 'Design', tags: ['convert', 'ui'], icon: 'https://logo.clearbit.com/azurewebsites.net' },
  { name: 'Fronty AI', link: 'https://fronty.com', category: 'Design', tags: ['html', 'from-image'], icon: 'https://logo.clearbit.com/fronty.com' },
  { name: 'Designsnap AI', link: 'https://www.designsnap.ai', category: 'Design', tags: ['ui', 'inspiration'], icon: 'https://logo.clearbit.com/designsnap.ai' },
  { name: 'VanceAI', link: 'https://vanceai.com', category: 'Design', tags: ['enhance', 'image'], icon: 'https://logo.clearbit.com/vanceai.com' },
  { name: 'Vectorizer AI', link: 'https://vectorizer.ai', category: 'Design', tags: ['vector', 'convert'], icon: 'https://logo.clearbit.com/vectorizer.ai' },
  { name: 'Brandmark AI', link: 'https://brandmark.io', category: 'Design', tags: ['logo', 'brand'], icon: 'https://logo.clearbit.com/brandmark.io' },
  { name: 'LogoAI', link: 'https://logoai.com', category: 'Design', tags: ['logo', 'brand'], icon: 'https://logo.clearbit.com/logoai.com' },
  { name: 'LookX AI', link: 'https://www.lookx.ai', category: 'Design', tags: ['fashion', 'design'], icon: 'https://logo.clearbit.com/lookx.ai' },
  { name: 'MagicStudio', link: 'https://magicstudio.com', category: 'Design', tags: ['image', 'edit'], icon: 'https://logo.clearbit.com/magicstudio.com' },
  { name: 'AutoGPT', link: 'https://autogpt.net', category: 'Agents', tags: ['agent', 'automation'], icon: 'https://logo.clearbit.com/autogpt.net' },
  { name: 'BabyAGI', link: 'https://babyagi.org', category: 'Agents', tags: ['agent', 'tasks'], icon: 'https://logo.clearbit.com/babyagi.org' },
  { name: 'SuperAGI', link: 'https://superagi.com', category: 'Agents', tags: ['agent', 'framework'], icon: 'https://logo.clearbit.com/superagi.com' },
  { name: 'GodMode AI', link: 'https://godmode.space', category: 'Agents', tags: ['agent', 'automation'], icon: 'https://logo.clearbit.com/godmode.space' },
  { name: 'MetaGPT', link: 'https://www.deepwisdom.ai', category: 'Agents', tags: ['agent', 'multi'], icon: 'https://logo.clearbit.com/deepwisdom.ai' },
  { name: 'CrewAI', link: 'https://www.crewai.com', category: 'Agents', tags: ['agent', 'collaboration'], icon: 'https://logo.clearbit.com/crewai.com' },
  { name: 'OpenDevin', link: 'https://opendevin.com', category: 'Agents', tags: ['agent', 'developer'], icon: 'https://logo.clearbit.com/opendevin.com' },
  { name: 'Devika AI', link: 'https://www.devika.ai', category: 'Agents', tags: ['agent', 'developer'], icon: 'https://logo.clearbit.com/devika.ai' },
  { name: 'Flowise AI', link: 'https://flowiseai.com', category: 'Agents', tags: ['workflow', 'builder'], icon: 'https://logo.clearbit.com/flowiseai.com' },
  { name: 'Poe by Quora', link: 'https://poe.com', category: 'AI Writing', tags: ['chatbot', 'multi-model'], icon: 'https://logo.clearbit.com/poe.com' },
  { name: 'YouChat', link: 'https://you.com/chat', category: 'Research', tags: ['chat', 'search'], icon: 'https://logo.clearbit.com/you.com' },
  { name: 'HuggingChat', link: 'https://huggingface.co/chat', category: 'AI Writing', tags: ['open-source', 'chat'], icon: 'https://logo.clearbit.com/huggingface.co' },
  { name: 'Duck.ai', link: 'https://duck.ai', category: 'AI Writing', tags: ['chat', 'search'], icon: 'https://logo.clearbit.com/duck.ai' },
  { name: 'Pi AI', link: 'https://pi.ai', category: 'AI Writing', tags: ['personal', 'chat'], icon: 'https://logo.clearbit.com/pi.ai' },
  { name: 'Sourcegraph Cody', link: 'https://sourcegraph.com/cody', category: 'Coding', tags: ['assistant', 'context'], icon: 'https://logo.clearbit.com/sourcegraph.com' },
  { name: 'Amazon CodeWhisperer', link: 'https://aws.amazon.com/codewhisperer', category: 'Coding', tags: ['autocomplete', 'aws'], icon: 'https://logo.clearbit.com/aws.amazon.com' },
  { name: 'Mutable AI', link: 'https://mutable.ai', category: 'Coding', tags: ['code', 'docs'], icon: 'https://logo.clearbit.com/mutable.ai' },
  { name: 'Codiga', link: 'https://www.codiga.io', category: 'Coding', tags: ['review', 'lint'], icon: 'https://logo.clearbit.com/codiga.io' },
  { name: 'Pieces AI', link: 'https://pieces.app', category: 'Coding', tags: ['snippets', 'context'], icon: 'https://logo.clearbit.com/pieces.app' },
  { name: 'Continue.dev', link: 'https://continue.dev', category: 'Coding', tags: ['ide', 'assistant'], icon: 'https://logo.clearbit.com/continue.dev' },
  { name: 'Mage.space', link: 'https://www.mage.space', category: 'Design', tags: ['image', 'generation'], icon: 'https://logo.clearbit.com/mage.space' },
  { name: 'Playground AI', link: 'https://playground.com', category: 'Design', tags: ['image', 'edit'], icon: 'https://logo.clearbit.com/playground.com' },
  { name: 'Craiyon', link: 'https://www.craiyon.com', category: 'Design', tags: ['image', 'ai'], icon: 'https://logo.clearbit.com/craiyon.com' },
  { name: 'DeepAI Image Generator', link: 'https://deepai.org/machine-learning-model/text2img', category: 'Design', tags: ['image', 'api'], icon: 'https://logo.clearbit.com/deepai.org' },
  { name: 'Dream by Wombo', link: 'https://dream.ai', category: 'Design', tags: ['image', 'mobile'], icon: 'https://logo.clearbit.com/dream.ai' },
  { name: 'NightCafe', link: 'https://creator.nightcafe.studio', category: 'Design', tags: ['art', 'community'], icon: 'https://logo.clearbit.com/nightcafe.studio' },
  { name: 'Lexica Art', link: 'https://lexica.art', category: 'Design', tags: ['search', 'image'], icon: 'https://logo.clearbit.com/lexica.art' },
  { name: 'Kandinsky AI', link: 'https://fusionbrain.ai', category: 'Design', tags: ['image', 'model'], icon: 'https://logo.clearbit.com/fusionbrain.ai' },
  { name: 'BlueWillow', link: 'https://www.bluewillow.ai', category: 'Design', tags: ['image', 'community'], icon: 'https://logo.clearbit.com/bluewillow.ai' },
  { name: 'Haiper AI', link: 'https://www.haiper.ai', category: 'Video', tags: ['video', 'gen'], icon: 'https://logo.clearbit.com/haiper.ai' },
  { name: 'Luma AI', link: 'https://lumalabs.ai', category: 'Video', tags: ['3d', 'video'], icon: 'https://logo.clearbit.com/lumalabs.ai' },
  { name: 'InVideo AI', link: 'https://invideo.io/ai', category: 'Video', tags: ['video', 'templates'], icon: 'https://logo.clearbit.com/invideo.io' },
  { name: 'Veed.io AI', link: 'https://www.veed.io/ai', category: 'Video', tags: ['video', 'edit'], icon: 'https://logo.clearbit.com/veed.io' },
  { name: 'Animoto AI', link: 'https://animoto.com', category: 'Video', tags: ['video', 'marketing'], icon: 'https://logo.clearbit.com/animoto.com' },
  { name: 'Fliki AI', link: 'https://fliki.ai', category: 'Video', tags: ['video', 'tts'], icon: 'https://logo.clearbit.com/fliki.ai' },
  { name: 'Rytr', link: 'https://rytr.me', category: 'AI Writing', tags: ['copy', 'shortform'], icon: 'https://logo.clearbit.com/rytr.me' },
  { name: 'Writesonic', link: 'https://writesonic.com', category: 'AI Writing', tags: ['copy', 'longform'], icon: 'https://logo.clearbit.com/writesonic.com' },
  { name: 'Simplified AI', link: 'https://simplified.com/ai', category: 'AI Writing', tags: ['copy', 'design'], icon: 'https://logo.clearbit.com/simplified.com' },
  { name: 'QuillBot', link: 'https://quillbot.com', category: 'AI Writing', tags: ['paraphrase', 'grammar'], icon: 'https://logo.clearbit.com/quillbot.com' },
  { name: 'Wordtune', link: 'https://www.wordtune.com', category: 'AI Writing', tags: ['rewrite', 'summarize'], icon: 'https://logo.clearbit.com/wordtune.com' },
  { name: 'HyperWrite', link: 'https://hyperwriteai.com', category: 'AI Writing', tags: ['assistant', 'browser'], icon: 'https://logo.clearbit.com/hyperwriteai.com' },
  { name: 'Taskade AI', link: 'https://www.taskade.com/ai', category: 'Productivity', tags: ['notes', 'tasks'], icon: 'https://logo.clearbit.com/taskade.com' },
  { name: 'Beautiful.ai', link: 'https://www.beautiful.ai', category: 'Productivity', tags: ['presentations', 'slides'], icon: 'https://logo.clearbit.com/beautiful.ai' },
  { name: 'Motion AI', link: 'https://www.usemotion.com', category: 'Productivity', tags: ['calendar', 'tasks'], icon: 'https://logo.clearbit.com/usemotion.com' },
  { name: 'Mem AI', link: 'https://get.mem.ai', category: 'Productivity', tags: ['notes', 'personal'], icon: 'https://logo.clearbit.com/mem.ai' },
  { name: 'Rewind AI', link: 'https://www.rewind.ai', category: 'Productivity', tags: ['recall', 'search'], icon: 'https://logo.clearbit.com/rewind.ai' },
  { name: 'ClickUp AI', link: 'https://clickup.com/ai', category: 'Productivity', tags: ['tasks', 'docs'], icon: 'https://logo.clearbit.com/clickup.com' },
  { name: 'Durable AI', link: 'https://durable.co', category: 'Coding', tags: ['website', 'builder'], icon: 'https://logo.clearbit.com/durable.co' },
  { name: 'Framer AI', link: 'https://www.framer.com/ai', category: 'Design', tags: ['website', 'design'], icon: 'https://logo.clearbit.com/framer.com' },
  { name: '10Web AI', link: 'https://10web.io/ai', category: 'Coding', tags: ['wordpress', 'builder'], icon: 'https://logo.clearbit.com/10web.io' },
  { name: 'Bookmark AI', link: 'https://www.bookmark.com', category: 'Coding', tags: ['website', 'builder'], icon: 'https://logo.clearbit.com/bookmark.com' },
  { name: 'Zyro AI', link: 'https://zyro.com', category: 'Coding', tags: ['website', 'builder'], icon: 'https://logo.clearbit.com/zyro.com' },
  { name: 'Hostinger AI Builder', link: 'https://www.hostinger.com/website-builder/ai', category: 'Coding', tags: ['website', 'builder'], icon: 'https://logo.clearbit.com/hostinger.com' },
  { name: 'TeleportHQ', link: 'https://teleporthq.io', category: 'Coding', tags: ['low-code', 'builder'], icon: 'https://logo.clearbit.com/teleporthq.io' },
  { name: 'Builder.io AI', link: 'https://www.builder.io/ai', category: 'Coding', tags: ['headless', 'builder'], icon: 'https://logo.clearbit.com/builder.io' },
  { name: 'Dora AI', link: 'https://www.dora.run', category: 'Coding', tags: ['3d', 'website'], icon: 'https://logo.clearbit.com/dora.run' },
  { name: 'Webflow AI', link: 'https://webflow.com/ai', category: 'Coding', tags: ['website', 'designer'], icon: 'https://logo.clearbit.com/webflow.com' },
  { name: 'Riffusion', link: 'https://www.riffusion.com', category: 'Audio', tags: ['music', 'gen'], icon: 'https://logo.clearbit.com/riffusion.com' },
  { name: 'AIVA', link: 'https://www.aiva.ai', category: 'Audio', tags: ['compose', 'music'], icon: 'https://logo.clearbit.com/aiva.ai' },
  { name: 'Soundraw', link: 'https://soundraw.io', category: 'Audio', tags: ['music', 'generator'], icon: 'https://logo.clearbit.com/soundraw.io' },
  { name: 'Boomy', link: 'https://boomy.com', category: 'Audio', tags: ['music', 'ai'], icon: 'https://logo.clearbit.com/boomy.com' },
  { name: 'Lalal.ai', link: 'https://www.lalal.ai', category: 'Audio', tags: ['stem', 'removal'], icon: 'https://logo.clearbit.com/lalal.ai' },
  { name: 'Cleanvoice AI', link: 'https://cleanvoice.ai', category: 'Audio', tags: ['podcast', 'cleanup'], icon: 'https://logo.clearbit.com/cleanvoice.ai' },
  { name: 'Voice.ai', link: 'https://voice.ai', category: 'Audio', tags: ['voice', 'changer'], icon: 'https://logo.clearbit.com/voice.ai' },
  { name: 'Elicit', link: 'https://elicit.org', category: 'Research', tags: ['literature', 'search'], icon: 'https://logo.clearbit.com/elicit.org' },
  { name: 'Consensus AI', link: 'https://consensus.app', category: 'Research', tags: ['papers', 'qa'], icon: 'https://logo.clearbit.com/consensus.app' },
  { name: 'Scite AI', link: 'https://scite.ai', category: 'Research', tags: ['citations', 'papers'], icon: 'https://logo.clearbit.com/scite.ai' },
  { name: 'Explainpaper', link: 'https://www.explainpaper.com', category: 'Research', tags: ['paper', 'simplify'], icon: 'https://logo.clearbit.com/explainpaper.com' },
  { name: 'Scholarcy', link: 'https://www.scholarcy.com', category: 'Research', tags: ['summary', 'papers'], icon: 'https://logo.clearbit.com/scholarcy.com' },
  { name: 'Paperpile AI', link: 'https://paperpile.com', category: 'Research', tags: ['reference', 'manage'], icon: 'https://logo.clearbit.com/paperpile.com' },
  { name: 'Research Rabbit', link: 'https://www.researchrabbit.ai', category: 'Research', tags: ['discovery', 'network'], icon: 'https://logo.clearbit.com/researchrabbit.ai' },
  { name: 'ChatPDF', link: 'https://www.chatpdf.com', category: 'Research', tags: ['pdf', 'qa'], icon: 'https://logo.clearbit.com/chatpdf.com' },
  { name: 'AskYourPDF', link: 'https://askyourpdf.com', category: 'Research', tags: ['pdf', 'chat'], icon: 'https://logo.clearbit.com/askyourpdf.com' },
  { name: 'Galileo AI', link: 'https://www.usegalileo.ai', category: 'Design', tags: ['ui', 'copy'], icon: 'https://logo.clearbit.com/usegalileo.ai' },
  { name: 'Visily AI', link: 'https://www.visily.ai', category: 'Design', tags: ['wireframe', 'ui'], icon: 'https://logo.clearbit.com/visily.ai' },
  { name: 'Khroma AI', link: 'https://khroma.co', category: 'Design', tags: ['colors', 'palette'], icon: 'https://logo.clearbit.com/khroma.co' },
  { name: 'Looka AI', link: 'https://looka.com', category: 'Design', tags: ['logo', 'brand'], icon: 'https://logo.clearbit.com/looka.com' },
  { name: 'Designs.ai', link: 'https://designs.ai', category: 'Design', tags: ['logo', 'video'], icon: 'https://logo.clearbit.com/designs.ai' },
  { name: 'Remove.bg', link: 'https://www.remove.bg', category: 'Design', tags: ['background', 'image'], icon: 'https://logo.clearbit.com/remove.bg' },
  { name: 'Cleanup.pictures', link: 'https://cleanup.pictures', category: 'Design', tags: ['retouch', 'image'], icon: 'https://logo.clearbit.com/cleanup.pictures' },
  { name: 'Bolt.new', link: 'https://bolt.new', category: 'Coding', tags: ['scaffold', 'nextjs'], icon: 'https://logo.clearbit.com/bolt.new' },
  { name: 'AutoDraw', link: 'https://www.autodraw.com', category: 'Design', tags: ['sketch', 'vector'], icon: 'https://logo.clearbit.com/autodraw.com' },
  { name: 'Clipdrop', link: 'https://clipdrop.co', category: 'Design', tags: ['image', 'cleanup'], icon: 'https://logo.clearbit.com/clipdrop.co' },
  { name: 'Replicate', link: 'https://replicate.com', category: 'Coding', tags: ['models', 'deploy'], icon: 'https://logo.clearbit.com/replicate.com' },
  { name: 'HuggingFace Spaces', link: 'https://huggingface.co/spaces', category: 'Coding', tags: ['demo', 'host'], icon: 'https://logo.clearbit.com/huggingface.co' },
  { name: 'Playground OpenAI', link: 'https://platform.openai.com/playground', category: 'AI Writing', tags: ['playground', 'openai'], icon: 'https://logo.clearbit.com/openai.com' },
  { name: 'DeepL AI', link: 'https://www.deepl.com/translator', category: 'Productivity', tags: ['translate', 'writing'], icon: 'https://logo.clearbit.com/deepl.com' },
  { name: 'Tidio AI', link: 'https://www.tidio.com/ai', category: 'Productivity', tags: ['chatbot', 'support'], icon: 'https://logo.clearbit.com/tidio.com' },
  { name: 'Chatbase', link: 'https://www.chatbase.co', category: 'Productivity', tags: ['chatbot', 'kb'], icon: 'https://logo.clearbit.com/chatbase.co' },
];

async function seedTools() {
  const existing = await Tool.find({}, { name: 1, link: 1 }).lean();
  const seen = new Set([
    ...existing.map((d) => d.name?.toLowerCase()),
    ...existing.map((d) => d.link?.toLowerCase()),
  ]);

  const missing = seedData.filter(
    (t) =>
      !seen.has(t.name.toLowerCase()) &&
      !seen.has(t.link.toLowerCase())
  );

  if (missing.length) {
    await Tool.insertMany(
      missing.map((t) => ({
        ...t,
        icon: t.icon || `https://logo.clearbit.com/${new URL(t.link).hostname}`,
      }))
    );
    console.log(`Seeded ${missing.length} new tools`);
  } else {
    console.log('Seed data already present, no new tools added');
  }
}

app.get('/api/tools', async (_req, res) => {
  const tools = await Tool.find().sort({ createdAt: -1 });
  res.json(tools);
});

app.get('/api/tools/category/:category', async (req, res) => {
  const { category } = req.params;
  const tools = await Tool.find({ category: { $regex: new RegExp(`^${category}$`, 'i') } }).sort({ createdAt: -1 });
  res.json(tools);
});

app.post('/api/tools', async (req, res) => {
  try {
    const { name, link, category, tags = [], icon } = req.body;
    if (!name || !link || !category) {
      return res.status(400).json({ message: 'name, link, and category are required' });
    }
    const tool = new Tool({
      name,
      link,
      category,
      tags: Array.isArray(tags) ? tags : [],
      icon,
    });
    await tool.save();
    return res.status(201).json(tool);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to save tool' });
  }
});

app.get('/', (_req, res) => {
  res.send('AI Tool Hub API');
});

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ai-tool-hub';

mongoose
  .connect(MONGO_URI, { serverSelectionTimeoutMS: 8000 })
  .then(async () => {
    console.log('MongoDB connected');
    await seedTools();
    app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('Mongo connection error', err.message);
    process.exit(1);
  });
