import { useMemo, useState } from "react";
import TripCard from "../components/TripCard.jsx";
import FilterBar from "../components/FilterBar.jsx";
import { useTrips } from "../context/TripsContext.jsx";
import { Link } from "react-router-dom";

export default function TripsList() {
  const { trips, removeTrip } = useTrips();
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("start");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = trips.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.destination.toLowerCase().includes(q)
    );
    list.sort((a, b) => {
      if (sortKey === "title") return a.title.localeCompare(b.title);
      if (sortKey === "end") return new Date(a.endDate) - new Date(b.endDate);
      return new Date(a.startDate) - new Date(b.startDate);
    });
    return list;
  }, [trips, query, sortKey]);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Your Trips</h1>

      {trips.length > 0 && (
        <FilterBar
          query={query} setQuery={setQuery}
          sortKey={sortKey} setSortKey={setSortKey}
        />
      )}

      {visible.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-600">
          <p className="mb-3">No trips yet. Start by adding your first one.</p>
          <Link
            to="/add"
            className="inline-block rounded-xl bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
          >
            Add a Trip
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((t) => (
            <TripCard key={t.id} {...t} onDelete={removeTrip} />
          ))}
        </div>
      )}
    </section>
  );
}
