import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import { OrderCard } from "../components/OrderCard/OrderCard";

const steps = ["Tất cả", "Chờ xác nhận", "Đang chuẩn bị", "Hoàn thành"];

export const OrderManagement = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Box>
      <OrderCard></OrderCard>
    </div>
  );
};
