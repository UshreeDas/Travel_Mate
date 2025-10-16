export default function FilterBar({ query, setQuery, sortKey, setSortKey }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/70 p-3 md:flex-row md:items-center md:justify-between">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search destination or title..."
        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-sky-300"
      />
      <select
        value={sortKey}
        onChange={(e) => setSortKey(e.target.value)}
        className="rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-pink-300"
      >
        <option value="start">Sort by Start Date</option>
        <option value="end">Sort by End Date</option>
        <option value="title">Sort by Title</option>
      </select>
    </div>
  );
}
