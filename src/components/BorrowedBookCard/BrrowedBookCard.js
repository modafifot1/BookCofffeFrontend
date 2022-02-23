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
import {
  getBorrowedBookById,
  updateBorrowedBookById,
} from "../../redux/slices/borrowedBookSlice";
// const borrowedBook = {
//   _id: "hgdhsghsd26565",
//   borrowerName: "Nguyễn Quang Phiêu",
//   phoneNumber: "0364782449",
//   statusId: 0,
//   createAt: "2021-05-20T05:00:13.401Z",
//   item: {
//     imageUrl: "https://images.gr-assets.com/books/1447303603m/2767052.jpg",
//   },
//   tableCode: 5,
//   numOfItems: 3,
//   showBack: false,
// };
let borrowedBookDetail = {};
borrowedBookDetail.data = [
  {
    author: "Chetan Bhagat",
    bookId: 105578,
    imageUrl: "https://images.gr-assets.com/books/1320500924m/105578.jpg",
    numOfFeedback: 40718,
    quantity: 5,
    rating: 2.47,
    title: "One Night @ The Call Center",
    yearOfPublication: 2005,
    __v: 0,
    _id: "6211be97e335d10c30be58d3",
  },
  {
    rating: 2.67,
    numOfFeedback: 28299,
    _id: "6211be98e335d10c30be5fb0",
    bookId: 783291,
    title: "The Almost Moon",
    author: "Alice Sebold",
    yearOfPublication: 2007,
    imageUrl: "https://images.gr-assets.com/books/1310421579m/783291.jpg",
    quantity: 5,
    __v: 0,
  },
  {
    rating: 2.67,
    numOfFeedback: 28299,
    _id: "6211be98e388d10c30be5fb0",
    bookId: 783291,
    title: "The Almost Moon",
    author: "Alice Sebold",
    yearOfPublication: 2007,
    imageUrl: "https://images.gr-assets.com/books/1310421579m/783291.jpg",
    quantity: 5,
    __v: 0,
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
const items = [
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
export const BorrowedBookCard = ({
  borrowedBook,
  borrowedBooks,
  setBorrowedBooks,
}) => {
  // setBorrowedBooks(borrowedBook);

  const { borrowedBook: borrowedBookDetail } = useSelector(
    (state) => state.borrowedBook
  );
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const updateBorrowedBook = (borrowedBookId) => {
    dispatch(updateBorrowedBookById(borrowedBookId));
  };
  useEffect(() => {
    setData(borrowedBook);
  }, [borrowedBook]);

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
    console.log("Temp: ", temp);
    setBorrowedBooks(temp);
    dispatch(getBorrowedBookById(borrowedBookId));
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
    setBorrowedBooks(temp);
  };
  // useEffect(() => {.flip-card-outer .flip-card-inner .card.front
  //   if (!selectedItemId) return;
  //   dispatch(getborrowedBookById(selectedItemId));
  // }, [selectedItemId]);
  console.log("data", data.showBack);
  return (
    <div>
      <div className="flip-card-outer">
        <div
          className={cn("flip-card-inner", {
            showBack: !!data?.showBack,
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
                    <div className="detail-content">{data?.borrowerName}</div>
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
                  {data?.updateAt && (
                    <div className="borrowed-book-card-detail-item">
                      <label>Cập nhật lần cuối: </label>
                      <div className="detail-content">
                        {moment(new Date(data?.updateAt)).format(
                          "DD/MM/YYYY, h:mm:ss"
                        )}
                      </div>
                    </div>
                  )}
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
                      {data.statusId !== 2 && (
                        <button
                          className="next-button"
                          onClick={() => setIsOpenModal(true)}
                        >
                          {data.statusId === 0
                            ? "Xác nhận mượn"
                            : data.statusId === 1
                            ? "Xác nhận trả"
                            : "Hoàn thành"}
                        </button>
                      )}
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
              <div>Thông tin mượn sách</div>
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
                          {`${item?.title} (năm ${item.yearOfPublication})`}
                        </div>
                      </div>
                      <div className="borrowed-book-item-quantity">{`x ${item?.quantity} quyển`}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal
        open={isOpenModal}
        handleSubmit={() => updateBorrowedBook(borrowedBook._id)}
        // title="Cập nhật đơn hàng"
        message={`Cập nhật đơn hàng sang `}
        orderStatus={`${data?.statusId === 0 ? "Đang chuẩn bị" : "Hoàn thành"}`}
        handleClose={() => setIsOpenModal(false)}
      ></ConfirmModal>
    </div>
  );
};
