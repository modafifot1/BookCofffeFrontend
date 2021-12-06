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

// const dummy = [
//   {
//     confirmed: true,
//     _id: "60a5eca198cf780015b07ba9",
//     typeId: 2,
//     name: "Soda việt quất",
//     unitPrice: 20000,
//     imageUrl:
//       "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486753/ucjeoycowijv0fw935ft.jpg",
//     discountOff: 5,
//     description: "Hương vị tươi ngon, 100% hương liệu thiên nhiên.",
//     discountMaximum: 5000,
//     createAt: "2021-05-20T04:59:13.610Z",
//     __v: 0,
//   },
//   {
//     confirmed: true,
//     _id: "60a5ecdd98cf780015b07baa",
//     typeId: 2,
//     name: "Soda bạc hà",
//     unitPrice: 20000,
//     imageUrl:
//       "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
//     discountOff: 5,
//     description: "Hương vị tươi ngon, 100% hương liệu từ thiên nhiên",
//     discountMaximum: 5000,
//     createAt: "2021-05-20T05:00:13.401Z",
//     __v: 0,
//     numOfFeedbacks: 1,
//     numOfStars: 5,
//   },
//   {
//     confirmed: true,
//     _id: "60a5f17798cf780015b07bae",
//     typeId: 2,
//     name: "Soda dâu tây",
//     unitPrice: 20000,
//     imageUrl:
//       "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621487991/rs2zjweyrchkl5ek4luu.jpg",
//     discountOff: 0,
//     description: "Đồ uống mát lạnh, 100% hương liệu thiên nhiên",
//     discountMaximum: 0,
//     createAt: "2021-05-20T05:19:51.724Z",
//     __v: 0,
//     numOfFeedbacks: 1,
//     numOfStars: 5,
//   },
//   {
//     confirmed: true,
//     _id: "60b6ee9b8c401c00156bb4b5",
//     typeId: 2,
//     name: "Sữa tươi Trân Châu Đường đen",
//     unitPrice: 20000,
//     imageUrl:
//       "https://res.cloudinary.com/dacnpm17n2/image/upload/v1622601371/qmrqje6cvqtirclsjuwu.jpg",
//     discountOff: 0,
//     description: "undefined",
//     discountMaximum: 0,
//     createAt: "2021-06-02T02:36:11.851Z",
//     __v: 0,
//   },
//   {
//     confirmed: true,
//     _id: "6129806a5b6609001683faad",
//     typeId: 1,
//     name: "Gà quay",
//     unitPrice: 139000,
//     imageUrl:
//       "https://res.cloudinary.com/dacnpm17n2/image/upload/v1630109802/yccykuuqh6xfo2nmvshb.jpg",
//     discountOff: 10,
//     description: "Gà quay",
//     discountMaximum: 10000,
//     createAt: "2021-08-28T00:16:42.952Z",
//     __v: 0,
//   },
//   {
//     confirmed: true,
//     _id: "612980db5b6609001683faae",
//     typeId: 1,
//     name: "Nước chanh giải khát",
//     unitPrice: 20000,
//     imageUrl:
//       "https://res.cloudinary.com/dacnpm17n2/image/upload/v1630109915/ltckkvyyvfzw0ztxlgjd.jpg",
//     discountOff: 0,
//     description: "abc",
//     discountMaximum: 0,
//     createAt: "2021-08-28T00:18:35.465Z",
//     __v: 0,
//   },
//   {
//     confirmed: true,
//     _id: "612987a45b6609001683fabc",
//     typeId: 1,
//     name: "Nước chanh giải khát",
//     unitPrice: 20000,
//     imageUrl:
//       "https://res.cloudinary.com/dacnpm17n2/image/upload/v1630111652/cb7k83ycp61p2i6h6a5e.jpg",
//     discountOff: 10,
//     description: "undefined",
//     discountMaximum: 1000,
//     createAt: "2021-08-28T00:47:32.731Z",
//     __v: 0,
//   },
//   {
//     confirmed: true,
//     _id: "612989ef5b6609001683fafc",
//     typeId: 2,
//     name: "Expresso",
//     unitPrice: 20001,
//     imageUrl:
//       "https://res.cloudinary.com/dacnpm17n2/image/upload/v1630112237/zrsg9pxbbpihhzqsosca.jpg",
//     discountOff: 0,
//     description: "undefined",
//     discountMaximum: 0,
//     createAt: "2021-08-28T00:57:19.600Z",
//     __v: 0,
//   },
//   {
//     confirmed: true,
//     _id: "612989ef5b6609001683fafc",
//     typeId: 2,
//     name: "Expresso",
//     unitPrice: 20001,
//     imageUrl:
//       "https://res.cloudinary.com/dacnpm17n2/image/upload/v1630112237/zrsg9pxbbpihhzqsosca.jpg",
//     discountOff: 0,
//     description: "undefined",
//     discountMaximum: 0,
//     createAt: "2021-08-28T00:57:19.600Z",
//     __v: 0,
//   },
// ];

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
