import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // Load user and cart from localStorage with error handling
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

    // Save user and cart to localStorage
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
    }, [user, cart]);

    // Log cart updates
    useEffect(() => {
        console.log("Cart updated:", cart);
    }, [cart]);

    // Login function
    const login = (userData) => {
        setUser(userData);
    };

    // Logout function
    const logout = () => {
        setUser(null);  // Clear user state
        localStorage.removeItem("user");  // Clear user from localStorage
        localStorage.removeItem("cart");  // Clear cart from localStorage (optional)
    };

    // Add item to cart
    const addToCart = (cartItem) => {
        const itemWithIndex = { ...cartItem, index: cart.length };  // Use the current length as the index
        setCart((prevCart) => [...prevCart, itemWithIndex]);
    };

    // Remove item from cart
    const removeFromCart = (indexToRemove) => {
        console.log("Before removing item:", cart);
        setCart((prevCart) => prevCart.filter((item, index) => index !== indexToRemove));
        console.log("After removing item:", cart);
    };

    // Clear all items in cart
    const clearCart = () => {
        console.log("Clearing Cart:", cart);
        setCart([]);
    };

    // Debugging log for user and cart states
    useEffect(() => {
        console.log("Current user state:", user);
        console.log("Current cart state:", cart);
    }, [user, cart]);

    return (
        <UserContext.Provider value={{ user, login, logout, cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
