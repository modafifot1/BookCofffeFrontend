import React from "react";
import { BoldLink } from "../common/CommonLink";
import Rating from "@mui/material/Rating";
import Skeleton from "@mui/material/Skeleton";
import NoImage from "../../assets/noImage.png";
export const FoodCategory = ({ item, handleClick }) => {
  return (
    <div
      className="food-container"
      onClick={() => handleClick && handleClick(item._id)}
    >
      <div className="food-image">
        <img
          src={item.imageUrl ? item.imageUrl : NoImage}
          alt="Food"
          className="image"
        ></img>
      </div>
      <div className="food-content">
        <div className="food-name">
          {item.name ? item.name : "Tên sản phẩm"}
        </div>
        <div className="food-info">
          <div className="food-price">
            {`${item.unitPrice ? item.unitPrice : 0} VND`}
            {item?.discountOff != 0 && (
              <div className="real-unit-price">{`${
                item.unitPrice ? item.unitPrice : 0
              } VND`}</div>
            )}
          </div>
          {item?.discountOff != 0 && (
            <div className="food-sale-off">{`- ${
              item.discountOff ? item.discountOff : 0
            }%`}</div>
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
