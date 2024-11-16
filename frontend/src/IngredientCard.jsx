import React, { useEffect } from 'react';
import { useState } from "react";
import { useUser } from './UserContext';

const IngredientCard = ({
    name,
    crusts,
    sauces,
    crust,
    sauce,
    ingredients,
    price
}) => {
    console.log(crust)
    const [selectedCrust, setSelectedCrust] = useState(crust != "null" ? crust : "thick");
    const [selectedSauce, setSelectedSauce] = useState(sauce);
    const { addToCart } = useUser();
    const [ingredientAvailability, setIngredientAvailability] = useState({});
    
    
    const [selectedIngredients, setSelectedIngredients] = useState(
        ingredients ? Object.keys(ingredients).reduce((acc, ingredient) => {
            acc[ingredients[ingredient].item] = true;
            return acc;
        }, {}) : {}
    );

    const handleCrustChange = (event) => {
        const selected = event.target.value;
        setSelectedCrust(selected);
    };

    const handleSauceChange = (event) => {
        const selected = event.target.value;
        setSelectedSauce(selected);
    };

    const [p, setPrice] = useState(price || 0);

    const fetchIngredientPrice = async (ingredientType) => {
        // console.log("Fetching price for ingredient type:", ingredientType);
        try {
            const response = await fetch(`http://localhost:5000/ingredient_price?ingredientType=${ingredientType}`);
            const data = await response.json();
            // console.log("Recieved price for ingredient type:", ingredientType, " = ", data.price);
            if (response.ok) {
                return data.price;
            } else {
                console.error("Error fetching ingredient price:", data.error);
                return 0;
            }
        } catch (error) {
            console.error("Error fetching ingredient price:", error);
            return 0;
        }
    };

    const handleIngredientChange = async (ingredientType, event) => {
        const { name, checked } = event.target;
        const ingredientPrice = await fetchIngredientPrice(ingredientType);
        console.log("ingredientType: ", ingredientType, " | price: ", ingredientPrice);
        // console.log("current price before update:", p);
    
        setSelectedIngredients((prev) => {
            const updated = { ...prev, [name]: checked };
            return updated;
        });

        setPrice((prevPrice) => checked ? prevPrice + ingredientPrice : prevPrice - ingredientPrice);
    };

    useEffect(() => {
        console.log("New price: ", p);
    }, [p]);

    const handleAddToCart = () => {
        const filteredIngredients = ingredients ? Object.keys(ingredients).filter((ingredient) => {
            return selectedIngredients[ingredients[ingredient].item] === true;
        }).map((ingredient) => ingredients[ingredient]) : [];
        const cartData = {
            name: name,
            crust: selectedCrust,
            sauce: selectedSauce,
            ingredients: filteredIngredients,
            price: p
        };
        addToCart(cartData);
    };

    useEffect(() => {
        const checkIngredientAvailability = async () => {
            const availability = {};
            let newSelectedIngredients = { ...selectedIngredients };
    
            for (const ingredientKey of Object.keys(ingredients)) {
                const { item, type } = ingredients[ingredientKey];
                try {
                    const response = await fetch(
                        `http://127.0.0.1:5000/validate_item?ingred_item=${encodeURIComponent(item)}&ingred_type=${encodeURIComponent(type)}`
                    );
                    const data = await response.json();
                    const isAvailable = data.available;
                    availability[item] = isAvailable;
    
                    if (!isAvailable && newSelectedIngredients[item]) {
                        newSelectedIngredients[item] = false;
                    }
    
                    console.log(item, ": ", isAvailable);
                } catch (error) {
                    console.error(`Error checking availability for ${item}:`, error);
                    availability[item] = false;
                }
            }
    
            setIngredientAvailability(availability);
            setSelectedIngredients(newSelectedIngredients); // Update selected ingredients state only if needed
        };
            if (Object.keys(ingredients).length > 0) {
            checkIngredientAvailability();
        }
    }, [ingredients]);
    

    return (
        <div className="bg-white p-5 rounded-xl shadow-lg">
            <h2 className="font-bold text-xl mb-4">Customize Your Pizza</h2>
            <div className="p-5 grid grid-cols-2">
                <div>
            <div className="mb-4">
                <h3 className="font-medium text-lg">Choose Crust</h3>
                <div>
                    {crusts.map((crustOption) => (
                        <label key={crustOption} className="block">
                            <input
                                type="radio"
                                name="crust"
                                value={crustOption}
                                checked={selectedCrust === crustOption}
                                onChange={handleCrustChange}
                                className="mr-2"
                            />
                            {crustOption}
                        </label>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <h3 className="font-medium text-lg">Choose Sauce</h3>
                <div>
                    {sauces.map((sauceOption) => (
                        <label key={sauceOption} className="block">
                            <input
                                type="radio"
                                name="sauce"
                                value={sauceOption}
                                checked={selectedSauce === sauceOption}
                                onChange={handleSauceChange}
                                className="mr-2"
                            />
                            {sauceOption}
                        </label>
                    ))}
                </div>
            </div>
            </div>

            <div className="mb-4">
                <h3 className="font-medium text-lg">Choose Toppings</h3>
                <div>
                    {Object.keys(ingredients).map((ingredient) => {
                        const isIngredAvailable = ingredientAvailability[ingredients[ingredient].item] !== false;
                        return (
                        <label
                            key={ingredients[ingredient].item}
                            className={`block ${isIngredAvailable ? "" : "text-gray-500"}`}>
                            <input
                                type="checkbox"
                                name={ingredients[ingredient].item}
                                checked={selectedIngredients[ingredients[ingredient].item] || false}
                                onChange={(event) => handleIngredientChange(ingredients[ingredient].type, event)}
                                disabled={!isIngredAvailable}
                                className="mr-2"
                            />
                            {ingredients[ingredient].item}
                        </label>
                        );
                    })}
                </div>
            </div>
            </div>
            <div className="mt-6">
                <h3 className="font-bold text-xl px-5">
                    Item Total: <span className="font-bold text-green-700" >${isNaN(p) ? 0 : Number(p).toFixed(2)}</span>
                </h3>
            </div>
            <div className="mt-6 mx-auto w-1/2">
                <button
                    onClick={handleAddToCart}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 active:bg-green-400"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default IngredientCard;
