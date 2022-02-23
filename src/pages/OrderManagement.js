import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import { OrderCard } from "../components/OrderCard/OrderCard";
import { getOrdersByStatus } from "../redux/slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { Description } from "@material-ui/icons";
import { ModalConfirm } from "../components/Modal/CofirmModal";
const steps = ["Tất cả", "Chờ xác nhận", "Đang chuẩn bị", "Hoàn thành"];

export const OrderManagement = () => {
  const [activeStep, setActiveStep] = React.useState(-1);
  const [completed, setCompleted] = React.useState({});
  const { orders } = useSelector((state) => state.order);
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    let temp = orders.data.map((item) => {
      return {
        ...item,
        showBack: false,
      };
    });
    setData(temp);
  }, [orders.data]);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getOrdersByStatus(activeStep));
  }, [activeStep]);

  const handleStep = (step) => () => {
    console.log("Step: ", step);
    setActiveStep(step - 1);
  };

  return (
    <div className="order-management-container">
      <div className="page-title">
        <div className="page-icon">
          <Description />
        </div>
        <div className="page-title-content">
          <div className="page-title-content-header">Đơn hàng</div>
          <div className="page-title-content-footer">Quản lý đơn hàng</div>
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
      <div className="order-list-container">
        {orders.loading ? (
          <div className="loading">
            <CircularProgress color="success" />
          </div>
        ) : data.length != 0 ? (
          data.map((order) => (
            <OrderCard
              order={order}
              orders={data}
              setOrders={setData}
            ></OrderCard>
          ))
        ) : (
          <div className="loading result">
            Hiện tại không có đơn hàng nào trong mục này
          </div>
        )}
      </div>
    </div>
  );
};
