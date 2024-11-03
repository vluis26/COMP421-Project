import React from "react";
import Pizza from "./Pizza";
import { useNavigate } from "react-router-dom";
import Banner from "./Banner";
import PizzaCard from "./PizzaCard";
import IngredientCard from "./IngredientCard";

function Order() {
    return (
        //TODO: every pizza should have their own handlePizzaClick function
        <>
            <Banner />
            <div className="w-screen h-full bg-slate-200 flex">
                <div>
                    <h1 className="font-bold text-4xl px-5">
                        Choose your meal...
                    </h1>
                    <div className="p-5 grid grid-cols-3">
                        <Pizza
                            name="Margarita"
                            ingredients={"Tomato, Mozzarella, Basil"}
                            price={10.99}
                        />
                        <Pizza
                            name="Margarita"
                            ingredients={"Tomato, Mozzarella, Basil"}
                            price={10.99}
                        />
                        <Pizza
                            name="Margarita"
                            ingredients={"Tomato, Mozzarella, Basil"}
                            price={10.99}
                        />
                        <Pizza
                            name="Margarita"
                            ingredients={"Tomato, Mozzarella, Basil"}
                            price={10.99}
                        />
                        <Pizza
                            name="Margarita"
                            ingredients={"Tomato, Mozzarella, Basil"}
                            price={10.99}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Order;
