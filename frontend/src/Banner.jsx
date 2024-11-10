import { useState } from "react";
import bigRatBanner from "./assets/big_rat_banner.svg";
import menuIcon2 from "./assets/menu_icon_white.svg";
import menuIcon from "./assets/menu_icon_gray.svg";
import cartIcon from "./assets/cart_icon_gray.svg";
import cartIcon2 from "./assets/cart_icon_white.svg";
import personIcon from "./assets/person_icon_gray.svg";
import personIcon2 from "./assets/person_icon_white.svg";
import { Truck } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import "./Banner.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Banner = ({ employee }) => {
    const navigate = useNavigate();
    const handleCartClick = () => {
        navigate("/Cart");
    };
    const handleHomeClick = () => {
        navigate("/order");
    };
    const handleTruckClick = () => {
        navigate("/orderTracker");
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
                </div>
            </div>
        </>
    );
};
export default Banner;
