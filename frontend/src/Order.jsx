import React from "react";
import Pizza from "./Pizza";
import { useNavigate } from "react-router-dom";
import Banner from "./Banner";
import PizzaCard from "./PizzaCard";
import IngredientCard from "./IngredientCard";

function Order() {
    return (
        <>
            <Banner />
            <div className="w-screen h-full bg-slate-200 flex">
                <div>
                    <h1 className="font-bold text-4xl px-5">
                        Choose your meal...
                    </h1>
                    <div className="p-5">
                        <Pizza
                            name="Margharita"
                            ingredients={"Tomato, Mozzarella, Basil"}
                        />
                        <Pizza
                            name="Margharita"
                            ingredients={"Tomato, Mozzarella, Basil"}
                        />
                        <Pizza
                            name="Margharita"
                            ingredients={"Tomato, Mozzarella, Basil"}
                        />
                        <Pizza
                            name="Margharita"
                            ingredients={"Tomato, Mozzarella, Basil"}
                        />
                        <Pizza
                            name="Margharita"
                            ingredients={"Tomato, Mozzarella, Basil"}
                        />
                    </div>
                </div>
                <div className="m-5">
                    <PizzaCard
                        name="Margharita"
                        ingredients={"Tomato, Mozzarella, Basil"}
                    />
                </div>
                <div>
                    <IngredientCard />
                </div>
            </div>
        </>
    );
}

export default Order;
