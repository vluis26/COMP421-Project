import Banner from "./Banner";
import { useEffect, useState } from "react";
import axios from 'axios'; // Importing Axios

const OrderTrackerCard = ({ oid, quantity, price, status }) => {
    if (!status) {
        return <div>No orders to display</div>;
    }

    const getProgressPercentage = (status) => {
        switch (status) {
            case "Queued":
                return 33;
            case "Cooking":
                return 66;
            case "Delivered":
                return 100;
            default:
                return 0;
        }
    };

    const progressPercent = getProgressPercentage(status);

    return (
        <div className="shadow-xl rounded-xl p-5 flex items-center justify-between hover:cursor-pointer w-4/5 bg-slate-50 m-5">
            <div className="w-full">
                <p className="font-bold text-lg p-2">{oid}</p>
                <p className="italic pl-3">{quantity} Item(s)</p>
                <p className="italic pl-3">{status}</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="h-2 rounded-full"
                        style={{
                            width: `${progressPercent}%`,
                            background: "linear-gradient(to right, #fefb72, #f0bb31)",
                        }}
                    ></div>
                </div>

                <div className="p-2 w-full mt-3">
                    <div>Price:</div>
                    <div className="grid grid-cols-3 gap-3">
                        ${isNaN(price) ? 0 : Number(price).toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    );
};

const OrderTracker = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("http://localhost:5000/orders"); // Endpoint for all orders
                if (response.data) {
                    setOrders(response.data);
                } else {
                    console.error("No orders found");
                    setOrders([]);
                }
            } catch (error) {
                console.error("Error fetching orders data:", error.message);
                setOrders([]);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="w-screen h-full max-w-full">
            <Banner />
            <div className="font-bold text-3xl mx-5">Your orders</div>
            <div className="flex justify-center flex-wrap">
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <OrderTrackerCard
                            key={order.oid}
                            oid={`Order #${order.oid}`}
                            quantity={order.quantity || 0}
                            price={order.price}
                            status={order.status}
                        />
                    ))
                ) : (
                    <div>No orders to display!</div>
                )}
            </div>
        </div>
    );
};

export default OrderTracker;
