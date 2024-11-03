import PizzaCard from "./PizzaCard";
import Banner from "./Banner";

const EmployeeOrder = () => {
    return (
        <div className="w-screen h-full">
            <Banner employee={true} />
            Active orders
            <div className="flex justify-center gap-4">
                <PizzaCard
                    name="Margarita"
                    ingredients={"Tomato, Mozzarella, Basil"}
                    price={10.99}
                    employee={true}
                />
                <PizzaCard
                    name="Margarita"
                    ingredients={"Tomato, Mozzarella, Basil"}
                    price={10.99}
                    employee={true}
                />
                <PizzaCard
                    name="Margarita"
                    ingredients={"Tomato, Mozzarella, Basil"}
                    price={10.99}
                    employee={true}
                />
            </div>
        </div>
    );
};

export default EmployeeOrder;
