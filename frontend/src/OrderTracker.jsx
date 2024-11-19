import { ProgressBar, Step } from "react-step-progress-bar";
import Banner from "./Banner";
import "react-step-progress-bar/styles.css";
import PizzaCard from "./PizzaCard";
import Pizza from "./Pizza";

const OrderTrackerCard = ({ name, ingredients, status }) => {
    if (!status) {
        return <div>No orders to display</div>;
    }
    return (
        <div className=" shadow-xl rounded-xl p-5 flex items-center justify-between hover:cursor-pointer w-4/5 bg-slate-50 m-5">
            <div className="w-full ">
                <p className="font-bold text-lg p-2">{name}</p>
                <p className=" italic pl-3">{ingredients}</p>
                <p className=" italic pl-3">{status}</p>
                <div className="p-2 w-full">
                    <ProgressBar
                        percent={34}
                        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
                        height={15}
                        hasStepZero={false}
                    >
                        <Step>
                            {({ accomplished }) => (
                                <div
                                    className={`w-4 h-4 rounded-full ${
                                        accomplished
                                            ? "bg-green-500"
                                            : "bg-gray-500"
                                    }`}
                                />
                            )}
                        </Step>
                        <Step>
                            {({ accomplished }) => (
                                <div
                                    className={`w-4 h-4 rounded-full ${
                                        accomplished
                                            ? "bg-green-500"
                                            : "bg-gray-500"
                                    }`}
                                />
                            )}
                        </Step>
                        <Step>
                            {({ accomplished }) => (
                                <div
                                    className={`w-4 h-4 rounded-full ${
                                        accomplished
                                            ? "bg-green-500"
                                            : "bg-gray-500"
                                    }`}
                                />
                            )}
                        </Step>
                    </ProgressBar>
                </div>
                Items:
                <div className="grid grid-cols-3 gap-3">
                    <PizzaCard
                        name={"Margarita"}
                        ingredients={"Tomato, Mozzarella, Basil"}
                        price={10.99}
                    />
                    <PizzaCard
                        name={"Margarita"}
                        ingredients={"Tomato, Mozzarella, Basil"}
                        price={10.99}
                    />
                    <PizzaCard
                        name={"Margarita"}
                        ingredients={"Tomato, Mozzarella, Basil"}
                        price={10.99}
                    />
                </div>
            </div>
        </div>
    );
};

const OrderTracker = () => {
    return (
        <div className="w-screen h-full max-w-full">
            <Banner />
            <div className="font-bold text-3xl mx-5">Your order</div>
            <div className="flex justify-center">
                <OrderTrackerCard name="Order #1" status="in queue" />
            </div>
        </div>
    );
};

export default OrderTracker;
