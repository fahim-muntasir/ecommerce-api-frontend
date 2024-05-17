const SearchBarModal = () => {
    return (
<div className="modal-search fade" id="searchbar-main">
    <div className="modal-wrapper">
      <form className="search-form">
        <input type="text" placeholder="Search a product" />
      </form>
      <div className="search-results">
        <div className="results">
          <a href="#" className="result-item">
            <img src="https://siliciumg5.com/1583-large_default/silicium-g7-original-1l-biodinamizated.webp"
              className="search-thumb" />
            <div className="search-info">
              <h4>Analogue Resin Strap</h4>
              <span className="search-price">$108.00</span>
            </div>
          </a>
          <a href="#" className="result-item">
            <img src="https://siliciumg5.com/1583-large_default/silicium-g7-original-1l-biodinamizated.webp"
              className="search-thumb" />
            <div className="search-info">
              <h4>Analogue Resin Strap</h4>
              <span className="search-price">$108.00</span>
            </div>
          </a>
        </div>
      </div>
      <i className="bi bi-x" id="close-searchbar"></i>
    </div>
  </div>
    );
  };
  
  export default SearchBarModal;