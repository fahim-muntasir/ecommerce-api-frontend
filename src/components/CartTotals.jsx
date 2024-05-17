import { useContext } from "react";
import "./Cart.css";
import { CartContext } from "../context/CartProvider";
import { Link, useLocation } from "react-router-dom";

const CartTotals = ({orderHandler, loading}) => {
  const location = useLocation();
  const { cartItems } = useContext(CartContext);

  const cartItemTotals = cartItems.map((item) => {
    const itemTotal = item?.product?.price * item.quantity;

    return itemTotal;
  });

  const subTotals = cartItemTotals.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  }, 0);

  const cartTotals = subTotals.toFixed(2);

  return (
    <div className="cart-totals">
      <h2 className="">Cart Total</h2>
      <table>
        <tbody>
          <tr className="cart-subtotal">
            <th>Subtotal</th>
            <td>
              <span id="subtotal">${subTotals.toFixed(2)}</span>
            </td>
          </tr>
          <tr>
            <th>Shipping</th>
            <td>
              <ul>
                <li>
                  <a href="#">Change address</a>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>Total</th>
            <td>
              <strong id="cart-total">${cartTotals}</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="checkout">
        {location?.pathname === "/checkout" ? (
          <button disabled={loading} className="checkout-btn" onClick={orderHandler} >Confirm order</button>
        ) : (
          <Link to={"/checkout"}>
            <button className="checkout-btn">Proceed to checkout</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CartTotals;
