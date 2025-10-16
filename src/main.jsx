import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { TripsProvider } from "./context/TripsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <TripsProvider>
        <App />
      </TripsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
