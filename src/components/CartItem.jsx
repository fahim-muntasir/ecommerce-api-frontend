import { useContext } from "react";
import "./Cart.css";
import PropTypes from "prop-types";
import { CartContext } from "../context/CartProvider";
import { Link } from "react-router-dom"

const CartItem = ({ cartItem }) => {
  const { removeFromCart } = useContext(CartContext);

  return (
    <tr className="cart-item" key={cartItem.id}>
      <td></td>
      <td className="cart-image">
        <Link to={`/product/${cartItem?.product.id}`}>
          <img src={cartItem?.product?.avatar[0]} alt="" />
        </Link>
      </td>
      <td className="cart-item-title">{cartItem.name}</td>
      <td>${cartItem?.product.price.toFixed(2)}</td>
      <td className="product-quantity">{cartItem?.quantity}</td>
      <td className="product-total">
        ${(cartItem?.quantity * cartItem?.product?.price)?.toFixed(2)}
      </td>
      <td className="trash-bin">
        <i
          className="bi bi-trash3 delete-cart"
          onClick={() => removeFromCart(cartItem.id)}
        ></i>
      </td>
    </tr>
  );
};

export default CartItem;

CartItem.propTypes = {
  cartItem: PropTypes.object,
};
