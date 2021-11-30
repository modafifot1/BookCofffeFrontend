import React from "react";
import { BoldLink } from "../common/CommonLink";
import Rating from "@mui/material/Rating";
export const FoodCategory = ({ item }) => {
  console.log(item.numOfStars);
  return (
    <div className="food-container">
      <div className="food-image">
        <img src={item.imageUrl} alt={"Food"}></img>
        <div className="food-promotion"></div>
      </div>
      <div className="food-content">
        <div className="food-name">{item.name}</div>
        <div className="food-info">
          <div className="food-price">
            {`${item.unitPrice} VND`}
            {item?.discountOff != 0 && (
              <div className="real-unit-price">{`${item.unitPrice} VND`}</div>
            )}
          </div>
          {item?.discountOff != 0 && (
            <div className="food-sale-off">{`- ${item.discountOff}%`}</div>
          )}
        </div>
        <div className="food-footer">
          <div className="rating">
            <div className="rating-icon">
              <Rating
                name="read-only"
                value={item.numOfStars}
                precision={0.1}
                readOnly
              />
            </div>
            <div className="rating-number">{` ${
              item.numOfStars ? item.numOfStars : 0
            } sao`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
