import { useLocation } from "react-router-dom";
import IngredientCard from "./IngredientCard";
import PizzaCard from "./PizzaCard";
import Banner from "./Banner";
const Extras = () => {
    const location = useLocation();
    const { name, ingredients, price } = location.state || {}; 
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
                            ingredients={ingredients || "error pizza has no ingredients :("}
                            price={price || 0.99}
                        />
                        <div className="m-5">
                            <IngredientCard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Extras;
