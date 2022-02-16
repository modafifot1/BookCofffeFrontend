import React, { useState, useEffect } from "react";
import NoImage from "../../assets/noImage.png";
import PaidIcon from "../../assets/paid.png";
import UnPaidIcon from "../../assets/unpaid.png";
import moment from "moment";
import cn from "classnames";
import { ArrowBackIos } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../redux/slices/orderSlice";
import { SpinLoading } from "../common/SpinLoading";
import { ConfirmModal } from "../Modal/CofirmModal";
// const order = {
//   _id: "hgdhsghsd26565",
//   customerName: "Nguyễn Quang Phiêu",
//   phoneNumber: "0364782449",
//   statusId: 1,
//   paymentMethod: "WAL",
//   total: 100000,
//   createAt: "2021-05-20T05:00:13.401Z",
//   isPaid: true,
//   item: {
//     imageUrl:
//       "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
//   },
//   tableCode: 5,
//   numOfItems: 3,
// };
// let orders = [
//   {
//     _id: "hgdhsghsd26565",
//     customerName: "Nguyễn Quang Phiêu",
//     phoneNumber: "0364782449",
//     statusId: 1,
//     paymentMethod: "WAL",
//     total: 100000,
//     createAt: "2021-05-20T05:00:13.401Z",
//     isPaid: true,
//     item: {
//       imageUrl:
//         "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
//     },
//     tableCode: 5,
//     numOfItems: 3,
//   },
//   {
//     _id: "hgdhsghsd26dd565",
//     customerName: "Nguyễn Quang Phiêu",
//     phoneNumber: "0364782449",
//     statusId: 1,
//     paymentMethod: "WAL",
//     total: 100000,
//     createAt: "2021-05-20T05:00:13.401Z",
//     isPaid: true,
//     item: {
//       imageUrl:
//         "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
//     },
//     tableCode: 5,
//     numOfItems: 3,
//   },
//   {
//     _id: "hgdhsggfgfhsd26565",
//     customerName: "Nguyễn Quang Phiêu",
//     phoneNumber: "0364782449",
//     statusId: 1,
//     paymentMethod: "WAL",
//     total: 100000,
//     createAt: "2021-05-20T05:00:13.401Z",
//     isPaid: true,
//     item: {
//       imageUrl:
//         "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
//     },
//     tableCode: 5,
//     numOfItems: 3,
//   },
//   {
//     _id: "hgdhsghsdjkjj26565",
//     customerName: "Nguyễn Quang Phiêu",
//     phoneNumber: "0364782449",
//     statusId: 1,
//     paymentMethod: "WAL",
//     total: 100000,
//     createAt: "2021-05-20T05:00:13.401Z",
//     isPaid: true,
//     item: {
//       imageUrl:
//         "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
//     },
//     tableCode: 5,
//     numOfItems: 3,
//   },
// ];
// const item = {
//   _id: "60a5ecdd98cf780015b07baal",
//   typeId: 2,
//   name: "Soda bạc hà6",
//   unitPrice: 20001,
//   imageUrl:
//     "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
//   discountOff: 5,
//   description: "Hương vị tươi ngon, 100% hương liệu từ thiên nhiên",
//   discountMaximum: 5000,
//   createAt: "2021-05-20T05:00:13.401Z",
//   __v: 0,
//   numOfFeedbacks: 1,
//   numOfStars: 5,
//   quantity: 2,
// };
// const orderItems = [
//   {
//     confirmed: true,
//     _id: "60a5ecdd98cf780015b07baal",
//     typeId: 2,
//     name: "Soda bạc hà6",
//     unitPrice: 20001,
//     imageUrl:
//       "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
//     discountOff: 5,
//     description: "Hương vị tươi ngon, 100% hương liệu từ thiên nhiên",
//     discountMaximum: 5000,
//     createAt: "2021-05-20T05:00:13.401Z",
//     __v: 0,
//     numOfFeedbacks: 1,
//     numOfStars: 5,
//     quantity: 2,
//   },
//   {
//     confirmed: true,
//     _id: "60a5ecdd98cf780015b07baaf",
//     typeId: 2,
//     name: "Soda bạc hà6",
//     unitPrice: 20001,
//     imageUrl:
//       "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
//     discountOff: 5,
//     description: "Hương vị tươi ngon, 100% hương liệu từ thiên nhiên",
//     discountMaximum: 5000,
//     createAt: "2021-05-20T05:00:13.401Z",
//     __v: 0,
//     numOfFeedbacks: 1,
//     numOfStars: 5,
//     quantity: 2,
//   },
//   {
//     confirmed: true,
//     _id: "60a5ecdd98cf780015b07baas",
//     typeId: 2,
//     name: "Soda bạc hà6",
//     unitPrice: 20001,
//     imageUrl:
//       "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
//     discountOff: 5,
//     description: "Hương vị tươi ngon, 100% hương liệu từ thiên nhiên",
//     discountMaximum: 5000,
//     createAt: "2021-05-20T05:00:13.401Z",
//     __v: 0,
//     numOfFeedbacks: 1,
//     numOfStars: 5,
//     quantity: 2,
//   },
//   {
//     confirmed: true,
//     _id: "60a5ecdd98cf78gfhfjj0015b07baal",
//     typeId: 2,
//     name: "Soda bạc hà6",
//     unitPrice: 20001,
//     imageUrl:
//       "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
//     discountOff: 5,
//     description: "Hương vị tươi ngon, 100% hương liệu từ thiên nhiên",
//     discountMaximum: 5000,
//     createAt: "2021-05-20T05:00:13.401Z",
//     __v: 0,
//     numOfFeedbacks: 1,
//     numOfStars: 5,
//     quantity: 2,
//   },
//   {
//     confirmed: true,
//     _id: "60a5ecdd98cfjhhj780015b07baal",
//     typeId: 2,
//     name: "Soda bạc hà6",
//     unitPrice: 20001,
//     imageUrl:
//       "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
//     discountOff: 5,
//     description: "Hương vị tươi ngon, 100% hương liệu từ thiên nhiên",
//     discountMaximum: 5000,
//     createAt: "2021-05-20T05:00:13.401Z",
//     __v: 0,
//     numOfFeedbacks: 1,
//     numOfStars: 5,
//     quantity: 2,
//   },
//   {
//     confirmed: true,
//     _id: "60a5ecdd98cf78001gfg5b07baal",
//     typeId: 2,
//     name: "Soda bạc hà6",
//     unitPrice: 20001,
//     imageUrl:
//       "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
//     discountOff: 5,
//     description: "Hương vị tươi ngon, 100% hương liệu từ thiên nhiên",
//     discountMaximum: 5000,
//     createAt: "2021-05-20T05:00:13.401Z",
//     __v: 0,
//     numOfFeedbacks: 1,
//     numOfStars: 5,
//     quantity: 2,
//   },
// ];
export const OrderCard = ({ order, orders, setOrders }) => {
  const { order: orderDetail } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const updateOrder = (orderId) => {
    setIsOpenModal(true);
  };
  useEffect(() => {
    setData(order);
  }, [order]);
  // function handleClick(orderId) {
  //   let temp = orders;
  //   temp = temp.map((order) => {
  //     if (
  //       selectedItemId &&
  //       order._id === selectedItemId &&
  //       order.showBack === true
  //     )
  //       return { ...order, showBack: false };
  //     else if (order.showBack === false && order._id === orderId)
  //       return { ...order, showBack: true };
  //     else return order;
  //   });
  //   console.log("Temp: ", temp);
  //   setOrders(temp);
  //   setSelectedItemId(orderId);
  // }
  const onDetail = (orderId) => {
    let temp = orders;
    temp = temp.map((order) => {
      if (orderId === order._id)
        return {
          ...order,
          showBack: true,
        };
      return {
        ...order,
        showBack: false,
      };
    });
    setOrders(temp);
    dispatch(getOrderById(orderId));
  };
  const onBack = (orderId) => {
    let temp = orders;
    temp = temp.map((order) => {
      if (orderId === order._id)
        return {
          ...order,
          showBack: false,
        };
      return order;
    });
    setOrders(temp);
  };
  // useEffect(() => {.flip-card-outer .flip-card-inner .card.front
  //   if (!selectedItemId) return;
  //   dispatch(getOrderById(selectedItemId));
  // }, [selectedItemId]);
  return (
    <div>
      <div className="flip-card-outer">
        <div
          className={cn("flip-card-inner", {
            showBack: data?.showBack || false,
            "hover-trigger": false,
          })}
        >
          <div className="card front">
            <div className="order-card-container">
              <div className="oder-card-image">
                <div className="order-status">
                  {data?.statusId === 0
                    ? "Chờ xác nhận"
                    : data?.statusId === 1
                    ? "Đang chuẩn bị"
                    : "Hoàn thành"}
                </div>
                <img
                  src={data?.item?.imageUrl ? data?.item?.imageUrl : NoImage}
                  alt="Food"
                  className="image"
                ></img>
                <div className="button-control">
                  <button onClick={() => onDetail(data?._id)}>
                    Xem chi tiết
                  </button>
                  <button className="next-button" onClick={updateOrder}>
                    Chuyển trạng thái
                  </button>
                </div>
              </div>
              <div className="order-card-detail">
                <div className="order-card-detail-item">
                  <label>Tên khách hàng: </label>
                  <div className="detail-content">{data?.customerName}</div>
                </div>
                <div className="order-card-detail-item">
                  <label>Số điện thoại: </label>
                  <div className="detail-content">{data?.phoneNumber}</div>
                </div>
                <div className="order-card-detail-item">
                  <label>Phương thức thanh toán: </label>
                  <div className="detail-content">
                    {data?.paymentMethod === "WAL" ? "Ví momo" : "Trực tiếp"}
                  </div>
                </div>
                <div className="order-card-detail-item">
                  <label>Tổng tiền: </label>
                  <div className="detail-content total">{data?.total}</div>
                </div>

                <div className="order-card-detail-item">
                  <label>Bàn số</label>
                  <div className="detail-content table-code-content">
                    {data?.tableCode}
                  </div>
                </div>
                <div className="order-card-detail-item">
                  <label>Ngày tạo đơn: </label>
                  <div className="detail-content">
                    {moment(new Date(data?.createAt)).format(
                      "DD/MM/YYYY, h:mm:ss"
                    )}
                  </div>
                </div>
                <div className="order-card-detail-status">
                  <img
                    src={data?.isPaid ? PaidIcon : UnPaidIcon}
                    alt="PAIDSTATUS"
                    className="paid-status-icon"
                  ></img>
                </div>
                <div className="right-side"></div>
              </div>
            </div>
          </div>
          <div className="card back">
            <div className="card-header">
              <p
                className="card-button-control"
                onClick={() => onBack(data?._id)}
              >
                <ArrowBackIos></ArrowBackIos>Quay lại
              </p>
              <div>Chi tiết đơn hàng</div>
            </div>

            <div className="order-detail-container">
              {orderDetail.loading ? (
                <SpinLoading></SpinLoading>
              ) : (
                <div className="order-item-list">
                  {orderDetail?.data.map((item) => (
                    <div className="order-item">
                      <img
                        src={item?.imageUrl ? item?.imageUrl : NoImage}
                        alt="Food"
                        className="order-item-image"
                      ></img>
                      <div className="order-item-content">
                        <div className="order-item-name">{item?.name}</div>
                        {item?.discountOff && (
                          <div className="order-item-discountOff">{`${item?.discountOff}% off`}</div>
                        )}
                      </div>
                      <div className="order-item-quantity">{`x ${item?.quantity}`}</div>
                      <div className="order-item-result"> = 100000</div>
                    </div>
                  ))}
                </div>
              )}
              <div className="order-total">
                <label>Tổng cộng:</label>
                <div className="order-total-content">10000 vnd</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal
        open={isOpenModal}
        handleSubmit={updateOrder}
        // title="Cập nhật đơn hàng"
        message={`Cập nhật đơn hàng sang `}
        orderStatus={`${data?.statusId === 0 ? "Đang chuẩn bị" : "Hoàn thành"}`}
        handleClose={() => setIsOpenModal(false)}
      ></ConfirmModal>
    </div>
  );
};
