import { useParams, Link, useNavigate } from "react-router-dom";
import { fmtDate } from "../utils/format.js";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useTrips } from "../context/TripsContext.jsx";

export default function TripDetails() {
  const { trips, removeTrip } = useTrips();
  const nav = useNavigate();
  const { id } = useParams();
  const trip = trips.find((t) => t.id === id);

  if (!trip) {
    return (
      <div className="space-y-4">
        <Link to="/trips" className="inline-flex items-center gap-1 text-sky-700">
          <ArrowLeft className="h-4 w-4" /> Back to trips
        </Link>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">Trip not found.</div>
      </div>
    );
  }

  const mapQuery = encodeURIComponent(trip.destination);

  const handleDelete = () => {
    removeTrip(trip.id);
    nav("/trips");
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <Link to="/trips" className="inline-flex items-center gap-1 text-sky-700">
          <ArrowLeft className="h-4 w-4" /> Back to trips
        </Link>
        <button
          onClick={handleDelete}
          className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-red-700 hover:bg-red-100"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {trip.cover && <img src={trip.cover} alt={trip.title} className="h-60 w-full object-cover" />}
        <div className="p-5 space-y-2">
          <h2 className="text-2xl font-bold">{trip.title}</h2>
          {trip.notes && <p className="text-slate-600">{trip.notes}</p>}
          <p className="text-sm text-slate-700">
            {trip.destination} • {fmtDate(trip.startDate)} – {fmtDate(trip.endDate)}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <iframe
          title="Map"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[360px] w-full"
          src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
        />
      </div>
    </section>
  );
}
