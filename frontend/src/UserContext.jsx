import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem("user");
            console.log("Loaded user from localStorage:", savedUser);
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (error) {
            console.error("Error parsing user from localStorage:", error);
            return null;
        }
    });

    const [cart, setCart] = useState(() => {
        try {
            const savedCart = localStorage.getItem("cart");
            console.log("Loaded cart from localStorage:", savedCart);
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error("Error parsing cart from localStorage:", error);
            return [];
        }
    });

    const [ingredientCounts, setIngredientCounts] = useState(() => {
        try {
            const savedCounts = localStorage.getItem("ingredientCounts");
            return savedCounts ? JSON.parse(savedCounts) : {};
        } catch (error) {
            console.error("Error parsing ingredient counts from localStorage:", error);
            return {};
        }
    });

    useEffect(() => {
        console.log("Saving to localStorage: ", { user, cart });
        if (user !== null) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
        
        if (cart.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cart));
        } else {
            localStorage.removeItem("cart");
        }
        localStorage.setItem("ingredientCounts", JSON.stringify(ingredientCounts));
    }, [user, cart, ingredientCounts]);

    useEffect(() => {
        console.log("Cart updated:", cart);
    }, [cart]);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("cart");
    };

    const addToCart = (cartItem) => {
        const itemWithIndex = { ...cartItem, index: cart.length };
        updateIngredientCounts(cartItem.ingredients, "add");
        setCart((prevCart) => [...prevCart, itemWithIndex]);
    };

    const removeFromCart = (indexToRemove) => {
        const itemToRemove = cart[indexToRemove];
        updateIngredientCounts(itemToRemove.ingredients, "remove");
        setCart((prevCart) => prevCart.filter((item, index) => index !== indexToRemove));
    };

    const clearCart = () => {
        console.log("Clearing Cart:", cart);
        setCart([]);
        setIngredientCounts({});
    };

    // Debugging log
    useEffect(() => {
        console.log("Current user state:", user);
        console.log("Current cart state:", cart);
        console.log("Current ingredientCounts state:", ingredientCounts)
    }, [user, cart]);

    const updateIngredientCounts = (ingredients, action) => {
        console.log("Updating ingredient counts. Action:", action);
        console.log("Ingredients being added/removed:", ingredients);
    
        setIngredientCounts((prevCounts) => {
            const newCounts = { ...prevCounts };
    
            ingredients.forEach(({ item, type }) => {
                const key = `${item}-${type}`;
                console.log("Current key:", key);
                if (action === "add") {
                    newCounts[key] = (newCounts[key] || 0) + 1;
                } else if (action === "remove") {
                    newCounts[key] = (newCounts[key] || 0) - 1;
                    if (newCounts[key] <= 0) delete newCounts[key]; // Remove item if count is zero or less
                }
                console.log("Updated counts for key:", key, newCounts[key]);
            });
    
            return newCounts;
        });
    };

    return (
        <UserContext.Provider value={{ user, login, logout, cart, addToCart, removeFromCart, clearCart, ingredientCounts, updateIngredientCounts }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
