import React, { useEffect, useState } from "react";
import { LibraryBooks } from "@material-ui/icons";
import { Box, CircularProgress } from "@material-ui/core";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { StepButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getBorrowedBooksByStatus } from "../redux/slices/borrowedBookSlice";
import { BorrowedBookCard } from "../components/BorrowedBookCard/BrrowedBookCard";
import { Notification } from "../components/common/Notification";

const steps = ["Tất cả", "Chờ xác nhận", "Danh sách mượn", "Danh sách trả"];

export const BorrowAndReturnBookManagement = () => {
  const [activeStep, setActiveStep] = React.useState(-1);
  const [completed, setCompleted] = React.useState({});
  const { borrowedBooks, borrowedBook } = useSelector(
    (state) => state.borrowedBook
  );
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  useEffect(() => {
    dispatch(getBorrowedBooksByStatus(activeStep));
  }, [activeStep, dispatch]);

  const handleStep = (step) => () => {
    console.log("Step: ", step);
    setActiveStep(step - 1);
  };
  useEffect(() => {
    setData(borrowedBooks.data);
  }, [borrowedBooks]);

  console.log("xx:", data);
  console.log("aaaaaa:", borrowedBooks.data);
  useEffect(() => {
    if (borrowedBooks.status) {
      setNotify({
        isOpen: true,
        message: borrowedBooks.msg,
        type: borrowedBooks.status < 300 ? "success" : "error",
      });
    }
  }, [borrowedBooks.status]);
  useEffect(() => {
    if (borrowedBook.status) {
      setNotify({
        isOpen: true,
        message: borrowedBook.msg,
        type: borrowedBook.status < 300 ? "success" : "error",
      });
    }
  }, [borrowedBook.status]);
  return (
    <div className="borrow-and-return-book-management-container">
      <div className="page-title">
        <div className="page-icon">
          <LibraryBooks />
        </div>
        <div className="page-title-content">
          <div className="page-title-content-header">Mượn trả sách</div>
          <div className="page-title-content-footer">Quản lý mượn trả sách</div>
        </div>
      </div>
      <Box sx={{ width: "100%" }}>
        <Stepper nonLinear activeStep={activeStep + 1}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Box>
      <div className="borrowed-book-list-container">
        {borrowedBooks.loading ? (
          <div className="loading">
            <CircularProgress color="success" />
          </div>
        ) : data.length ? (
          data.map((borrowedBook) => (
            <BorrowedBookCard
              borrowedBook={borrowedBook}
              borrowedBooks={data}
              setBorrowedBooks={setData}
            ></BorrowedBookCard>
          ))
        ) : (
          <div className="loading result">
            Hiện tại không có đơn hàng nào trong mục này
          </div>
        )}
      </div>
      <Notification notify={notify} setNotify={setNotify}></Notification>
    </div>
  );
};
