import { useContext } from "react";
  import "./Cart.css";
  import CartItem from "./CartItem";
  import { CartContext } from "../context/CartProvider";
  import CartTotals from "./CartTotals";

  const Cart = () => {
    const { cartItems } = useContext(CartContext);
    return (
      <section className="cart-section">
        <div className="container">
          <div className="cart-page-wrapper">
            <form className="cart-form">
              <div className="shop-table-wrapper">
                <table className="shop-table">
                  <thead>
                    <tr>
                      <th className="product-thumbnail">&nbsp;</th>
                      <th className="product-thumbnail">&nbsp;</th>
                      <th className="product-name">Product</th>
                      <th className="product-price">Price</th>
                      <th className="product-quantity">Quantity</th>
                      <th className="product-total">Total</th>
                    </tr>
                  </thead>
                  <tbody className="cart-wrapper">
                    {cartItems.map((item) => (
                      <CartItem cartItem={item} key={item.id} />
                    ))}
                  </tbody>
                </table>
              </div>
            </form>
            <div className="cart-colleterals">
              <CartTotals />
            </div>
          </div>
        </div>
      </section>
    );
  };

  export default Cart;