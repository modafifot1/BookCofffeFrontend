import React, { useEffect, useState } from "react";
import { FoodCategory } from "../components/category/FoodCategory";
import Grid from "@mui/material/Grid";
import { LocalBar } from "@material-ui/icons";
import { SearchInput } from "../components/common/CommonInput";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import { ProductDetail } from "../components/productDetail/ProductDetail";
import { useDispatch, useSelector } from "react-redux";
import { convertQuery2String } from "../utils";
import { getProducts } from "../redux/slices/productSlice";
// import { SpinLoading } from "../components/common/SpinLoading";
import CircularProgress from "@mui/material/CircularProgress";
import { Notification } from "../components/common/Notification";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { useHistory } from "react-router";

export const ProductManagement = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [query, setQuery] = useState(null);
  const { products, loadingPage, status, isNewConfirm, error, totalPage } =
    useSelector((state) => state.product);
  const [open, setOpen] = useState(false);
  const [temp, setTemp] = useState(1);

  const handleClose = () => setOpen(false);
  useEffect(() => {
    console.log("params change");
    const params = new URLSearchParams(history.location.search);
    // console.log(params.get("searchText"));
    setQuery({
      ...query,
      searchText: params.get("searchText") || "",
      page: params.get("page") || 1,
      foodType: params.get("foodType") || 1,
      orderBy: params.get("orderBy") || "unitPrice",
      orderType: params.get("orderType") || 1,
    });
    setTemp(params.get("page") || 1);
  }, [history]);
  useEffect(() => {
    if (!query) return;
    window.history.pushState(
      {},
      null,
      `/product-management?searchText=${query?.searchText}&page=${query?.page}&foodType=${query?.foodType}&orderBy=${query?.orderBy}&orderType=${query?.orderType}`
    );
    const queryString = `${convertQuery2String(query)}`;
    console.log("Query string: ", queryString);
    dispatch(getProducts(queryString));
  }, [query]);
  useEffect(() => {
    if (status) {
      setOpen(false);
    }
  }, [status]);
  useEffect(() => {
    if (status) {
      setNotify({
        isOpen: true,
        message: status.msg ? status.msg : error.msg,
        type: status.status
          ? status.status < 300
            ? "success"
            : "error"
          : "error",
      });
    }
  }, [status]);
  useEffect(() => {
    if (isNewConfirm) {
      const queryString = `${convertQuery2String(query)}`;
      console.log("Query string: ", queryString);
      dispatch(getProducts(queryString));
    }
  }, [isNewConfirm]);
  const handleChange = (event) => {
    console.log(event.target.name, ": " + event.target.value);
    setQuery({
      ...query,
      [event.target.name]: event.target.value,
      page: 1,
    });
  };

  const onSearchClick = (searchText) => {
    setQuery({
      ...query,
      searchText,
    });
  };

  const handleChangePage = (event, value) => {
    setTemp(value);

    setQuery({
      ...query,
      page: value,
    });

    console.log(value);
  };
  const [productDetailId, setProductDetailId] = useState("");
  const handleClick = (id) => {
    setOpen(true);
    setProductDetailId(id);
  };

  const handleOnNewClick = () => {
    setOpen(true);
    setProductDetailId("");
  };
  return (
    <div className="product-management-container">
      <div className="page-title">
        <div className="page-icon">
          <LocalBar></LocalBar>
        </div>
        <div className="page-title-content">
          <div className="page-title-content-header">Sản phẩm</div>
          <div className="page-title-content-footer">Quản lý sản phẩm</div>
        </div>
      </div>
      <div className="product-management-header">
        <div className="food-search">
          <SearchInput
            onClick={onSearchClick}
            value={query?.searchText}
          ></SearchInput>
        </div>
        <div className="food-filtering">
          <div className="food-filtering-type">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Chọn loại sản phẩm
                </InputLabel>
                <NativeSelect
                  disabled={loadingPage ? true : false}
                  value={query?.foodType}
                  onChange={handleChange}
                  inputProps={{
                    name: "foodType",
                  }}
                >
                  <option value={true}>Đã duyệt</option>
                  <option value={false}>Chưa duyệt</option>
                </NativeSelect>
              </FormControl>
            </Box>
          </div>
          <div className="food-filtering-category">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Sắp xếp theo
                </InputLabel>
                <NativeSelect
                  disabled={loadingPage ? true : false}
                  value={query?.orderBy}
                  onChange={handleChange}
                  inputProps={{
                    name: "orderBy",
                  }}
                >
                  <option value={"unitPrice"}>Giá</option>
                  <option value={"discountOff"}>Giảm giá</option>
                </NativeSelect>
              </FormControl>
            </Box>
          </div>
          <div className="food-filtering-sorting">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Thứ tự
                </InputLabel>
                <NativeSelect
                  disabled={loadingPage ? true : false}
                  onChange={handleChange}
                  value={query?.orderType}
                  inputProps={{
                    name: "orderType",
                  }}
                >
                  <option value={1}>Tăng dần</option>
                  <option value={-1}>Giảm dần</option>
                </NativeSelect>
              </FormControl>
            </Box>
          </div>
          <Button
            variant="contained"
            endIcon={<AddIcon />}
            onClick={handleOnNewClick}
          >
            Thêm mới
          </Button>
        </div>
      </div>
      {loadingPage ? (
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
          {products.map((item, index) => {
            return (
              <Grid key={item._id} item xs={6} md={4} lg={3}>
                <FoodCategory
                  item={item}
                  key={index}
                  handleClick={handleClick}
                ></FoodCategory>
              </Grid>
            );
          })}
        </Grid>
      )}
      <div className="product-management-footer">
        <Stack spacing={2}>
          <Typography>Trang: {query?.page}</Typography>
          <Pagination
            count={totalPage}
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
        <ProductDetail
          productId={productDetailId}
          onClose={handleClose}
        ></ProductDetail>
      </Modal>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};
