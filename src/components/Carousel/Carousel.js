import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../utils/hooks/fetch";
import arrowRight from "../../assets/arrow-right.png";
import arrowLeft from "../../assets/arrow-left.png";
import "../Carousel/carousel.css";

export default function Carousel() {
  const { data, loading, error } = useFetch(
    "https://raw.githubusercontent.com/Dimterion/rental-business-website/master/src/assets/kasa-apartments-data.json"
  );
  const { apartmentId } = useParams();
  const [index, setIndex] = React.useState(0);
  let url = "";
  let counter = 0;

  data.forEach((apartment) => {
    if (apartmentId === apartment.id) {
      url = apartment.pictures[index];
      counter = apartment.pictures.length;
    }
  });

  if (error) {
    return <span>Page is not loading.</span>;
  }

  function rightArrowClick() {
    if (index < counter - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }

  function leftArrowClick() {
    if (index < counter && index > 0) {
      setIndex(index - 1);
    } else if (index === counter) {
      setIndex(0);
    } else {
      setIndex(counter - 1);
    }
  }

  return loading ? (
    <div>Page is loading</div>
  ) : (
    <div className="carousel-container">
      <img className="carousel-image" src={url} alt="Apartment overview" />
      <img
        onClick={leftArrowClick}
        className="left-arrow"
        src={arrowLeft}
        alt="Carousel arrow"
      />
      <img
        onClick={rightArrowClick}
        className="right-arrow"
        src={arrowRight}
        alt="Carousel arrow"
      />
      <span className="counter-container">
        {index + 1}/{counter}
      </span>
    </div>
  );
}