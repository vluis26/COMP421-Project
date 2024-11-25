import { useState } from "react";
import bigRatBanner from "./assets/big_rat_banner.svg";
import { Truck } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import "./Banner.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

const Banner = ({ employee }) => {
    const navigate = useNavigate();
    const { user, logout } = useUser();
    const handleCartClick = () => {
        navigate("/Cart");
    };
    const handleHomeClick = () => {
        if (employee) {
            navigate("/employee/inventory");
        } else {
            navigate("/order");
        } 
    };
    const handleTruckClick = () => {
        if (employee) {
            navigate("/employee/order");
        } else {
            navigate("/orderTracker");
        }  
    };
    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    return (
        <>
            <div className="flex bg-red-700 justify-between h-28 items-center">
                <img src={bigRatBanner} />
                <p
                    className=" font-bold text-yellow-200 text-5xl drop-shadow-md hover:cursor-pointer"
                    onClick={handleHomeClick}
                >
                    Big Rat NYC Pizza
                </p>
                <div className="flex fustify-between items-start">
                    <div className="mx-3">
                        <Truck
                            stroke="#fef08a"
                            size={46}
                            className="hover:cursor-pointer"
                            onClick={handleTruckClick}
                        />
                    </div>
                    {!employee && (
                        <div className="mx-8 items-center">
                            <ShoppingCart
                                onClick={handleCartClick}
                                className="hover:cursor-pointer"
                                stroke="#fef08a"
                                size={40}
                            />
                        </div>
                    )}

                {user && (
                    <div className="flex items-center space-x-4 mx-8">
                        <span className="text-yellow-200 font-bold">{user.username}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600"
                        >
                            Logout
                        </button>
                    </div>
                )}
                </div>
            </div>
        </>
    );
};
export default Banner;
