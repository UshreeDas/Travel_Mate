import { useMemo, useState } from "react";
import TripCard from "../components/TripCard.jsx";
import FilterBar from "../components/FilterBar.jsx";
import { useTrips } from "../context/TripsContext.jsx";

export default function TripsList() {
  const { trips } = useTrips();
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
      <FilterBar query={query} setQuery={setQuery} sortKey={sortKey} setSortKey={setSortKey} />
      {visible.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-600">
          No trips found. Try clearing filters or add a new trip.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((t) => (
            <TripCard key={t.id} {...t} />
          ))}
        </div>
      )}
    </section>
  );
}
