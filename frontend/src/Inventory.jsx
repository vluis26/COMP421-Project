import { useState, useEffect } from "react";
import Banner from "./Banner";

const Item = ({ item, type, quantity, price, onPurchase }) => {
    const [inputQuantity, setInputQuantity] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputQuantity || inputQuantity <= 0) {
            alert("Please enter a valid quantity.");
            return;
        }
        onPurchase(item, type, inputQuantity);
        setInputQuantity(""); // Reset the input field after purchase
    };

    return (
        <tr>
            <td className="border px-4 py-2">{item}</td>
            <td className="border px-4 py-2">{type}</td>
            <td className="border px-4 py-2">{quantity}</td>
            <td className="border px-4 py-2">${price.toFixed(2)}</td>
            <td className="border px-4 py-2">
                <form className="flex justify-center" onSubmit={handleSubmit}>
                    <input
                        type="number"
                        name="quantity"
                        className="border border-black mr-2 px-2"
                        value={inputQuantity}
                        onChange={(e) => setInputQuantity(e.target.value)}
                    />
                    <input
                        type="submit"
                        value="Purchase"
                        className="rounded-xl bg-emerald-500 px-5 hover:cursor-pointer text-white"
                    />
                </form>
            </td>
        </tr>
    );
};

const Inventory = () => {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch inventory data from backend
        fetch("http://127.0.0.1:5000/inventory")
            .then((response) => response.json())
            .then((data) => {
                setInventory(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching inventory:", error);
                setLoading(false);
            });
    }, []);

    const handlePurchase = async (item, type, quantity) => {
        try {
            const response = await fetch(
                "http://127.0.0.1:5000/update_inventory",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        item,
                        type,
                        quantity: parseInt(quantity, 10),
                    }),
                }
            );

            const data = await response.json();

            if (data.success) {
                alert(data.message);
                // Refresh inventory after purchase
                fetch("http://127.0.0.1:5000/inventory")
                    .then((response) => response.json())
                    .then((data) => setInventory(data))
                    .catch((error) =>
                        console.error("Error refreshing inventory:", error)
                    );
            } else {
                alert(data.message || "Failed to update inventory.");
            }
        } catch (error) {
            console.error("Error updating inventory:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="w-screen h-full">
            <Banner employee={true} />
            <div className="font-bold text-3xl text-center my-5">
                Store Inventory
            </div>
            <div className="flex justify-center my-5">
                <table className="w-4/5 bg-white border-collapse">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2 font-bold text-center">
                                Item
                            </th>
                            <th className="border px-4 py-2 text-center">
                                Type
                            </th>
                            <th className="border px-4 py-2 text-center">
                                Quantity
                            </th>
                            <th className="border px-4 py-2 text-center">
                                Price
                            </th>
                            <th className="border px-4 py-2 text-center">
                                Add items
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="text-center py-4">
                                    Loading...
                                </td>
                            </tr>
                        ) : (
                            inventory.map((item, index) => (
                                <Item
                                    key={index}
                                    item={item.item}
                                    type={item.type}
                                    quantity={item.quantity}
                                    price={0} // Replace with actual price if available
                                    onPurchase={handlePurchase}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Inventory;
