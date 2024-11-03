import IngredientCard from "./IngredientCard";
import PizzaCard from "./PizzaCard";
import Banner from "./Banner";
const Extras = () => {
    return (
        //TODO allow Pizza to be chosen dynamically
        <div className="w-screen h-full bg-slate-200">
            <Banner />
            <div className="flex justify-center">
                <div>
                    <div className="font-bold text-2xl">
                        Your current selection:
                    </div>

                    <div className="flex">
                        <PizzaCard
                            name="Margarita"
                            ingredients={"Tomato, Mozzarella, Basil"}
                            price={10.99}
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
