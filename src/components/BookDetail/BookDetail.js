import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { FoodCategory } from "../category/FoodCategory";
import TextField from "@mui/material/TextField";
import {
  createBook,
  deleteBook,
  getBookById,
  onBookContentChange,
  resetBookState,
  updateBookById,
} from "../../redux/slices/bookSlice";
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
import { BookCard } from "../BookCard/BookCard";
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

export const BookDetail = ({ bookId, onClose }) => {
  const dispatch = useDispatch();
  const { book } = useSelector((state) => state.book);
  // const book = {
  //   title: "Classical Mythology",
  //   author: "Testament",
  //   rating: 3.8,
  //   yearOfPublication: 1998,
  //   imageUrl: "http://images.amazon.com/images/P/0811801128.01.MZZZZZZZ.jpg",
  //   quantity: 5,
  // };
  const loading = false;
  const [isDisabled, setIsDisabled] = useState(bookId ? true : false);
  const [localError, setLocalError] = useState({
    title: "",
    yearOfPublication: "",
    imageUrl: "",
    author: "",
  });
  useEffect(() => {
    if (bookId) {
      dispatch(getBookById(bookId));
    } else {
      dispatch(resetBookState());
    }
  }, [bookId]);

  const onTextFieldChange = (event) => {
    dispatch(onBookContentChange([event.target.name, event.target.value]));
  };
  const onImageSelect = (event) => {
    const file = event.target.files[0];
    dispatch(onBookContentChange(["imageUrl", URL.createObjectURL(file)]));
    dispatch(onBookContentChange(["image", file]));
  };
  const onEdit = () => {
    console.log("onEdit");
    setIsDisabled(false);
  };
  const onDelete = () => {
    dispatch(deleteBook(bookId));
  };
  const onValidate = () => {
    // if (validator.isEmpty(book.name ? book.name : "")) {
    //   setLocalError({
    //     ...localError,
    //     name: "Vui lòng nhập tên sản phẩm",
    //   });
    //   return false;
    // }
    // if (book.unitPrice <= 0) {
    //   setLocalError({
    //     ...localError,
    //     unitPrice: "Vui lòng chọn giá sản phẩm",
    //   });
    //   return false;
    // }
    return true;
  };
  const onCreateFood = () => {
    if (!bookId && onValidate()) {
      dispatch(createBook(book));
    } else {
      dispatch(updateBookById(book));
    }
  };
  const onTextFieldFocus = (event) => {
    setLocalError({
      ...localError,
      [event.target.name]: "",
    });
  };

  return (
    <div className="book-detail-container">
      {loading && <SpinLoading></SpinLoading>}
      <Box sx={style} className="book-detail-box">
        <div className="book-detail-icon-close">
          <IconButton aria-label="delete" size="large" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        {bookId ? (
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
              <h3>Sách mới</h3>
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
        <div className="book-detail-content">
          <div className="book-detail-display">
            <BookCard item={book}></BookCard>
          </div>
          <div className="book-detail-info">
            <TextField
              disabled={isDisabled}
              className="book-detail-input"
              name="title"
              required
              label="Tên sách"
              value={book.data.title ? book.data.title : ""}
              onChange={onTextFieldChange}
              error={localError.title}
              onFocus={onTextFieldFocus}
              helperText={localError.title ? localError.title : ""}
            />
            <TextField
              disabled={isDisabled}
              className="book-detail-input"
              name="yearOfPublication"
              required
              label="Năm xuất bản"
              value={
                book.data.yearOfPublication ? book.data.yearOfPublication : ""
              }
              onChange={onTextFieldChange}
              error={localError.title}
              onFocus={onTextFieldFocus}
              helperText={
                localError.yearOfPublication ? localError.yearOfPublication : ""
              }
            />
            <TextField
              disabled={isDisabled}
              className="book-detail-input"
              name="author"
              required
              label="Tác giả"
              value={book.data.author ? book.data.author : ""}
              onChange={onTextFieldChange}
              error={localError.title}
              onFocus={onTextFieldFocus}
              helperText={localError.author ? localError.author : ""}
            />
            <TextField
              disabled={isDisabled}
              className="book-detail-input"
              name="quantity"
              required
              label="Số lượng còn lại"
              value={book.data.quantity ? book.data.quantity : ""}
              onChange={onTextFieldChange}
              error={localError.title}
              onFocus={onTextFieldFocus}
              helperText={localError.quantity ? localError.quantity : ""}
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
              Xác nhận
            </Button>
          </div>
        )}
      </Box>
    </div>
  );
};
