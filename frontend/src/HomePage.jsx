import "./App.css";
import cartoonPizza from "./assets/cartoon_pizza.png";
import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    };
    const handleCreateClick = () => {
        navigate("/create");
    };
    return (
        <div className="flex justify-center h-full w-full bg-gradient-to-b from-red-700 to-orange-700">
            <div className="flex flex-col justify-center w-full h-full">
                <div className="flex justify-center">
                    <img src={cartoonPizza} className=" w-1/4 justify-center" />
                </div>
                <p className="justify-center flex font-extrabold text-5xl text-yellow-400 drop-shadow-lg">
                    Welcome to Big Rat NYC Pizza
                </p>

                <div className="flex justify-center p-11">
                    <button
                        className="m-5 text-lg rounded-xl bg-gradient-to-br from-yellow-300 to-yellow-600 px-5 py-2 w-44 text-center"
                        onClick={handleLoginClick}
                    >
                        Log in
                    </button>

                    <button
                        className="m-5 text-lg rounded-xl bg-gradient-to-br from-orange-300 to-orange-600 px-5 py-2 w-44 text-center"
                        onClick={handleCreateClick}
                    >
                        Create account
                    </button>
                </div>
            </div>
        </div>
    );
}
export default HomePage;
