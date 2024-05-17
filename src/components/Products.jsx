import { Splide, SplideTrack } from "@splidejs/react-splide";
import "./Products.css";
import { useState } from "react";

import ProductItem from "./ProductItem";
import { useEffect } from "react";
import { message } from "antd";

const Products = () => {
  const [products, setProducts] = useState([]);
  const apiUrl = import.meta.env.VITE_BASE_URL;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/products`);

        if (response.ok) {
          const {data} = await response.json();
          console.log(data);
          setProducts(data);
        } else {
          message.error("Veri getirme başarısız.");
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      }
    };
    fetchProducts();
  }, [apiUrl]);
  return (
    <section className="products">
      <div className="container">
        <div className="section-title">
          <h2>Products</h2>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
        </div>

        <Splide
          hasTrack={false}
          options={{
            type: "carousel",
            perPage: 4,
            perMove: 1,
            drag: false,
            breakpoints: {
              768: {
                perPage: 1,
                drag: true,
              },
            },
          }}
        >
          <SplideTrack>
            {products.map((product) => (
              <ProductItem productItem={product} key={product.id} />
            ))}
          </SplideTrack>

          <div className="splide__arrows">
            <button className="splide_arrow splidearrow--prev splide_arrow2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 320 512"
              >
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
              </svg>
            </button>
            <button className="splide_arrow splidearrow--next splide_arrow2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 320 512"
              >
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
              </svg>
            </button>
          </div>
        </Splide>
      </div>
    </section>
  );
};

export default Products;
