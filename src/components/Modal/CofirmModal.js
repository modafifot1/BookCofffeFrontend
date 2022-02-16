import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";
import WarningIcon from "@material-ui/icons/Warning";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} timeout={500} />;
});

export const ConfirmModal = ({
  open,
  handleClose,
  message,
  handleSubmit,
  orderStatus,
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <DialogContentText className="alert-dialog-slide-description flex flex-col justify-center items-center">
          <div className="flex items-center">
            <WarningIcon style={{ color: "#fda504", marginRight: 5 }} />{" "}
            <span style={{ fontSize: 20 }}>Bạn có chắc muốn?</span>
          </div>
          <div className="center-text mt-10">
            {message} <span className="text-highligth">{orderStatus}</span>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions className="flex items-center justify-center">
        <Button onClick={handleSubmit} color="primary">
          Đồng ý
        </Button>
        <Button
          onClick={handleClose}
          color="secondary"
          style={{ marginLeft: 20 }}
        >
          Hủy bỏ
        </Button>
      </DialogActions>
    </Dialog>
  );
};
