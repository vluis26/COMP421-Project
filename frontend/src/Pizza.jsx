import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Pizza = ({ name, crust, sauce, ingredients, ingredientsString, price, base_price }) => {
    const navigate = useNavigate();
    const handlePizzaClick = () => {
        navigate("/order/extras", {
            state: { name, crust, sauce, ingredients, price}
        });
    };
    return (
        <div
            onClick={handlePizzaClick}
            className=" shadow-xl rounded-xl p-5 flex items-center justify-between hover:cursor-pointer w-96 bg-slate-50 m-3"
        >
            <div>
                <p className="font-bold text-lg p-2">{name}</p>
                <p className="font-bold text-med">Toppings:</p>
                <p className=" italic pl-3">{ingredientsString}</p>
                <p className=" italic pl-3">${base_price}</p>
            </div>
            <div className="items-center">
                <ArrowRight />
            </div>
        </div>
    );
};
export default Pizza;
