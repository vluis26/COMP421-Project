import React from "react";
import { useUser } from './UserContext';
import Banner from "./Banner";
import PizzaCard from "./PizzaCard";

const Cart = () => {
    const { cart, removeFromCart, ingredientCounts, clearCart, user } = useUser();
    const totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);

    const confirmOrder = async () => {
        try {
            // Step 1: Check inventory
            const inventoryResponse = await fetch("http://localhost:5000/check_inventory", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ingredientCounts }),
            });
    
            const inventoryData = await inventoryResponse.json();
            if (!inventoryResponse.ok) {
                const insufficientItems = inventoryData.insufficient_items || [];
                if (insufficientItems.length > 0) {
                    alert(
                        `Order failed. Insufficient ingredients: ${insufficientItems
                            .map(item => `${item.item} (${item.type}): Needed ${item.needed}, Available ${item.available}`)
                            .join(", ")}`
                    );
                } else {
                    alert(`Order failed. Reason: ${inventoryData.message || "Unknown error."}`);
                }
                return;
            }
    
            // Step 2: Add order to active_orders
            const orderData = {
                customer_id: user.username,
                quantity: cart.length,
                price: totalPrice.toFixed(2),
                status: "Queued",
            };
    
            const orderResponse = await fetch("http://localhost:5000/active_orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });
    
            const orderResult = await orderResponse.json();
            if (orderResponse.ok) {
                alert("Order confirmed and added to active orders!");
                clearCart();
            } else {
                alert(`Failed to add order to active orders. Reason: ${orderResult.message}`);
            }
        } catch (error) {
            console.error("Error confirming order:", error);
            alert("An error occurred while confirming the order.");
        }
    };
    

    return (
        <div className="w-screen h-full">
            <Banner />
            <div>
                <div className="font-bold text-2xl m-5">Your order:</div>
                {cart.length === 0 ? (
                    <div className="text-center text-gray-500 text-lg">
                        No items in your cart yet!
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-4 gap-5">
                            {cart.map((item, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <PizzaCard
                                        name={item.name}
                                        crust={item.crust}
                                        sauce={item.sauce}
                                        ingredients={item.toppings}
                                        price={item.price}
                                    />
                                    <button
                                        className="mt-3 bg-red-500 text-white rounded px-4 py-2 hover:bg-red-700"
                                        onClick={() => removeFromCart(index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center items-baseline">
                            <p className="font-bold text-xl ml-5 mt-3 text-center">
                                Total: ${isNaN(totalPrice) ? 0 : Number(totalPrice).toFixed(2)}
                            </p>
                            <button className="bg-emerald-700 text-white rounded-xl m-5 px-5 py-2 hover:text-emerald-700
                                hover:bg-white font-semibold hover:border-emerald-700 border-2"
                                onClick={confirmOrder}>
                                Confirm order
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
