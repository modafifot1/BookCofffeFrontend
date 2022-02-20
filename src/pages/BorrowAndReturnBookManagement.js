import React, { useEffect, useState } from "react";
import { LibraryBooks } from "@material-ui/icons";
import { Box, CircularProgress } from "@material-ui/core";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { StepButton } from "@mui/material";
import { OrderCard } from "../components/OrderCard/OrderCard";
import { useSelector } from "react-redux";
import { BorrowedBookCard } from "../components/BorrowedBookCard/BrrowedBookCard";
const steps = ["Tất cả", "Chờ xác nhận", "Danh sách mượn", "Danh sách trả"];

export const BorrowAndReturnBookManagement = () => {
  const [activeStep, setActiveStep] = React.useState(-1);
  const [completed, setCompleted] = React.useState({});
  const { borrowedBooks } = useSelector((state) => state.borrowedBook);
  const [data, setData] = useState([]);
  useEffect(() => {}, []);
  const handleStep = (step) => () => {
    console.log("Step: ", step);
    setActiveStep(step - 1);
  };

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
        ) : (
          <BorrowedBookCard
            // borrowedBook={borrowedBook}
            borrowedBooks={data}
            setBorrowedBooks={setData}
          ></BorrowedBookCard>
        )}
      </div>
    </div>
  );
};
{
  /* borrowedBooks.data.length ? (
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
        ) */
}
