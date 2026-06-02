// src/App.jsx

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Hero from "./pages/Hero";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerDashboard from "./pages/CustomerDashboard";
import LabourDashboard from "./pages/LabourDashboard";

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Hero />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/customer-dashboard"
          element={<CustomerDashboard />}
        />

        <Route
          path="/labour-dashboard"
          element={<LabourDashboard />}
        />

      </Routes>

    </BrowserRouter>
  );
}