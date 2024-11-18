import PizzaCard from "./PizzaCard";
import Banner from "./Banner";

const EmployeeOrder = () => {
    return (
        <div className="w-screen h-full">
            <Banner employee={true} />
            Active orders
            <div className="flex justify-center gap-4">
            </div>
        </div>
    );
};

export default EmployeeOrder;
