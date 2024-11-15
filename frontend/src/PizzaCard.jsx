import cartoonPizza from "./assets/cartoon_pizza.png";
import { useState } from "react";
const PizzaCard = ({ name, crust, sauce, ingredients, price, employee }) => {
    const [status, setStatus] = useState("preparing");
    //TODO add a function to change the status of the order in the database
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };
    return (
        <div className="shadow-md rounded-xl p-10 bg-slate-100 w-80">
            <img src={cartoonPizza} className="w-64" />
            <p className="font-bold text-3xl">{name}</p>
            
            {/* <span className="font-bold text-xl">${price}</span> */}
            {employee && (
                <div>
                    <div className="flex flex-col justify-center">
                        <select
                            id="order-status"
                            value={status}
                            onChange={handleStatusChange}
                            className="m-2 text-lg rounded-xl bg-gradient-to-br from-yellow-300 to-yellow-600 px-5 py-2 w-44 text-center hover:cursor-pointer"
                        >
                            <option value="preparing">Preparing</option>
                            <option value="baking">Baking</option>
                            <option value="sent">Delivered</option>
                        </select>

                        <button className="m-2 text-lg rounded-xl bg-gradient-to-br from-red-400 to-red-600 px-5 py-2 text-center w-44 justify-center hover:cursor-pointer">
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default PizzaCard;
