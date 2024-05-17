import "./Lookingfor.css"

const Lookingfor = () => {
  return (
    <div className="lookingfor">
    <div className="container-lookingfor">
      <div className="title-section">
        <h1 className="lookingfor-title">What are you looking for?</h1>
      </div>
      <p className="lookingfor-title-description">
        Choose the products you desire the most.
      </p>
      <div className="lookingfor-categories">
        <ul className="lookingfor-categories-list">
          <li>
            <a href="shop.html" className="categories-btn">Everyday bags</a>
          </li>
          <li>
            <a href="shop.html" className="categories-btn">Travel bags</a>
          </li>
          <li>
            <a href="shop.html" className="categories-btn">Specialized bags</a>
          </li>
          <li>
            <a href="shop.html" className="categories-btn">Outdoor bags</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  )
}

export default Lookingfor