import React from "react";
import { useUser } from './UserContext';
import Banner from "./Banner";
import PizzaCard from "./PizzaCard";

const Cart = () => {
    const { cart, removeFromCart } = useUser();
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

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
                                        ingredients={item.ingredients}
                                        price={item.price}
                                    />
                                    <button
                                        className="mt-3 bg-red-500 text-white rounded px-4 py-2 hover:bg-red-700"
                                        onClick={() => removeFromCart(index)}  // Remove item when clicked
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
                            <button className="bg-emerald-700 text-white rounded-xl m-5 px-5 py-2 hover:text-emerald-700 hover:bg-white font-semibold hover:border-emerald-700 border-2">
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
