import React, { createContext, useContext, useEffect, useState } from "react";
import { seedTrips } from "../data/trips.js";

const STORAGE_KEY = "travelmate.trips.v1";
const TripsCtx = createContext(null);

export function TripsProvider({ children }) {
  const [trips, setTrips] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      if (Array.isArray(parsed) && parsed.length) return parsed;
    } catch {}
    return seedTrips; // first load gets seed data
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
    } catch {}
  }, [trips]);

  const reset = () => setTrips(seedTrips);

  return (
    <TripsCtx.Provider value={{ trips, setTrips, reset }}>
      {children}
    </TripsCtx.Provider>
  );
}

export function useTrips() {
  const ctx = useContext(TripsCtx);
  if (!ctx) throw new Error("useTrips must be used within TripsProvider");
  return ctx;
}
