import { Routes, Route, Navigate } from "react-router-dom";
import TopNav from "./components/TopNav.jsx";
import TripsList from "./pages/TripsList.jsx";
import TripDetails from "./pages/TripDetails.jsx";
import AddTrip from "./pages/AddTrip.jsx";

export default function App() {
  return (
    <div className="min-h-screen">
      <TopNav />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <Routes>
          <Route path="/" element={<Navigate to="/trips" replace />} />
          <Route path="/trips" element={<TripsList />} />
          <Route path="/trips/:id" element={<TripDetails />} />
          <Route path="/add" element={<AddTrip />} />
          <Route path="*" element={<div className="text-center py-16">Not Found</div>} />
        </Routes>
      </div>
    </div>
  );
}
