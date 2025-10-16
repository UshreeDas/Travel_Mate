import { Link, NavLink, useLocation } from "react-router-dom";
import { MapPinned } from "lucide-react";

export default function TopNav() {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-10 backdrop-blur bg-white/70 shadow-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/trips" className="flex items-center gap-2">
          <MapPinned className="h-6 w-6 text-sky-600" />
          <span className="font-semibold text-slate-900">TravelMate</span>
        </Link>
        <div className="flex items-center gap-3">
          <NavLink
            to="/trips"
            className={({ isActive }) =>
              `rounded-full px-3 py-1 text-sm ${isActive ? "bg-sky-600 text-white" : "hover:bg-slate-100"}`
            }
          >
            Trips
          </NavLink>
          <NavLink
            to="/add"
            className={({ isActive }) =>
              `rounded-full px-3 py-1 text-sm ${
                isActive ? "bg-pink-600 text-white" : "bg-pink-50 text-pink-700 hover:bg-pink-100"
              }`
            }
          >
            + Add Trip
          </NavLink>
        </div>
      </nav>
      {pathname === "/trips" && (
        <div className="bg-gradient-to-r from-sky-100 to-pink-100 border-t border-slate-200">
          <div className="mx-auto max-w-6xl px-4 py-3 text-sm text-slate-700">
            Plan, filter, and explore your trips.
          </div>
        </div>
      )}
    </header>
  );
}
