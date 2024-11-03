import Banner from "./Banner";
import PizzaCard from "./PizzaCard";
const Cart = () => {
    return (
        <div className="w-screen h-full">
            <Banner />
            <div>
                <div className="font-bold text-2xl m-5">Your order:</div>
                <div className="grid grid-cols-4 gap-5">
                    <PizzaCard
                        name="Margarita"
                        ingredients={"Tomato, Mozzarella, Basil"}
                        price={10.99}
                    />
                    <PizzaCard
                        name="Margarita"
                        ingredients={"Tomato, Mozzarella, Basil"}
                        price={10.99}
                    />
                    <PizzaCard
                        name="Margarita"
                        ingredients={"Tomato, Mozzarella, Basil"}
                        price={10.99}
                    />
                    <PizzaCard
                        name="Margarita"
                        ingredients={"Tomato, Mozzarella, Basil"}
                        price={10.99}
                    />
                    <PizzaCard
                        name="Margarita"
                        ingredients={"Tomato, Mozzarella, Basil"}
                        price={10.99}
                    />
                    <PizzaCard
                        name="Margarita"
                        ingredients={"Tomato, Mozzarella, Basil"}
                        price={10.99}
                    />
                    <PizzaCard
                        name="Margarita"
                        ingredients={"Tomato, Mozzarella, Basil"}
                        price={10.99}
                    />
                    <PizzaCard
                        name="Margarita"
                        ingredients={"Tomato, Mozzarella, Basil"}
                        price={10.99}
                    />
                </div>
                <div className="flex justify-center items-baseline">
                    <p className="font-bold text-xl ml-5 mt-3 text-center">
                        Total: $x
                    </p>
                    <button className="bg-emerald-700 text-white rounded-xl m-5 px-5 py-2 hover:text-emerald-700 hover:bg-white font-semibold hover:border-emerald-700 border-2">
                        Confirm order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
