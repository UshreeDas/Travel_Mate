import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrips } from "../context/TripsContext.jsx";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop";

export default function AddTrip() {
  const nav = useNavigate();
  const { addTrip } = useTrips();
  const [form, setForm] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    notes: "",
    cover: "",
  });

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.destination || !form.startDate || !form.endDate) return;
    addTrip({
      id: crypto.randomUUID(),
      ...form,
      cover: form.cover?.trim() || FALLBACK_IMG,
    });
    nav("/trips");
  };

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Add a Trip</h1>
      <form
        onSubmit={onSubmit}
        className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-1">
            <span className="text-sm">Title</span>
            <input
              name="title"
              value={form.title}
              onChange={onChange}
              className="rounded-xl border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-sky-300"
              placeholder="Goa Weekend"
              required
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm">Destination</span>
            <input
              name="destination"
              value={form.destination}
              onChange={onChange}
              className="rounded-xl border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-sky-300"
              placeholder="Goa"
              required
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm">Start Date</span>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={onChange}
              className="rounded-xl border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-pink-300"
              required
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm">End Date</span>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={onChange}
              className="rounded-xl border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-pink-300"
              required
            />
          </label>
        </div>

        <label className="grid gap-1">
          <span className="text-sm">Notes</span>
          <textarea
            name="notes"
            value={form.notes}
            onChange={onChange}
            className="min-h-24 rounded-xl border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-sky-300"
            placeholder="What to see / eat / carry"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm">Cover Image URL (optional)</span>
          <input
            name="cover"
            value={form.cover}
            onChange={onChange}
            className="rounded-xl border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-sky-300"
            placeholder="https://images.unsplash.com/photo-..."
          />
        </label>

        <button
          type="submit"
          className="w-full rounded-xl bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
        >
          Save Trip
        </button>
      </form>
    </section>
  );
}
