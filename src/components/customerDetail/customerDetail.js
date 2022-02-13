import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { getCustomer, updateCustomer } from "../../redux/slices/customerSlice";
import CloseIcon from "@mui/icons-material/CancelPresentationOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/EditOutlined";
import SaveIcon from "@mui/icons-material/CheckOutlined";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import { Button, IconButton } from "@mui/material";
import { SpinLoading } from "../common/SpinLoading";
import moment from "moment";
import NoImage from "../../assets/noImage.png";
import validator from "validator";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const CustomerDetail = ({ customerId, onClose }) => {
  const dispatch = useDispatch();
  let { customer } = useSelector((state) => state.customer);
  const [isDisabled, setIsDisabled] = useState(customerId ? true : false);
  const [localError, setLocalError] = useState({
    name: "",
    unitPrice: "",
  });
  useEffect(() => {
    if (customerId) {
      console.log("getCustomer");
      dispatch(getCustomer(customerId));
    }
  }, [customerId]);
  const onEdit = () => {
    dispatch(updateCustomer(customerId));
  };
  return (
    <div className="employee-detail-container">
      {customer.loading && <SpinLoading></SpinLoading>}
      <Box sx={style} className="employee-detail-box">
        <div className="employee-detail-icon-close">
          <IconButton aria-label="delete" size="large" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>

        <div className="flex j-space-between">
          <div className="control-button">
            {!customer.data.isBlocked ? (
              <Button
                className="delete-button"
                variant="contained"
                startIcon={<DeleteIcon />}
                color="error"
                onClick={onEdit}
              >
                Khóa
              </Button>
            ) : (
              <Button
                className="edit-button"
                variant="contained"
                startIcon={<EditIcon />}
                color="info"
                onClick={onEdit}
              >
                Mở khóa
              </Button>
            )}
          </div>
        </div>

        <div className="employee-detail-content">
          <div className="employee-detail-avatar">
            <div className="food-image">
              <img
                src={
                  customer.data?.imageUrl ? customer.data?.imageUrl : NoImage
                }
                alt="Food"
                className="image"
              ></img>
            </div>
          </div>
          <div className="employee-detail-info">
            <TextField
              disabled={true}
              className="employee-detail-input"
              name="email"
              required
              label="Email"
              value={customer.data.email ? customer.data.email : ""}
              error={localError.email}
              helperText={localError.email ? localError.email : ""}
              type="email"
            />
            <TextField
              disabled={true}
              className="employee-detail-input"
              name="password"
              required
              label="Password"
              value={customer.data.password ? customer.data.password : ""}
              error={localError.password}
              helperText={localError.password ? localError.password : ""}
              type="password"
            />
            <TextField
              disabled={isDisabled}
              className="employee-detail-input"
              name="fullName"
              required
              label="Họ và tên"
              value={customer.data.fullName ? customer.data.fullName : ""}
              error={localError.fullName}
              helperText={localError.fullName ? localError.fullName : ""}
            />
            <TextField
              disabled={isDisabled}
              className="employee-detail-input"
              name="phoneNumber"
              required
              label="Số điện thoại"
              value={customer.data.phoneNumber ? customer.data.phoneNumber : ""}
              error={localError.phoneNumber}
              helperText={localError.phoneNumber ? localError.phoneNumber : ""}
              type="number"
            />
            <TextField
              disabled={isDisabled}
              className="employee-detail-input"
              name="birthday"
              required
              label="Ngày sinh"
              value={
                customer.data.birthday
                  ? moment(customer.data.birthday).format("yyyy-MM-DD")
                  : moment(new Date(Date.now())).format("yyyy-MM-DD")
              }
              error={localError.birthday}
              helperText={localError.birthday ? localError.birthday : ""}
              type="date"
              inputProps={{
                max: moment(new Date(Date.now())).format("yyyy-MM-DD"),
              }}
            />
            <TextField
              disabled={isDisabled}
              className="employee-detail-input"
              name="address"
              required
              label="Địa chỉ"
              value={customer.data.address ? customer.data.address : ""}
              error={localError.address}
              helperText={localError.address ? localError.address : ""}
            />
            <div
              className={`employeeStatus ${!customer.data.isBlocked || false}`}
            >
              {customer.data.isBlocked ? "Đã khóa" : "Bình thường"}
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};
