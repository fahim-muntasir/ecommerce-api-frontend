import { useParams } from "react-router-dom";
import SingleProduct from "../components/SingleProduct";
import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";

const SingleProductPage = () => {
  const { id: productId } = useParams();
  const apiUrl = import.meta.env.VITE_BASE_URL;
  const [singleProduct, setSingleProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) {
      setError("Product ID is not specified.");
      setLoading(false);
      return;
    }

    const fetchSingleProduct = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/products/${productId}`);

        // if (!response.ok) {
        //   throw new Error("Product not found.");
        // }

        const {data} = await response.json();
        console.log(data);

        setSingleProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleProduct();
  }, [apiUrl, productId]);

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <MainLayout>
      {singleProduct ? (
        <SingleProduct singleProduct={singleProduct} />
      ) : (
        <p>Product not found.</p>
      )}
    </MainLayout>
  );
};

export default SingleProductPage;
