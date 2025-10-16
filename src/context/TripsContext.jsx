import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "travelmate.trips.v1";
const TripsCtx = createContext(null);

export function TripsProvider({ children }) {
  // Load from localStorage or start empty
  const [trips, setTrips] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // Persist on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
    } catch {}
  }, [trips]);

  const addTrip = (trip) => setTrips((prev) => [...prev, trip]);
  const removeTrip = (id) => setTrips((prev) => prev.filter((t) => t.id !== id));

  return (
    <TripsCtx.Provider value={{ trips, addTrip, removeTrip, setTrips }}>
      {children}
    </TripsCtx.Provider>
  );
}

export function useTrips() {
  const ctx = useContext(TripsCtx);
  if (!ctx) throw new Error("useTrips must be used within TripsProvider");
  return ctx;
}
