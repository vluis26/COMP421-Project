import React, { useState } from "react";

const IngredientCard = () => {
    const [toppings, setToppings] = useState({
        cheese: false,
        pepperoni: false,
        mushrooms: false,
        olives: false,
        peppers: false,
    });
    const handleChange = (event) => {
        const { name, checked } = event.target;
        setToppings((prevToppings) => ({
            ...prevToppings,
            [name]: checked,
        }));
    };

    return (
        <>
            <div>
                <h2 className="font-bold text-xl">Any extras?</h2>
                <form>
                    {Object.keys(toppings).map((topping) => (
                        <div key={topping}>
                            <label className="font-normal flex">
                                <input
                                    type="checkbox"
                                    name={topping}
                                    checked={toppings[topping]}
                                    onChange={handleChange}
                                />
                                <p className="pl-2 text-lg">
                                    {topping.charAt(0).toUpperCase() +
                                        topping.slice(1)}
                                </p>
                            </label>
                        </div>
                    ))}
                </form>
                <button className="bg-emerald-700 rounded-xl p-1 px-3 m-5 text-slate-100">
                    Add order to cart
                </button>
            </div>
        </>
    );
};

export default IngredientCard;
