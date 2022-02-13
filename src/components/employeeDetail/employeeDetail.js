import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import {
  getEmployee,
  resetEmployeeState,
  onEmployeeChange,
  updateEmployee,
  createEmployee,
  deleteEmployee,
} from "../../redux/slices/employeeSlice";
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

export const EmployeeDetail = ({ employeeId, onClose }) => {
  const dispatch = useDispatch();
  let { employee } = useSelector((state) => state.employee);
  const [isDisabled, setIsDisabled] = useState(employeeId ? true : false);
  const [localError, setLocalError] = useState({
    name: "",
    unitPrice: "",
  });
  useEffect(() => {
    if (employeeId) {
      console.log("getEmployee");
      dispatch(getEmployee(employeeId));
    } else {
      dispatch(resetEmployeeState());
    }
  }, [employeeId]);
  const onEdit = () => {
    console.log("onEdit");
    setIsDisabled(false);
  };
  const onDelete = () => {
    dispatch(deleteEmployee({ employeeIds: [employeeId] }));
  };
  const onValidate = () => {
    if (!validator.isEmail(employee.data.email)) {
      setLocalError({
        ...localError,
        email: "Vui lòng nhập đúng định dạng email!",
      });
      return false;
    }
    if (
      !employeeId &&
      !validator.isStrongPassword(employee.data.password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 0,
        minSymbols: 1,
        returnScore: false,
        pointsPerUnique: 0,
        pointsPerRepeat: 0,
        pointsForContainingLower: 0,
        pointsForContainingUpper: 0,
        pointsForContainingNumber: 0,
        pointsForContainingSymbol: 0,
      })
    ) {
      setLocalError({
        ...localError,
        password:
          "Mật khẩu có độ dài tối thiểu 8, yêu cầu ít nhất 1 kí tự thường, 1 kí tự hoa và 1 kí tự đặc biệt!",
      });
      return false;
    }
    if (
      validator.isEmpty(employee.data.fullName ? employee.data.fullName : "")
    ) {
      setLocalError({
        ...localError,
        name: "Vui lòng nhập tên nhân viên",
      });
      return false;
    }
    if (
      !validator.isAlphanumeric(
        employee.data.phoneNumber ? employee.data.phoneNumber : ""
      ) &&
      employee.data.phoneNumber.length != 11 &&
      employee.data.phoneNumber.length != 10
    ) {
      setLocalError({
        ...localError,
        name: "Vui lòng nhập đúng số điện thoại",
      });
      return false;
    }

    return true;
  };
  const onCreateFood = () => {
    console.log("onValidate()", onValidate());
    console.log("localError: ", localError);
    if (onValidate()) {
      if (employeeId) {
        dispatch(updateEmployee({ employeeId, data: employee.data }));
      } else {
        console.log("createEployee", employee.data);
        dispatch(createEmployee(employee.data));
      }
    }
  };
  const onTextFieldFocus = (event) => {
    setLocalError({
      ...localError,
      [event.target.name]: "",
    });
  };
  const onTextFieldChange = (event) => {
    dispatch(onEmployeeChange([event.target.name, event.target.value]));
  };

  return (
    <div className="employee-detail-container">
      {employee.loading && <SpinLoading></SpinLoading>}
      <Box sx={style} className="employee-detail-box">
        <div className="employee-detail-icon-close">
          <IconButton aria-label="delete" size="large" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        {employeeId ? (
          <div className="flex j-space-between">
            <div className="control-button">
              <Button
                className="delete-button"
                variant="contained"
                startIcon={<DeleteIcon />}
                color="error"
                onClick={onDelete}
              >
                Xóa
              </Button>
              <Button
                className="edit-button"
                variant="contained"
                startIcon={<EditIcon />}
                color="info"
                onClick={onEdit}
              >
                Chỉnh sửa
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="new-lable">
              <NewReleasesIcon />
              <h3>Nhân viên mới phẩm mới</h3>
            </div>
          </div>
        )}
        <div className="employee-detail-content">
          <div className="employee-detail-avatar">
            <div className="food-image">
              <img
                src={
                  employee.data?.imageUrl ? employee.data?.imageUrl : NoImage
                }
                alt="Food"
                className="image"
              ></img>
            </div>
          </div>
          <div className="employee-detail-info">
            <TextField
              disabled={employeeId ? true : false}
              className="employee-detail-input"
              name="email"
              required
              label="Email"
              value={employee.data.email ? employee.data.email : ""}
              error={localError.email}
              onFocus={onTextFieldFocus}
              helperText={localError.email ? localError.email : ""}
              onChange={onTextFieldChange}
              type="email"
            />
            <TextField
              disabled={employeeId ? true : false}
              className="employee-detail-input"
              name="password"
              required
              label="Password"
              value={employee.data.password ? employee.data.password : ""}
              error={localError.password}
              onFocus={onTextFieldFocus}
              helperText={localError.password ? localError.password : ""}
              onChange={onTextFieldChange}
              type="password"
            />
            <TextField
              disabled={isDisabled}
              className="employee-detail-input"
              name="fullName"
              required
              label="Họ và tên"
              value={employee.data.fullName ? employee.data.fullName : ""}
              onChange={onTextFieldChange}
              error={localError.fullName}
              onFocus={onTextFieldFocus}
              helperText={localError.fullName ? localError.fullName : ""}
            />
            <TextField
              disabled={isDisabled}
              className="employee-detail-input"
              name="phoneNumber"
              required
              label="Số điện thoại"
              value={employee.data.phoneNumber ? employee.data.phoneNumber : ""}
              onChange={onTextFieldChange}
              error={localError.phoneNumber}
              onFocus={onTextFieldFocus}
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
                employee.data.birthday
                  ? moment(employee.data.birthday).format("yyyy-MM-DD")
                  : moment(new Date(Date.now())).format("yyyy-MM-DD")
              }
              onChange={onTextFieldChange}
              error={localError.birthday}
              onFocus={onTextFieldFocus}
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
              value={employee.data.address ? employee.data.address : ""}
              onChange={onTextFieldChange}
              error={localError.address}
              onFocus={onTextFieldFocus}
              helperText={localError.address ? localError.address : ""}
            />
            <div className={`employeeStatus ${employee.data.isConfirmed}`}>
              {employee.data.isConfirmed ? "Đã kích hoạt" : "Chưa kích hoạt"}
            </div>
          </div>
        </div>
        {isDisabled === false && (
          <div className="footer">
            <Button
              className="delete-button"
              variant="contained"
              startIcon={<SaveIcon />}
              color="success"
              onClick={onCreateFood}
            >
              Xác nhận
            </Button>
          </div>
        )}
      </Box>
    </div>
  );
};
