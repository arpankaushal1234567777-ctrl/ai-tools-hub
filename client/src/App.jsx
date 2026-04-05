import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const gradientBorder = 'border border-glass-border';

export default function App() {
  const [tools, setTools] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    link: '',
    category: '',
    tags: '',
    icon: ''
  });

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/tools`);
        setTools(res.data || []);
        setFiltered(res.data || []);
      } catch (err) {
        console.error(err);
        setError('Unable to load tools. Check server or connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  useEffect(() => {
    const term = search.toLowerCase();
    const next = tools.filter((tool) => {
      const matchesCategory = activeCategory === 'All' || tool.category?.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch = tool.name.toLowerCase().includes(term) || tool.tags?.some((t) => t.toLowerCase().includes(term));
      return matchesCategory && (term ? matchesSearch : true);
    });
    setFiltered(next);
  }, [search, activeCategory, tools]);

  const categories = useMemo(() => {
    const cats = new Set(tools.map((t) => t.category));
    return ['All', ...Array.from(cats).filter(Boolean).sort()];
  }, [tools]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const payload = {
      ...formData,
      tags: formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      const res = await axios.post(`${API_BASE}/api/tools`, payload);
      const newTool = res.data;
      setTools((prev) => [newTool, ...prev]);
      setFormData({ name: '', link: '', category: '', tags: '', icon: '' });
      setActiveCategory('All');
      setSearch('');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to add tool.');
    }
  };

  return (
    <div className="min-h-screen text-white bg-black">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">AI Tool Hub</p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight mb-3 text-white">Premium dashboard for the best AI tools</h1>
            <p className="text-neutral-400 text-base md:text-lg mt-1 mb-6">Browse, search, and launch tools in seconds.</p>
          </div>
          <div className="bg-neutral-900/60 px-5 py-3 rounded-2xl border border-neutral-800 flex items-center gap-3 shadow-lg">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <div>
              <p className="text-xs text-neutral-500">Backend status</p>
              <p className="text-sm text-white">Connected</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="bg-black border border-neutral-800 rounded-3xl p-5 lg:col-span-1 h-full sticky top-6 self-start shadow-md space-y-2 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-white">Categories</h2>
              <span className="text-xs text-neutral-500">{categories.length - 1}+</span>
            </div>
            <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1 scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-xl transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-neutral-800 text-white border-l-2 border-red-500'
                      : 'hover:bg-neutral-800 text-white/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{cat}</span>
                    {cat !== 'All' && (
                      <span className="text-xs text-neutral-500">{tools.filter((t) => t.category === cat).length}</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </aside>

          {/* Main content */}
          <main className="lg:col-span-3 space-y-8">
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-3xl p-5 flex flex-col gap-4 shadow-md transition-all duration-300 ease-out">
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <div className="flex-1">
                  <label className="text-sm text-neutral-500">Search tools</label>
                  <div className="relative mt-1">
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search by name or tag..."
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/30 transition-all duration-200 text-white placeholder:text-neutral-500"
                    />
                    <span className="absolute right-4 top-3 text-neutral-600">⌘K</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <StatCard label="Total tools" value={tools.length} />
                  <StatCard label="Filtered" value={filtered.length} />
                </div>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>

            <section className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {loading ? (
                <LoadingSkeleton />
              ) : (
                filtered.map((tool) => <ToolCard key={tool._id || tool.name} tool={tool} />)
              )}
              {!loading && filtered.length === 0 && (
                <div className="col-span-full text-center text-slate-400">No tools match that search.</div>
              )}
            </section>

            <section className="bg-neutral-900/60 border border-neutral-800 rounded-3xl p-5 shadow-md transition-all duration-300 ease-out">
              <h3 className="text-xl font-semibold mb-4 text-white">Add a tool</h3>
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. ChatGPT"
                  required
                />
                <Input
                  label="Link"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="https://..."
                  required
                />
                <Input
                  label="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="AI Writing"
                  required
                />
                <Input
                  label="Tags (comma separated)"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="chatbot, productivity"
                />
                <Input
                  label="Icon URL"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="https://logo.clearbit.com/openai.com"
                />
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-red-500 hover:bg-red-600 transition text-white font-semibold py-3 rounded-2xl shadow-lg"
                  >
                    Add tool
                  </button>
                </div>
              </form>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-neutral-900/60 rounded-2xl px-4 py-3 text-left border border-neutral-800 shadow-md">
      <p className="text-xs text-neutral-500">{label}</p>
      <p className="text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <label className="text-sm text-neutral-300 space-y-2">
      <span className="block text-neutral-500">{label}</span>
      <input
        {...props}
        className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/30 transition-all duration-200 text-white placeholder:text-neutral-500"
      />
    </label>
  );
}

function ToolCard({ tool }) {
  const [imgError, setImgError] = useState(false);
  const firstLetter = tool.name?.trim()?.[0]?.toUpperCase() || '?';
  const showIcon = Boolean(tool.icon) && !imgError;
  return (
    <div className="bg-neutral-900/60 backdrop-blur-xl border border-neutral-800 rounded-2xl p-6 flex flex-col space-y-3 shadow-lg transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl hover:border-neutral-700 opacity-0 translate-y-4 animate-[fadeIn_0.5s_ease-out_forwards]">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 p-2 flex items-center justify-center">
          {showIcon ? (
            <img
              src={tool.icon}
              alt={tool.name}
              className="w-8 h-8 object-contain rounded-lg"
              loading="lazy"
              onError={() => setImgError(true)}
            />
        ) : (
          <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-lg font-semibold">
            {firstLetter}
          </div>
        )}
        </div>
        <div>
          <p className="text-lg font-semibold leading-tight tracking-tight text-white">{tool.name}</p>
          <p className="text-sm text-neutral-400">{tool.category}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {tool.tags?.map((tag) => (
          <span key={tag} className="text-xs px-2 py-1 rounded-full bg-neutral-800 text-neutral-500">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center pt-2">
        <p className="text-xs text-neutral-500">Added {new Date(tool.createdAt).toLocaleDateString()}</p>
        <a
          href={tool.link}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 transition-all duration-200 text-sm font-medium text-white hover:scale-[1.03] active:scale-[0.97]"
        >
          Open →
        </a>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <>
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-neutral-900/60 rounded-3xl p-6 animate-pulse border border-neutral-800 space-y-3">
          <div className="flex gap-3 mb-3">
            <div className="w-12 h-12 bg-neutral-800 rounded-xl" />
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-neutral-800 rounded" />
              <div className="h-3 bg-neutral-900 rounded w-1/2" />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap mb-4">
            {[...Array(3)].map((__, idx) => (
              <div key={idx} className="h-5 bg-neutral-800 rounded-full w-16" />
            ))}
          </div>
          <div className="h-9 bg-neutral-900 rounded-xl" />
        </div>
      ))}
    </>
  );
}
