import { useState } from "react";
import "./Login.css";
import ratIcon from "./assets/person_icon_white.svg";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useUser();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Logging in with:", { username, password });

        fetch(
            `http://127.0.0.1:5000/users?username=${encodeURIComponent(
                username
            )}&password=${encodeURIComponent(password)}`
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.found) {
                    login({ username });
                    if (data.status == "customer") {
                        navigate("/order");
                    } else if (data.status == "employee") {
                        navigate("/employee/order");
                    } else if (data.status == "manager") {
                        navigate("/employee/inventory");
                    } else {
                        alert("No status detected for this user.");
                    }
                } else {
                    alert("Username or password is incorrect.");
                }
            })
            .catch((error) => {
                console.error("Error during login:", error);
                alert("An error occurred. Please try again.");
            });
    };

    return (
        <div className="flex flex-col justify-center w-screen h-full bg-gradient-to-b from-red-600 to-red-800">
            <div className="flex justify-center">
                <div className=" flex flex-col justify-center m-5">
                    <img src={ratIcon} className="h-36" />
                    <h1 className="text-5xl font-bold text-yellow-500 drop-shadow-lg">
                        Welcome back Rat!
                    </h1>
                </div>
            </div>
            <div>
                <form
                    onSubmit={handleSubmit}
                    className=" flex justify-center  "
                >
                    <div className="flex justify-center flex-col border-black">
                        <div className="m-5 ">
                            <label className="flex items-center">
                                <p className="px-3">Username:</p>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
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
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                    className="rounded-full h-14 w-96 p-5 text-sm font-normal"
                                />
                            </label>
                        </div>
                        <div className="w-full flex justify-center">
                            <button
                                type="submit"
                                className="m-5 text-lg rounded-xl bg-gradient-to-br from-yellow-300 to-yellow-600 px-5 py-2 w-full text-center"
                            >
                                Log in
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
