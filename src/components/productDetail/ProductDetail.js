import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { FoodCategory } from "../category/FoodCategory";
import TextField from "@mui/material/TextField";
import {
  getProduct,
  onProductContentChange,
  resetProductState,
  createProduct,
  updateProduct,
  deleteProduct,
  confirmFood,
} from "../../redux/slices/productSlice";
import CloseIcon from "@mui/icons-material/CancelPresentationOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/EditOutlined";
import SaveIcon from "@mui/icons-material/CheckOutlined";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import { Button, IconButton } from "@mui/material";
import { Input } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import validator from "validator";
import { SpinLoading } from "../common/SpinLoading";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ProductDetail = ({ productId, onClose }) => {
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.product);
  const [isDisabled, setIsDisabled] = useState(productId ? true : false);
  const [localError, setLocalError] = useState({
    name: "",
    unitPrice: "",
  });
  useEffect(() => {
    if (productId) {
      console.log("getproduct");
      dispatch(getProduct(productId));
    } else {
      dispatch(resetProductState());
    }
  }, [productId]);

  const onTextFieldChange = (event) => {
    dispatch(onProductContentChange([event.target.name, event.target.value]));
  };
  const onImageSelect = (event) => {
    const file = event.target.files[0];
    dispatch(onProductContentChange(["imageUrl", URL.createObjectURL(file)]));
    dispatch(onProductContentChange(["image", file]));
  };
  const onEdit = () => {
    console.log("onEdit");
    setIsDisabled(false);
  };
  const onDelete = () => {
    dispatch(deleteProduct(productId));
  };
  const onValidate = () => {
    if (validator.isEmpty(product.name ? product.name : "")) {
      setLocalError({
        ...localError,
        name: "Vui l??ng nh???p t??n s???n ph???m",
      });
      return false;
    }
    if (product.unitPrice <= 0) {
      setLocalError({
        ...localError,
        unitPrice: "Vui l??ng ch???n gi?? s???n ph???m",
      });
      return false;
    }
    return true;
  };
  const onCreateFood = () => {
    if (!productId && onValidate()) {
      dispatch(createProduct(product));
    } else {
      dispatch(updateProduct(product));
    }
  };
  const onTextFieldFocus = (event) => {
    setLocalError({
      ...localError,
      [event.target.name]: "",
    });
  };
  const onConfrimFood = () => {
    dispatch(confirmFood(productId));
  };
  return (
    <div className="product-detail-container">
      {loading && <SpinLoading></SpinLoading>}
      <Box sx={style} className="product-detail-box">
        <div className="product-detail-icon-close">
          <IconButton aria-label="delete" size="large" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        {productId ? (
          <div className="flex j-space-between">
            {!isDisabled && (
              <label htmlFor="icon-button-file">
                <Input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  style={{ display: "none" }}
                  onChange={onImageSelect}
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            )}
            <div className="control-button">
              <Button
                className="delete-button"
                variant="contained"
                startIcon={<DeleteIcon />}
                color="error"
                onClick={onDelete}
              >
                X??a
              </Button>
              <Button
                className="edit-button"
                variant="contained"
                startIcon={<EditIcon />}
                color="info"
                onClick={onEdit}
              >
                Ch???nh s???a
              </Button>
              <Button
                className="confirm-button"
                variant="contained"
                startIcon={<SaveIcon />}
                color="success"
                onClick={onConfrimFood}
              >
                Duy???t
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="new-lable">
              <NewReleasesIcon />
              <h3>S???n ph???m m???i</h3>
            </div>
            <label htmlFor="icon-button-file">
              <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                style={{ display: "none" }}
                onChange={onImageSelect}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </div>
        )}
        <div className="product-detail-content">
          <div className="product-detail-display">
            <FoodCategory item={product}></FoodCategory>
          </div>
          <div className="product-detail-info">
            <TextField
              disabled={isDisabled}
              className="product-detail-input"
              name="name"
              required
              label="T??n s???n ph???m"
              value={product.name ? product.name : ""}
              onChange={onTextFieldChange}
              error={localError.name}
              onFocus={onTextFieldFocus}
              helperText={localError.name ? localError.name : ""}
            />
            <TextField
              disabled={isDisabled}
              className="product-detail-input"
              name="unitPrice"
              required
              label="????n gi??"
              value={product.unitPrice ? product.unitPrice : 0}
              onChange={onTextFieldChange}
              type="number"
              inputProps={{
                min: 0,
                step: 1000,
              }}
              error={localError.unitPrice}
              onFocus={onTextFieldFocus}
              helperText={localError.unitPrice ? localError.unitPrice : ""}
            />
            <TextField
              disabled={isDisabled}
              className="product-detail-input"
              name="discountOff"
              label="Gi???m gi?? (%)"
              value={product.discountOff ? product.discountOff : 0}
              onChange={onTextFieldChange}
              type="number"
              inputProps={{
                min: 0,
              }}
            />
            <TextField
              disabled={isDisabled}
              className="product-detail-input"
              name="discountMax"
              label="Gi???m t???i ??a (VND)"
              value={product.discountMaximum ? product.discountMaximum : 0}
              onChange={onTextFieldChange}
              type="number"
              inputProps={{
                min: 0,
                step: 1000,
              }}
            />
            <TextField
              disabled={isDisabled}
              className="product-detail-input"
              name="description"
              label="M?? t???"
              value={product.description ? product.description : ""}
              onChange={onTextFieldChange}
              multiline
            />
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
              X??c nh???n
            </Button>
          </div>
        )}
      </Box>
    </div>
  );
};
