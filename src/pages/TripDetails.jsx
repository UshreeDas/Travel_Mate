import { useParams, Link } from "react-router-dom";
import { fmtDate } from "../utils/format.js";
import { ArrowLeft } from "lucide-react";
import { useTrips } from "../context/TripsContext.jsx";

export default function TripDetails() {
  const { trips } = useTrips();
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

  return (
    <section className="space-y-4">
      <Link to="/trips" className="inline-flex items-center gap-1 text-sky-700">
        <ArrowLeft className="h-4 w-4" /> Back to trips
      </Link>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <img src={trip.cover} alt={trip.title} className="h-60 w-full object-cover" />
        <div className="p-5 space-y-2">
          <h2 className="text-2xl font-bold">{trip.title}</h2>
          <p className="text-slate-600">{trip.notes}</p>
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
