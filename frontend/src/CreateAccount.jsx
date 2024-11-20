import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ratIcon from "./assets/person_icon_white.svg";

function CreateAccount() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Creating account with:", { username, password });

        fetch("http://localhost:5000/create-account", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Account created successfully!");
                    navigate("/login"); // Redirect to login page
                } else {
                    response.json().then((data) => {
                        alert(data.message || "Failed to create account.");
                    });
                }
            })
            .catch((error) => {
                console.error("Error creating account:", error);
                alert("An error occurred. Please try again.");
            });
    };

    return (
        <div className="flex flex-col justify-center w-screen h-full bg-gradient-to-b from-red-600 to-red-800">
            <div className="flex justify-center">
                <div className="flex flex-col justify-center m-5">
                    <img src={ratIcon} className="h-36" alt="Rat Icon" />
                    <h1 className="text-5xl font-bold text-yellow-500 drop-shadow-lg">
                        Become a NYC Pizza Rat!
                    </h1>
                </div>
            </div>
            <div>
                <form onSubmit={handleSubmit} className="flex justify-center">
                    <div className="flex justify-center flex-col border-black">
                        <div className="m-5">
                            <label className="flex items-center">
                                <p className="px-3">Username:</p>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="rounded-full h-14 w-96 p-5 text-sm font-normal"
                                />
                            </label>
                        </div>
                        <div className="m-5">
                            <label className="flex items-center">
                                <p className="px-3">Password:</p>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="rounded-full h-14 w-96 p-5 text-sm font-normal"
                                />
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="m-5 text-lg rounded-xl bg-gradient-to-br from-yellow-300 to-yellow-600 px-5 py-2 text-center"
                        >
                            Join the Rat Kingdom
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateAccount;
