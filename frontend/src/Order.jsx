import React, { useEffect, useState } from "react";
import Pizza from "./Pizza";
import Banner from "./Banner";

function Order() {
    const [pizzas, setPizzas] = useState({});

    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/pizzas");
    
                const text = await response.text();
                console.log("Raw response text:", text);
    
                try {
                    const data = JSON.parse(text);
                    console.log("Pizzas data:", data);
                    setPizzas(data);
                } catch (jsonError) {
                    console.error("Error parsing JSON:", jsonError);
                    throw new Error("Invalid JSON response");
                }
            } catch (error) {
                console.error("Error fetching pizza data:", error);
            }
        };
    
        fetchPizzas();
    }, []);
    

    return (
        <>
            <Banner />
            <div className="w-screen h-full bg-slate-200 flex">
                <div>
                    <h1 className="font-bold text-4xl px-5">
                        Choose your meal...
                    </h1>
                    <div className="p-5 grid grid-cols-3">
                        {/* Loop through pizza keys */}
                        {Object.keys(pizzas).map((pizzaName, index) => (
                            <Pizza
                                key={index}
                                name={pizzaName}
                                ingredients={pizzas[pizzaName].map(item => item.item).join(", ")} 
                                price={10.99} // Use your price logic here
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Order;
