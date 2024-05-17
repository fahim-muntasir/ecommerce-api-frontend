import { Splide, SplideTrack } from "@splidejs/react-splide";
import "./Shop.css";
import { useState, useEffect } from "react";
// import ProductsData from "../data.json";
import ProductItem from "./ProductItem";
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
          setProducts(data);
        } else {
          message.error("Veri getirme başarısız.");
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      }
    };
    fetchProducts();
  }, []);

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
            destroy: true,
            drag: false,
            breakpoints: {
              768: {
                perPage: 1,
                drag: true,
              },
            },
          }}
        >
          <SplideTrack className="merhabalar">
            {products.map((product) => (
              <ProductItem productItem={product} key={product.id} />
            ))}
          </SplideTrack>
        </Splide>
      </div>
    </section>
  );
};

export default Products;
