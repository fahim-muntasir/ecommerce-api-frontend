import { useContext } from "react";
import "./Products.css";
import PropTypes from "prop-types";
import { CartContext } from "../context/CartProvider";
import { Link } from "react-router-dom";

const ProductItem = ({ productItem }) => {
  const { cartItems, addToCart } = useContext(CartContext);

  const filteredCart = cartItems.find(
    (cartItem) => cartItem.id === productItem.id
  );

  const originalPrice = productItem.price || 0;
  const discountPercentage = productItem.discount || 0;

  //İndirimli fiyat hesaplama
  const discountedPrice =
    originalPrice - (originalPrice * discountPercentage) / 100 || 0;

  return (
    <div
      className="product-item splide__slide is-active is-visible"
      id="splide02-slide01"
    >
      <div className="productImage-container">
        <Link to={`/product/${productItem.id}`} className="product-image">
          <img src={productItem.avatar} className="product-img-1" />
          <img src={productItem.avatar} className="product-img-2" data-id="1" />
        </Link>
      </div>
      <div className="product-info">
        <a href="#" className="product-title" data-id="1">
          {productItem.title}
        </a>
        <p></p>
        <p className="item-rating">★★★★☆</p>
        <p className="item-user">4.37 (9)</p>
        <p className="item-price">${discountedPrice}</p>
        <p className="item-price-2">${originalPrice}</p>
      </div>
      <div className="product-links">
        <button
          className="links-basket"
          data-id="1"
          onClick={() =>
            addToCart({
              ...productItem,
              price: discountedPrice,
            })
          }
          disabled={filteredCart}
        >
          <i
            className="bi bi-basket"
            style={{ color: "rgba(0, 0, 0, 0.822)", fontSize: "17px" }}
          ></i>
        </button>
        <button className="links-heart">
          <i
            className="bi bi-heart-fill"
            style={{ color: "rgba(0, 0, 0, 0.822)", fontSize: "17px" }}
          ></i>
        </button>
      </div>
    </div>
  );
};

export default ProductItem;

ProductItem.propTypes = {
  productItem: PropTypes.object,
  setCartItems: PropTypes.func,
};
