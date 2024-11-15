import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import IngredientCard from "./IngredientCard";
import PizzaCard from "./PizzaCard";
import Banner from "./Banner";

const Extras = () => {
    const location = useLocation();
    const { name, crust, sauce, ingredients, price } = location.state || {};

    // State to store crusts, sauces, and loading state
    const [crusts, setCrusts] = useState([]);
    const [sauces, setSauces] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch crusts and sauces from the backend
    useEffect(() => {
        const fetchCrustsAndSauces = async () => {
            try {
                const response = await fetch("http://localhost:5000/crusts_and_sauces");
                const data = await response.json();
                setCrusts(data.crusts);
                setSauces(data.sauces);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching crusts and sauces:", error);
            }
        };

        fetchCrustsAndSauces();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="w-screen h-full bg-slate-200">
            <Banner />
            <div className="flex justify-center">
                <div>
                    <div className="font-bold text-2xl">
                        Your current selection:
                    </div>

                    <div className="flex">
                        <PizzaCard
                            name={name || "Error Pizza"}
                            crust={crust || "hmm"}
                            sauce={sauce || "hmm"}
                            ingredients={ingredients || "error pizza has no ingredients :("}
                            price={price || 0.99}
                        />
                        <div className="m-5">
                            <IngredientCard
                                crust={crust || "hmm"}
                                sauce={sauce || "hmm"}
                                ingredients={ingredients || "error pizza has no ingredients :("}
                                price={price || 0.99}
                                crusts={crusts}
                                sauces={sauces}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Extras;
