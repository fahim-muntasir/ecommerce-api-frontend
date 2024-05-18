import { useState, useContext } from "react";
import MainLayout from "../layouts/MainLayout";
import CartTotals from "../components/CartTotals";
import AddressForm from "../components/AddressForm";
import { AuthContext } from "../context/AuthProvider";
import { CartContext } from "../context/CartProvider";
const apiUrl = import.meta.env.VITE_BASE_URL;

export default function Checkout() {
  const { accessToken, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const [isloading, setloading] = useState(false);
  // State variables to store form field values
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    area: "",
    address: "",
  });

  // Event handler to update form field values
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const orderHandler = async () => {
    setloading(true);
    console.log(formData);

    if (
      formData.name === "" ||
      formData.address === "" ||
      formData.city === "" ||
      formData.area === "" ||
      formData.phone === ""
    ) {
      setloading(false);
      return alert("Every field is required!");
    }

    const submitInfo = {
      orderInfo: {
        ...formData,
      },
      items: cartItems.map((item) => ({
        product: item.product.id,
        quantity: item.quantity,
        discount: item.product.discount,
        avatar: item.product.avatar,
        title: item.product.title,
        price: item.product.price,
      })),
    };

    try {
      const response = await fetch(`${apiUrl}/api/v1/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(submitInfo),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        window.location = data.url;
      }

      if (response.status === 401) {
        logout();
      }

      if (!response.ok) {
        throw new Error("Failed to place order");
      }
      setloading(false);
    } catch (error) {
      console.log(error);
    }

    // try {
    //   const response = await fetch(`${apiUrl}/api/order`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //     body: JSON.stringify(submitInfo),
    //   });

    //   if (response.status === 401) {
    //     logout();
    //   }

    //   if (!response.ok) {
    //     throw new Error("Failed to place order");
    //   }
    //   // Handle successful response
    //   console.log("Order placed successfully");
    //   setloading(false);
    // } catch (error) {
    //   console.error("Error placing order:", error);
    //   setloading(false);
    // }
  };

  return (
    <MainLayout>
      <section className="cart-section">
        <div className="container">
          <div className="cart-page-wrapper">
            <AddressForm
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <div className="cart-colleterals">
              <CartTotals orderHandler={orderHandler} loading={isloading} />
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
