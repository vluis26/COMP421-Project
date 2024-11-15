import { useState } from "react";

const IngredientCard = ({
    crusts,
    sauces,
    crust,
    sauce,
    ingredients,
    price
}) => {
    
    const [selectedCrust, setSelectedCrust] = useState(crust);
    const [selectedSauce, setSelectedSauce] = useState(sauce);
    
    // Convert ingredients dictionary into a format for checkboxes (default all to true)
    const [selectedIngredients, setSelectedIngredients] = useState(
        ingredients ? Object.keys(ingredients).reduce((acc, ingredient) => {
            acc[ingredient] = true; // Default all ingredients to true (checked)
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

    const [p, setPrice] = useState(price); // Assuming base price is $10

    // Function to handle ingredient change (add/remove ingredient)
    const handleIngredientChange = async (event) => {
        const { name, checked } = event.target;

        // Fetch price for the ingredient
        const ingredientPrice = await fetchIngredientPrice(name);

        // Update selected ingredients state
        setSelectedIngredients((prev) => {
            const updated = { ...prev, [name]: checked };

            // Adjust price based on whether ingredient is selected or deselected
            if (checked) {
                setPrice((prevPrice) => prevPrice + ingredientPrice); // Increase price if checked
            } else {
                setPrice((prevPrice) => prevPrice - ingredientPrice); // Decrease price if unchecked
            }

            return updated;
        });
    };

    const handleAddToCart = () => {
        // Create an object representing the current selection
        const cartData = {
            crust: selectedCrust,
            sauce: selectedSauce,
            ingredients: Object.keys(selectedIngredients).filter(
                (ingredient) => selectedIngredients[ingredient]
            ),
        };
        onAddToCart(cartData);
    }

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
                <h3 className="font-medium text-lg">Choose Ingredients</h3>
                <div>
                    {Object.keys(ingredients).map((ingredient) => (
                        <label key={ingredient} className="block">
                            <input
                                type="checkbox"
                                name={ingredient}
                                checked={selectedIngredients[ingredient]}
                                onChange={handleIngredientChange}
                                className="mr-2"
                            />
                            {ingredients[ingredient].item}
                        </label>
                    ))}
                </div>
            </div>
            </div>
            <div className="mt-6">
                <h3 className="font-bold text-xl px-5">
                    Item Total: <text className="font-bold text-green-700" >{p}</text>
                </h3>
            </div>
            <div className="mt-6 mx-auto w-1/2">
                <button
                    onClick={handleAddToCart}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default IngredientCard;
