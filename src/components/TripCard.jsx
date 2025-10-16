import { Link } from "react-router-dom";
import { CalendarDays, MapPin, Trash2 } from "lucide-react";
import { fmtDate } from "../utils/format.js";

/**
 * Props:
 *  - id, title, destination, startDate, endDate, notes, cover
 *  - onDelete?: (id) => void
 */
export default function TripCard({
  id, title, destination, startDate, endDate, notes, cover, onDelete
}) {
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
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          {onDelete && (
            <button
              onClick={() => onDelete(id)}
              title="Delete trip"
              className="rounded-md p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>

        <p className="mt-1 text-xs">
          <span className="rounded-full bg-sky-50 px-2 py-0.5 text-sky-700">{destination}</span>
        </p>

        {notes && <p className="mt-2 line-clamp-2 text-sm text-slate-600">{notes}</p>}

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

        <div className="mt-4 flex gap-2">
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
