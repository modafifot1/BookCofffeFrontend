import React, { useState, useEffect } from "react";
import NoImage from "../../assets/noImage.png";
import paidBookIcon from "../../assets/paidBook.png";
import UnPaidIcon from "../../assets/unpaid.png";
import moment from "moment";
import cn from "classnames";
import { ArrowBackIos } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
// import { getOrderById } from "../../redux/slices/orderSlice";
import { SpinLoading } from "../common/SpinLoading";
import { ConfirmModal } from "../Modal/CofirmModal";
const borrowedBook = {
  _id: "hgdhsghsd26565",
  customerName: "Nguyễn Quang Phiêu",
  phoneNumber: "0364782449",
  statusId: 2,
  createAt: "2021-05-20T05:00:13.401Z",
  item: {
    imageUrl: "https://images.gr-assets.com/books/1447303603m/2767052.jpg",
  },
  tableCode: 5,
  numOfItems: 3,
};
let orders = [
  {
    _id: "hgdhsghsd26565",
    customerName: "Nguyễn Quang Phiêu",
    phoneNumber: "0364782449",
    statusId: 1,
    paymentMethod: "WAL",
    total: 100000,
    createAt: "2021-05-20T05:00:13.401Z",
    isPaid: true,
    item: {
      imageUrl:
        "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
    },
    tableCode: 5,
    numOfItems: 3,
  },
  {
    _id: "hgdhsghsd26dd565",
    customerName: "Nguyễn Quang Phiêu",
    phoneNumber: "0364782449",
    statusId: 1,
    paymentMethod: "WAL",
    total: 100000,
    createAt: "2021-05-20T05:00:13.401Z",
    isPaid: true,
    item: {
      imageUrl:
        "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
    },
    tableCode: 5,
    numOfItems: 3,
  },
  {
    _id: "hgdhsggfgfhsd26565",
    customerName: "Nguyễn Quang Phiêu",
    phoneNumber: "0364782449",
    statusId: 1,
    total: 100000,
    createAt: "2021-05-20T05:00:13.401Z",
    isPaid: true,
    item: {
      imageUrl:
        "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
    },
    tableCode: 5,
    numOfItems: 3,
  },
  {
    _id: "hgdhsghsdjkjj26565",
    customerName: "Nguyễn Quang Phiêu",
    phoneNumber: "0364782449",
    statusId: 1,
    paymentMethod: "WAL",
    total: 100000,
    createAt: "2021-05-20T05:00:13.401Z",
    isPaid: true,
    item: {
      imageUrl:
        "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
    },
    tableCode: 5,
    numOfItems: 3,
  },
];
const item = {
  _id: "60a5ecdd98cf780015b07baal",
  typeId: 2,
  name: "Soda bạc hà6",
  unitPrice: 20001,
  imageUrl:
    "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
  discountOff: 5,
  description: "Hương vị tươi ngon, 100% hương liệu từ thiên nhiên",
  discountMaximum: 5000,
  createAt: "2021-05-20T05:00:13.401Z",
  __v: 0,
  numOfFeedbacks: 1,
  numOfStars: 5,
  quantity: 2,
};
const orderItems = [
  {
    confirmed: true,
    _id: "60a5ecdd98cf780015b07baal",
    typeId: 2,
    name: "Soda bạc hà6",
    unitPrice: 20001,
    imageUrl:
      "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
    discountOff: 5,
    description: "Hương vị tươi ngon, 100% hương liệu từ thiên nhiên",
    discountMaximum: 5000,
    createAt: "2021-05-20T05:00:13.401Z",
    __v: 0,
    numOfFeedbacks: 1,
    numOfStars: 5,
    quantity: 2,
  },
  {
    confirmed: true,
    _id: "60a5ecdd98cf780015b07baaf",
    typeId: 2,
    name: "Soda bạc hà6",
    unitPrice: 20001,
    imageUrl:
      "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
    discountOff: 5,
    description: "Hương vị tươi ngon, 100% hương liệu từ thiên nhiên",
    discountMaximum: 5000,
    createAt: "2021-05-20T05:00:13.401Z",
    __v: 0,
    numOfFeedbacks: 1,
    numOfStars: 5,
    quantity: 2,
  },
  {
    confirmed: true,
    _id: "60a5ecdd98cf780015b07baas",
    typeId: 2,
    name: "Soda bạc hà6",
    unitPrice: 20001,
    imageUrl:
      "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
    discountOff: 5,
    description: "Hương vị tươi ngon, 100% hương liệu từ thiên nhiên",
    discountMaximum: 5000,
    createAt: "2021-05-20T05:00:13.401Z",
    __v: 0,
    numOfFeedbacks: 1,
    numOfStars: 5,
    quantity: 2,
  },
  {
    confirmed: true,
    _id: "60a5ecdd98cf78gfhfjj0015b07baal",
    typeId: 2,
    name: "Soda bạc hà6",
    unitPrice: 20001,
    imageUrl:
      "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
    discountOff: 5,
    description: "Hương vị tươi ngon, 100% hương liệu từ thiên nhiên",
    discountMaximum: 5000,
    createAt: "2021-05-20T05:00:13.401Z",
    __v: 0,
    numOfFeedbacks: 1,
    numOfStars: 5,
    quantity: 2,
  },
  {
    confirmed: true,
    _id: "60a5ecdd98cfjhhj780015b07baal",
    typeId: 2,
    name: "Soda bạc hà6",
    unitPrice: 20001,
    imageUrl:
      "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
    discountOff: 5,
    description: "Hương vị tươi ngon, 100% hương liệu từ thiên nhiên",
    discountMaximum: 5000,
    createAt: "2021-05-20T05:00:13.401Z",
    __v: 0,
    numOfFeedbacks: 1,
    numOfStars: 5,
    quantity: 2,
  },
  {
    confirmed: true,
    _id: "60a5ecdd98cf78001gfg5b07baal",
    typeId: 2,
    name: "Soda bạc hà6",
    unitPrice: 20001,
    imageUrl:
      "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
    discountOff: 5,
    description: "Hương vị tươi ngon, 100% hương liệu từ thiên nhiên",
    discountMaximum: 5000,
    createAt: "2021-05-20T05:00:13.401Z",
    __v: 0,
    numOfFeedbacks: 1,
    numOfStars: 5,
    quantity: 2,
  },
];
export const BorrowedBookCard = ({ borrowedBooks, setborrowedBooks }) => {
  const { borrowedBook: borrowedBookDetail } = useSelector(
    (state) => state.borrowedBook
  );
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const updateBorrowedBook = (borrowedBookId) => {
    setIsOpenModal(true);
  };
  useEffect(() => {
    setData(borrowedBook);
  }, [borrowedBook]);
  // function handleClick(borrowedBookId) {
  //   let temp = borrowedBooks;
  //   temp = temp.map((borrowedBook) => {
  //     if (
  //       selectedItemId &&
  //       borrowedBook._id === selectedItemId &&
  //       borrowedBook.showBack === true
  //     )
  //       return { ...borrowedBook, showBack: false };
  //     else if (borrowedBook.showBack === false && borrowedBook._id === borrowedBookId)
  //       return { ...borrowedBook, showBack: true };
  //     else return borrowedBook;
  //   });
  //   console.log("Temp: ", temp);
  //   setborrowedBooks(temp);
  //   setSelectedItemId(borrowedBookId);
  // }
  const onDetail = (borrowedBookId) => {
    let temp = borrowedBooks;
    temp = temp.map((borrowedBook) => {
      if (borrowedBookId === borrowedBook._id)
        return {
          ...borrowedBook,
          showBack: true,
        };
      return {
        ...borrowedBook,
        showBack: false,
      };
    });
    setborrowedBooks(temp);
    // dispatch(getBorrowedBookById(borrowedBookId));
  };
  const onBack = (borrowedBookId) => {
    let temp = borrowedBooks;
    temp = temp.map((borrowedBook) => {
      if (borrowedBookId === borrowedBook._id)
        return {
          ...borrowedBook,
          showBack: false,
        };
      return borrowedBook;
    });
    setborrowedBooks(temp);
  };
  // useEffect(() => {.flip-card-outer .flip-card-inner .card.front
  //   if (!selectedItemId) return;
  //   dispatch(getborrowedBookById(selectedItemId));
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
            <div className="borrowed-book-card-container">
              <div className="borrowed-book-card-container-inner">
                <div className="oder-card-image">
                  <div className="borrowed-book-status">
                    {data?.statusId === 0
                      ? "Chờ xác nhận"
                      : data?.statusId === 1
                      ? "Đang mượn"
                      : "Đã trả"}
                  </div>
                  <img
                    src={data?.item?.imageUrl ? data?.item?.imageUrl : NoImage}
                    alt="Food"
                    className="image"
                  ></img>
                </div>
                <div className="borrowed-book-card-detail">
                  <div className="borrowed-book-card-detail-item">
                    <label>Tên khách hàng: </label>
                    <div className="detail-content">{data?.customerName}</div>
                  </div>
                  <div className="borrowed-book-card-detail-item">
                    <label>Số điện thoại: </label>
                    <div className="detail-content">{data?.phoneNumber}</div>
                  </div>
                  <div className="borrowed-book-card-detail-item">
                    <label>Số lượng mượn: </label>
                    <div className="detail-content">{data?.numOfItems}</div>
                  </div>
                  <div className="borrowed-book-card-detail-item">
                    <label>Bàn số</label>
                    <div className="detail-content table-code-content">
                      {data?.tableCode}
                    </div>
                  </div>
                  <div className="borrowed-book-card-detail-item">
                    <label>Ngày mượn: </label>
                    <div className="detail-content">
                      {moment(new Date(data?.createAt)).format(
                        "DD/MM/YYYY, h:mm:ss"
                      )}
                    </div>
                  </div>
                  <div className="borrowed-book-card-detail-status">
                    {/* <img
                      src={data?.statusId === 2 ? "" : UnPaidIcon}
                      alt="PAIDSTATUS"
                      className="paid-status-icon"
                    ></img> */}
                    <div className="button-control paid-status-icon">
                      <button onClick={() => onDetail(data?._id)}>
                        Xem chi tiết
                      </button>
                      <button
                        className="next-button"
                        onClick={updateBorrowedBook}
                      >
                        Chuyển trạng thái
                      </button>
                    </div>
                  </div>
                  <div className="right-side"></div>
                </div>
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

            <div className="borrowed-book-detail-container">
              {borrowedBookDetail.loading ? (
                <SpinLoading></SpinLoading>
              ) : (
                <div className="borrowed-book-item-list">
                  {borrowedBookDetail?.data.map((item) => (
                    <div className="borrowed-book-item">
                      <img
                        src={item?.imageUrl ? item?.imageUrl : NoImage}
                        alt="Food"
                        className="borrowed-book-item-image"
                      ></img>
                      <div className="borrowed-book-item-content">
                        <div className="borrowed-book-item-name">
                          {item?.name}
                        </div>
                        {item?.discountOff && (
                          <div className="borrowed-book-item-discountOff">{`${item?.discountOff}% off`}</div>
                        )}
                      </div>
                      <div className="borrowed-book-item-quantity">{`x ${item?.quantity}`}</div>
                      <div className="borrowed-book-item-result"> = 100000</div>
                    </div>
                  ))}
                </div>
              )}
              <div className="borrowed-book-total">
                <label>Tổng cộng:</label>
                <div className="borrowed-book-total-content">10000 vnd</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal
        open={isOpenModal}
        handleSubmit={updateBorrowedBook}
        // title="Cập nhật đơn hàng"
        message={`Cập nhật đơn hàng sang `}
        orderStatus={`${data?.statusId === 0 ? "Đang chuẩn bị" : "Hoàn thành"}`}
        handleClose={() => setIsOpenModal(false)}
      ></ConfirmModal>
    </div>
  );
};
