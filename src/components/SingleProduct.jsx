import "./SingleProduct.css";
import { useContext } from "react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { CartContext } from "../context/CartProvider";
import { useNavigate } from "react-router-dom";
// import Markdown from "react-markdown";
// import remarkGfm from "remark-gfm";
import ReactQuill from "react-quill";
import $ from "jquery";

const SingleProduct = ({ singleProduct }) => {
  console.log("singleProductInfo:", singleProduct);
  const { cartItems, addToCart } = useContext(CartContext);
  const [activeImg, setActiveImg] = useState({
    img: singleProduct.avatar[0],
    imgIndex: 0,
  });
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  const originalPrice = singleProduct.price || 0;
  const discountPercentage = singleProduct.discount || 0;

  //İndirimli fiyat hesaplama
  const discountedPrice =
    originalPrice - (originalPrice * discountPercentage) / 100 || 0;

  const filteredCart = cartItems.find(
    (cartItem) => cartItem.id === singleProduct.id
  );

  const handleQtyPlus = () => {
    setQuantity(Math.min(quantity + 1, 9));
  };

  const handleQtyMinus = () => {
    setQuantity(Math.max(quantity - 1, 1));
  };

  useEffect(() => {
    $("#detailsjs").on("click", function () {
      $("#summaryjs").slideToggle();
    });

    $("#detailsjs2").on("click", function () {
      $("#summaryjs2").slideToggle();
    });

    return () => {
      $("#detailsjs").off("click");
      $("#detailsjs2").off("click");
    };
  }, []);

  return (
    <section className="single-product">
      <div className="container">
        <div className="single-product-wrapper">
          <div className="single-topbar">
            <nav className="breadcrumb">
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Products</a>
                </li>
                <li>
                  <a href="#">Medicine</a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="single-content">
            <main className="site-main">
              <div id="productgal" className="product-gallery">
                <div className="single-image-wrapper">
                  <img src={`${activeImg.img}`} id="single-image" alt="" />
                </div>
                <Splide
                  options={{
                    type: "carousel",
                    perPage: 4,
                    perMove: 1,
                    direction: "ttb",
                    height: "45.1rem",
                    width: "8rem",
                    pagination: false,
                    drag: false,
                    breakpoints: {
                      768: {
                        direction: "ltr",
                        height: "5.7rem",
                        width: "100%",
                        drag: true,
                      },
                      992: {
                        height: "10rem",
                        width: "100%",
                        direction: "ltr",
                      },
                      1200: {
                        height: "7rem",
                        width: "100%",
                        direction: "ltr",
                      },
                    },
                    padding: {
                      bottom: "1rem",
                    },
                  }}
                >
                  <SplideTrack>
                    <div className="gallery-thumbs">
                      {singleProduct.avatar.map((itemImg, index) => (
                        <div
                          className="thumb"
                          key={index}
                          onClick={() =>
                            setActiveImg({
                              img: itemImg,
                              imgIndex: index,
                            })
                          }
                        >
                          <SplideSlide>
                            <img
                              className={`img-fluid ${
                                itemImg === activeImg ? "active" : ""
                              }`}
                              src={`${itemImg}`}
                            />
                          </SplideSlide>
                        </div>
                      ))}
                    </div>
                  </SplideTrack>
                </Splide>
              </div>

              <div className="product-info">
                <h1 className="product-title">{singleProduct.name}</h1>
                <div className="reviews">
                  <p className="item-rating">★★★★☆</p>
                  <p className="item-reviews">(2)</p>
                </div>
                <div className="product-newPrice">
                  <strong className="product-price">€{discountedPrice}</strong>{" "}
                  &nbsp;
                  <del className="product-price">€{singleProduct?.price}</del>
                </div>
                <div className="product-desc">
                  <div className="product-desc-title">
                    {singleProduct?.title}
                  </div>
                  <div className="product-desc-content">
                    <ReactQuill
                      value={singleProduct?.description}
                      readOnly={true}
                      theme={"bubble"}
                    />
                  </div>
                </div>
                <div className="cargo-wrapper">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    role="presentation"
                    className="icon icon-package"
                    viewBox="0 0 64 64"
                  >
                    <defs></defs>
                    <path
                      className="a"
                      d="M32 54.52L10 41.95v-19.9L32 9.48l22 12.57v19.9L32 54.52z"
                    ></path>
                    <path
                      className="a"
                      d="M32 54.52v-19.9l22-12.57M32 34.62L10 22.05M41.7 15.02L21 28.33v8.38"
                    ></path>
                  </svg>
                  <h4>Free Shipping</h4>
                </div>
                <div className="single-add-wrapper">
                  <div className="qty-wrapper">
                    <button className="qty-minus" onClick={handleQtyMinus}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 448 512"
                      >
                        <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                      </svg>
                    </button>
                    <input
                      id="quantity"
                      className="single-quantity"
                      type="text"
                      min="1"
                      value={quantity}
                      max="9"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                    <button className="qty-plus" onClick={handleQtyPlus}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 448 512"
                      >
                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                      </svg>
                    </button>
                  </div>
                  {filteredCart && (
                    <button
                      id="single-add-cart"
                      href="#"
                      className="single-add"
                      onClick={() => navigate("/cart")}
                    >
                      Go to cart
                    </button>
                  )}
                  {!filteredCart && (
                    <button
                      id="single-add-cart"
                      href="#"
                      className="single-add"
                      onClick={() =>
                        addToCart({
                          ...singleProduct,
                          quantity,
                          price: discountedPrice,
                        })
                      }
                    >
                      Add to cart
                    </button>
                  )}
                </div>
                <div className="wishlist-wrapper">
                  <a className="single-wishlist" href="#">
                    <i className="bi bi-heart"></i>Add to Wishlist
                  </a>
                </div>
                <div className="product-details-wrapper">
                  <div id="detailsjs">
                    <summary>More product details</summary>
                    <div className="summarytext" id="summaryjs">
                      <ReactQuill
                        value={singleProduct?.descripiton}
                        readOnly={true}
                        theme={"bubble"}
                      />
                    </div>
                  </div>
                </div>
                <div className="product-details-wrapper pdw2">
                  <div id="detailsjs2">
                    <summary>Ingredients </summary>
                    <div className="summarytext2" id="summaryjs2">
                      <ReactQuill
                        value={singleProduct?.descripiton}
                        readOnly={true}
                        theme={"bubble"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </main>
            <div className="single-review-wrapper">
              <div className="single-review-top">
                <h1 className="reviews-title">Customer Reviews</h1>
                <div className="reviews">
                  <ul className="review-stars">
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 576 512"
                      >
                        <style></style>
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 576 512"
                      >
                        <style></style>
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 576 512"
                      >
                        <style></style>
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 576 512"
                      >
                        <style></style>
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                      </svg>
                    </li>
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 576 512"
                      >
                        <style></style>
                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                      </svg>
                    </li>
                  </ul>
                  <p className="item-reviews">2 Yorum</p>
                </div>
                <div className="single-details-wrapper">
                  <details>
                    <summary>Write a comment</summary>
                    <div className="single-details-wrapper-desc">
                      <div className="personal-information">
                        <div className="name-last-name">
                          <div className="personal-name">
                            <p className="personal-information-title">Name*</p>
                            <form>
                              <input
                                id="comment-name"
                                type="text"
                                placeholder="Type your name"
                              />
                            </form>
                          </div>
                        </div>
                        <div className="personal-email">
                          <p className="personal-information-title">E-Mail*</p>
                          <form>
                            <input
                              type="text"
                              placeholder="alex.turner@example.com"
                            />
                          </form>
                        </div>
                        <div className="personal-subject">
                          <p className="personal-information-title">Subject*</p>
                          <form>
                            <input
                              id="comment-subject"
                              type="text"
                              placeholder="Type the subject about your comment"
                            />
                          </form>
                        </div>
                        <div className="personal-ratingby">
                          <p className="personal-information-title">Rating*</p>
                          <ul className="star-ratingby" id="star-rating">
                            <li>
                              <i id="star1" className="bi bi-star"></i>
                            </li>
                            <li>
                              <i id="star2" className="bi bi-star"></i>
                            </li>
                            <li>
                              <i id="star3" className="bi bi-star"></i>
                            </li>
                            <li>
                              <i id="star4" className="bi bi-star"></i>
                            </li>
                            <li>
                              <i id="star5" className="bi bi-star"></i>
                            </li>
                          </ul>
                        </div>
                        <div className="personal-message">
                          <p className="personal-information-title">
                            Your Message*
                          </p>
                          <form>
                            <textarea
                              id="comment-text"
                              className="personal-message-area"
                              placeholder="Enter your message here"
                            ></textarea>
                          </form>
                        </div>

                        <div id="comment-button" className="send-button">
                          <button>Send</button>
                        </div>
                      </div>
                    </div>
                  </details>
                </div>
              </div>
              <div className="single-comments-wrapper">
                <ul className="single-comments"></ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;

SingleProduct.propTypes = {
  singleProduct: PropTypes.object,
};
