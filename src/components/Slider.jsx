import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
// import bg1 from "../assets/imgs/bg1.jpg";
// import bg2 from "../assets/imgs/bg2.jpg";
import bg3 from "../assets/imgs/bg3.jpg";
import bg4 from "../assets/imgs/bg4.jpg";
import "./Slider.css";

const Slider = () => {

  return (
    <Splide
      hasTrack={false}
      options={{
        type: "loop",
        autoplay: true,
        perPage: 1,
        speed: 800,
        drag: false,
        interval: 3500,
        pauseOnHover: false,
      }}
    >
      <SplideTrack>
        {/* <SplideSlide>
          <li className="slider-item splide__slide">
            <div className="slider-image">
              <img className="img-fluid" src={bg1} alt="" />
            </div>
            <div className="container">
              <p className="slider-title">LOREM IPSUM</p>
              <a href="#" className="btn-primary">
                Explore Now
              </a>
            </div>
          </li>
        </SplideSlide>
        <SplideSlide>
          <li className="slider-item splide__slide">
            <div className="slider-image">
              <img className="img-fluid" src={bg2} alt="" />
            </div>
            <div className="container">
              <p className="slider-title">LOREM IPSUM</p>
              <a href="#" className="btn-primary">
                Explore Now
              </a>
            </div>
          </li>
        </SplideSlide> */}
        <SplideSlide>
          <li className="slider-item splide__slide">
            <div className="slider-image">
              <img className="img-fluid" src={bg4} alt="" />
            </div>
            <div className="container">
              <p className="slider-title">LOREM IPSUM</p>
              <a href="#" className="btn-primary">
                Explore Now
              </a>
            </div>
          </li>
        </SplideSlide>
        <SplideSlide>
          <li className="slider-item splide__slide">
            <div className="slider-image">
              <img className="img-fluid" src={bg3} alt="" />
            </div>
            <div className="container banner-content">
              <p className="slider-title">LOREM IPSUM</p>
              <a href="#" className="btn-primary">
                Explore Now
              </a>
            </div>
          </li>
        </SplideSlide>
      </SplideTrack>
      <div className="splide__arrows">
        <button className="splide__arrow splide__arrow--prev splide__arrow1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 320 512"
          >
            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
          </svg>
        </button>
        <button className="splide__arrow splide__arrow--next splide__arrow1">
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
  );
};

export default Slider;
