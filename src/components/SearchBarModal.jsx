import { useState, useCallback } from "react";
import { Link } from "react-router-dom";

const SearchBarModal = () => {
  const [result, setResult] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_BASE_URL;

  // Debounce function to limit the rate at which a function is executed
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // Function to perform the search
  const performSearch = async (searchQuery) => {
    if (!searchQuery) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/api/v1/products?search=${searchQuery}`);

      const {data} = await response.json();
      setResult(data);
    } catch (error) {
      setError('Failed to fetch results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Debounced version of the search function
  const debouncedSearch = useCallback(debounce(performSearch, 500), []);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <div className="modal-search fade" id="searchbar-main">
      <div className="modal-wrapper">
        <form className="search-form">
          <input
            type="text"
            placeholder="Search a product"
            value={query}
            onChange={handleInputChange}
          />
        </form>
        <div className="search-results">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{color: 'red'}}>{error}</p>
          ) : (
            <div className="results">
              {result.map((item) => (
                <Link key={item.id} to={`/product/${item.id}`} className="result-item">
                  <img src={item?.avatar[0]} className="search-thumb" alt={item.title} />
                  <div className="search-info">
                    <h4>{item.title}</h4>
                    <span className="search-price">{item.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        <i className="bi bi-x" id="close-searchbar"></i>
      </div>
    </div>
  );
};

export default SearchBarModal;
