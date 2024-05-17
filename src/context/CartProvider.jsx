import { createContext, useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./AuthProvider";
import { message } from "antd";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { accessToken, logout, user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const apiUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchCartProducts = async () => {
      const response = await fetch(`${apiUrl}/api/v1/users/${user?.id}/carts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 401) {
        logout();
      }

      if (response.ok) {
        const { data } = await response.json();
        setCartItems(data);
      }
    };

    if (user && accessToken) {
      fetchCartProducts();
    }
  }, [apiUrl]);

  // addto cart function
  const addToCart = async (cartItem) => {
    const submitInfo = {
      product: cartItem.id,
      quantity: cartItem.quantity || 1,
    };

    try {
      const response = await fetch(`${apiUrl}/api/v1/carts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(submitInfo),
      });

      if (response.status === 401) {
        logout();
      }

      if (response.ok) {
        const { data } = await response.json();

        const existingCartItemIndex = cartItems.findIndex(
          (item) => item.id === data.id
        );

        if (existingCartItemIndex !== -1) {
          setCartItems((prevCart) => {
            const updatedCart = [...prevCart];
            updatedCart[existingCartItemIndex] = data;
            return updatedCart;
          });
        } else {
          setCartItems((prevCart) => [...prevCart, data]);
        }

        message.success("Product added successfully!");
      } else {
        message.error("Something went wrong with cart!");
      }
    } catch (error) {
      console.log("Something went wrong with cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/carts/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 401) {
        logout();
      }

      if (response.ok) {
        const { data } = await response.json();

        const filteredCartItems = cartItems.filter((cartItem) => {
          return cartItem.id !== data.id;
        });
        setCartItems(filteredCartItems);

        message.success("Deleted successfully!");
      }else{
        message.error("Something went wrong with cart item delete!");
      }
    } catch (error) {
      console.log("Something went wrong with cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

CartProvider.propTypes = {
  children: PropTypes.node,
};
