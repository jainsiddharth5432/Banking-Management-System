import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import BankingDashboard from "./pages/BankingDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/dashboard"
                element={
                    localStorage.getItem("token") &&
                    localStorage.getItem("role") === "USER"
                        ? <UserDashboard />
                        : <Navigate to="/login" replace />
                }
            />

            <Route
                path="/admin"
                element={
                    localStorage.getItem("token") &&
                    localStorage.getItem("role") === "ADMIN"
                        ? <BankingDashboard />
                        : <Navigate to="/login" replace />
                }
            />
        </Routes>
    );
}

export default App;