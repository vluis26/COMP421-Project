import { useState } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import CreateAccount from "./CreateAccount";
import Order from "./Order";
import Cart from "./Cart";
import Extras from "./Extras";
import EmployeeOrder from "./EmployeeOrder";
import OrderTracker from "./OrderTracker";
import Inventory from "./Inventory";
import { useUser } from './UserContext';
import { Navigate } from 'react-router-dom';



function App() {
    const ProtectedRoute = ({ children }) => {
        const { user } = useUser();
        if (!user) {
            return <Navigate to="/login" />;
        }
        return children;
    };
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/create" element={<CreateAccount />} />

                <Route path="/order" element={<ProtectedRoute><Order /></ProtectedRoute>} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order/extras" element={<ProtectedRoute><Extras /></ProtectedRoute>} />
                <Route path="/employee/order" element={<ProtectedRoute><EmployeeOrder /></ProtectedRoute>} />
                <Route path="/orderTracker" element={<ProtectedRoute><OrderTracker /></ProtectedRoute>} />
                <Route path="/employee/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
            </Routes>
        </>
    );
}

export default App;
