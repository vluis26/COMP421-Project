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

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/create" element={<CreateAccount />} />

                <Route path="/order" element={<Order />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order/extras" element={<Extras />} />
                <Route path="/employee/order" element={<EmployeeOrder />} />
            </Routes>
        </>
    );
}

export default App;
