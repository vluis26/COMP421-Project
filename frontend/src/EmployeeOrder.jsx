import React, { useState, useEffect } from "react";
import Banner from "./Banner";

const EmployeeOrder = () => {
    const [orders, setOrders] = useState([]);
    const statuses = ["Queued", "Cooking", "Ready"];

    // Fetch all active orders
    const fetchOrders = async () => {
        try {
            const response = await fetch("http://localhost:5000/active_orders");
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        }
    };

    const handleStatusChange = async (oid, newStatus) => {
        try {
            // Update the status of the order
            const response = await fetch(`http://localhost:5000/active_orders/${oid}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }),
            });
    
            if (response.ok) {
                // Update the order in the state
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order.oid === oid ? { ...order, status: newStatus } : order
                    )
                );
    
                // Archive the order if the new status is "Ready"
                if (newStatus === "Ready") {
                    const archiveResponse = await fetch(`http://localhost:5000/archive_order/${oid}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
    
                    if (archiveResponse.ok) {
                        // Remove the order from the active orders list
                        setOrders((prevOrders) =>
                            prevOrders.filter((order) => order.oid !== oid)
                        );
                        console.log("Order archived successfully.");
                    } else {
                        console.error("Failed to archive order:", await archiveResponse.text());
                    }
                }
            } else {
                console.error("Failed to update status:", await response.text());
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };
    

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="w-screen h-full">
            <Banner employee={true} />
            <div className="p-4">
                <h1 className="text-3xl font-bold mb-6 text-center">Active Orders</h1>
                <div className="flex justify-center">
                    <table className="w-4/5 bg-white border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border font-bold text-center px-4 py-2">Order ID</th>
                                <th className="border text-center px-4 py-2">Customer</th>
                                <th className="border text-center px-4 py-2">Price</th>
                                <th className="border text-center px-4 py-2">Status</th>
                                <th className="border text-center px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.oid} className="text-center">
                                    <td className="border px-4 py-2">{order.oid}</td>
                                    <td className="border px-4 py-2">{order.customer_id}</td>
                                    <td className="border px-4 py-2">${order.price}</td>
                                    <td className="border px-4 py-2">{order.status}</td>
                                    <td className="border px-4 py-2">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.oid, e.target.value)}
                                            className="border px-2 py-1 rounded-lg"
                                        >
                                            {statuses.map((status) => (
                                                <option key={status} value={status}>
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmployeeOrder;
