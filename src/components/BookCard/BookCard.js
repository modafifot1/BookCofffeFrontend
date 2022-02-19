import React from "react";
import Rating from "@mui/material/Rating";
import NoImage from "../../assets/noImage.png";
const item = {
  title: "Classical Mythology",
  author: "Testament",
  rating: 3.8,
  yearOfPublication: 1998,
  imageUrl: "http://images.amazon.com/images/P/0811801128.01.MZZZZZZZ.jpg",
  quantity: 5,
};
export const BookCard = ({ item, handleClick }) => {
  return (
    <div
      className="book-container"
      onClick={() => handleClick && handleClick(item._id)}
    >
      <div className="book-image">
        <img
          src={item.imageUrl ? item.imageUrl : NoImage}
          alt="Food"
          className="image"
        ></img>
      </div>
      <div className="book-content">
        <div className="book-name">
          {`${item.title ? item.title : "Tên sản phẩm"} (${
            item.yearOfPublication || 0
          })`}
        </div>
        <div className="book-info">
          <div className="book-author">{item.author || "Anonymous"}</div>
        </div>
        <div className="book-footer">
          <div className="rating">
            <div className="rating-icon">
              <Rating
                name="read-only"
                value={item.rating}
                precision={0.1}
                readOnly
              />
            </div>
            <div className="rating-number">{` ${
              item.rating ? item.rating : 0
            } sao`}</div>
          </div>
          <div className="book-quantity">{`Còn lại: ${
            item.quantity || 0
          }`}</div>
        </div>
      </div>
    </div>
  );
};
