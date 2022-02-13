import React, { useState } from "react";
import NoImage from "../../assets/noImage.png";
import PaidIcon from "../../assets/paid.png";
import UnPaidIcon from "../../assets/unpaid.png";
import moment from "moment";
import cn from "classnames";
const order = {
  _id: "hgdhsghsd26565",
  customerName: "Nguyễn Quang Phiêu",
  phoneNumber: "0364782449",
  statusId: 1,
  paymentMethod: "WAL",
  total: 100000,
  createAt: "2021-05-20T05:00:13.401Z",
  isPaid: true,
  item: {
    imageUrl: "",
  },
  tableCode: 5,
  numOfItems: 3,
};
export const OrderCard = ({}) => {
  const [showBack, setShowBack] = useState(false);

  function handleClick() {
    setShowBack(!showBack);
  }
  return (
    <div className="flip-card-outer" onClick={handleClick}>
      <div
        className={cn("flip-card-inner", {
          showBack,
          "hover-trigger": false,
        })}
      >
        <div className="card front">
          <div className="order-card-container">
            <div className="oder-card-image">
              <img
                src={order.item.imageUrl ? order.item.imageUrl : NoImage}
                alt="Food"
                className="image"
              ></img>
            </div>
            <div className="order-card-detail">
              <div className="order-card-detail-item">
                <label>Tên khách hàng: </label>
                <div className="detail-content">{order.customerName}</div>
              </div>
              <div className="order-card-detail-item">
                <label>Số điện thoại: </label>
                <div className="detail-content">{order.phoneNumber}</div>
              </div>
              <div className="order-card-detail-item">
                <label>Phương thức thanh toán: </label>
                <div className="detail-content">
                  {order.paymentMethod === "WAL" ? "Ví momo" : "Trực tiếp"}
                </div>
              </div>
              <div className="order-card-detail-item">
                <label>Tổng tiền: </label>
                <div className="detail-content total">{order.total}</div>
              </div>

              <div className="order-card-detail-item">
                <label>Bàn số</label>
                <div className="detail-content table-code-content">
                  {order.tableCode}
                </div>
              </div>
              <div className="order-card-detail-item">
                <label>Ngày tạo đơn: </label>
                <div className="detail-content">
                  {moment(new Date(order.createAt)).format(
                    "DD/MM/YYYY, h:mm:ss"
                  )}
                </div>
              </div>
              <div className="order-card-detail-status">
                <img
                  src={order.isPaid ? PaidIcon : UnPaidIcon}
                  alt="PAIDSTATUS"
                  className="paid-status-icon"
                ></img>
              </div>
              <div className="right-side"></div>
            </div>
          </div>
        </div>
        <div className="card back">
          <div className="card-body d-flex justify-content-center align-items-center">
            <p className="card-text fs-1 fw-bold">BAck </p>
          </div>
        </div>
      </div>
    </div>
  );
};
