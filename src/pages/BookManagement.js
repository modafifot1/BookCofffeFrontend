import React, { useEffect, useState } from "react";
import { MenuBook } from "@material-ui/icons";
import { SearchInput } from "../components/common/CommonInput";
import { Box } from "@mui/system";
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  Modal,
  NativeSelect,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { Notification } from "../components/common/Notification";
import { BookCard } from "../components/BookCard/BookCard";
import { ProductDetail } from "../components/productDetail/ProductDetail";
import { BookDetail } from "../components/BookDetail/BookDetail";
import { getBooks } from "../redux/slices/bookSlice";
import { convertQuery2String } from "../utils";
import { useHistory } from "react-router-dom";

export const BookManagement = () => {
  const history = useHistory();
  const [query, setQuery] = useState(null);
  const [open, setOpen] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [temp, setTemp] = useState(1);

  const [bookDetailId, setBookDetailId] = useState("");
  useEffect(() => {
    console.log("params change");
    const params = new URLSearchParams(history.location.search);
    // console.log(params.get("searchText"));
    setQuery({
      ...query,
      searchText: params.get("searchText") || "",
      page: params.get("page") || 1,
      searchBy: params.get("searchBy") || "title",
      orderBy: params.get("orderBy") || "rating",
      orderType: params.get("orderType") || 1,
    });
    setTemp(params.get("page") || 1);
  }, [history]);

  const { books, book } = useSelector((state) => state.book);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!query) return;
    window.history.pushState(
      {},
      null,
      `/book-management?searchText=${query?.searchText}&page=${query?.page}&searchBy=${query?.searchBy}&orderBy=${query?.orderBy}&orderType=${query?.orderType}`
    );
    const queryString = `${convertQuery2String(query)}`;
    console.log("Query string: ", queryString);
    dispatch(getBooks(queryString));
  }, [query]);
  useEffect(() => {
    if (books.status) {
      setNotify({
        isOpen: true,
        message: books.msg,
        type: books.status < 300 ? "success" : "error",
      });
    }
  }, [books.status]);
  useEffect(() => {
    if (book.status) {
      setNotify({
        isOpen: true,
        message: book.msg,
        type: book.status < 300 ? "success" : "error",
      });
    }
  }, [book.status]);
  const onSearchClick = (searchText) => {
    setQuery({
      ...query,
      searchText,
      page: 1,
    });
  };
  const handleChange = (event) => {
    console.log(event.target.name, ": " + event.target.value);
    setQuery({
      ...query,
      [event.target.name]: event.target.value,
      page: 1,
    });
  };
  const handleOnNewClick = () => {
    setOpen(true);
    setBookDetailId("");
  };
  const handleClose = () => setOpen(false);
  const handleClick = (id) => {
    setBookDetailId(id);
    setOpen(true);
  };
  const handleChangePage = (event, value) => {
    setTemp(value);

    setQuery({
      ...query,
      page: value,
    });

    console.log(value);
  };
  return (
    <div className="book-management-container">
      <div className="page-title">
        <div className="page-icon">
          <MenuBook />
        </div>
        <div className="page-title-content">
          <div className="page-title-content-header">S??ch</div>
          <div className="page-title-content-footer">Qu???n l?? s??ch</div>
        </div>
      </div>
      <div className="product-management-header">
        <div className="book-search">
          <SearchInput
            onClick={onSearchClick}
            value={query?.searchText}
          ></SearchInput>
        </div>
        <div className="book-filtering">
          <div className="book-filtering-type">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  T??m ki???m theo
                </InputLabel>
                <NativeSelect
                  disabled={books.loading ? true : false}
                  value={query?.searchBy}
                  onChange={handleChange}
                  inputProps={{
                    name: "searchBy",
                  }}
                >
                  <option value={"title"}>T??n</option>
                  <option value={"yearOfPublication"}>N??m xu???t b???n</option>
                  <option value={"author"}>T??c gi???</option>
                </NativeSelect>
              </FormControl>
            </Box>
          </div>
          <div className="book-filtering-category">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  S???p x???p theo
                </InputLabel>
                <NativeSelect
                  disabled={books.loading ? true : false}
                  value={query?.orderBy}
                  onChange={handleChange}
                  inputProps={{
                    name: "orderBy",
                  }}
                >
                  <option value={"title"}>T??n</option>

                  <option value={"yearOfPublication"}> N??m xu???t b???n</option>
                  <option value={"rating"}>????nh gi??</option>
                </NativeSelect>
              </FormControl>
            </Box>
          </div>
          <div className="book-filtering-sorting">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Th??? t???
                </InputLabel>
                <NativeSelect
                  disabled={books.loading ? true : false}
                  onChange={handleChange}
                  value={query?.orderType}
                  inputProps={{
                    name: "orderType",
                  }}
                >
                  <option value={1}>T??ng d???n</option>
                  <option value={-1}>Gi???m d???n</option>
                </NativeSelect>
              </FormControl>
            </Box>
          </div>
          <Button
            variant="contained"
            endIcon={<AddIcon />}
            onClick={handleOnNewClick}
          >
            Th??m m???i
          </Button>
        </div>
      </div>
      {books.loading ? (
        <div className="loading">
          <CircularProgress color="success" />
        </div>
      ) : (
        <Grid
          className="product-management-content"
          container
          rowSpacing={3}
          columnSpacing={4}
        >
          {books.data.map((item, index) => {
            return (
              <Grid key={item._id} item xs={6} md={4} lg={3}>
                <BookCard
                  item={item}
                  key={index}
                  handleClick={() => handleClick(item._id)}
                ></BookCard>
              </Grid>
            );
          })}
        </Grid>
      )}
      <div className="book-management-footer">
        <Stack spacing={2}>
          <Typography>Trang: {query?.page}</Typography>
          <Pagination
            count={books.totalPage}
            page={temp}
            defaultValue={temp}
            defaultPage={temp}
            onChange={handleChangePage}
            color="primary"
          />
        </Stack>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <BookDetail bookId={bookDetailId} onClose={handleClose}></BookDetail>
      </Modal>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};
