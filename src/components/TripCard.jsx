import { Link } from "react-router-dom";
import { CalendarDays, MapPin } from "lucide-react";
import { fmtDate } from "../utils/format.js";

export default function TripCard({ id, title, destination, startDate, endDate, notes, cover }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition">
      <div className="h-40 w-full overflow-hidden">
        <img
          src={cover}
          alt={title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <span className="rounded-full bg-sky-50 px-2 py-0.5 text-xs text-sky-700">
            {destination}
          </span>
        </div>

        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{notes}</p>

        <div className="mt-3 flex items-center gap-4 text-sm text-slate-700">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {destination}
          </span>
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            {fmtDate(startDate)} – {fmtDate(endDate)}
          </span>
        </div>

        <div className="mt-4">
          <Link
            to={`/trips/${id}`}
            className="inline-block rounded-lg bg-slate-900 px-3 py-1.5 text-sm text-white hover:bg-slate-800"
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  );
}
