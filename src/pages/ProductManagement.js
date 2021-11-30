import React, { useState } from "react";
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

const dummy = [
  {
    confirmed: true,
    _id: "60a5eca198cf780015b07ba9",
    typeId: 2,
    name: "Soda việt quất",
    unitPrice: 20000,
    imageUrl:
      "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486753/ucjeoycowijv0fw935ft.jpg",
    discountOff: 5,
    description: "Hương vị tươi ngon, 100% hương liệu thiên nhiên.",
    discountMaximum: 5000,
    createAt: "2021-05-20T04:59:13.610Z",
    __v: 0,
  },
  {
    confirmed: true,
    _id: "60a5ecdd98cf780015b07baa",
    typeId: 2,
    name: "Soda bạc hà",
    unitPrice: 20000,
    imageUrl:
      "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
    discountOff: 5,
    description: "Hương vị tươi ngon, 100% hương liệu từ thiên nhiên",
    discountMaximum: 5000,
    createAt: "2021-05-20T05:00:13.401Z",
    __v: 0,
    numOfFeedbacks: 1,
    numOfStars: 5,
  },
  {
    confirmed: true,
    _id: "60a5f17798cf780015b07bae",
    typeId: 2,
    name: "Soda dâu tây",
    unitPrice: 20000,
    imageUrl:
      "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621487991/rs2zjweyrchkl5ek4luu.jpg",
    discountOff: 0,
    description: "Đồ uống mát lạnh, 100% hương liệu thiên nhiên",
    discountMaximum: 0,
    createAt: "2021-05-20T05:19:51.724Z",
    __v: 0,
    numOfFeedbacks: 1,
    numOfStars: 5,
  },
  {
    confirmed: true,
    _id: "60b6ee9b8c401c00156bb4b5",
    typeId: 2,
    name: "Sữa tươi Trân Châu Đường đen",
    unitPrice: 20000,
    imageUrl:
      "https://res.cloudinary.com/dacnpm17n2/image/upload/v1622601371/qmrqje6cvqtirclsjuwu.jpg",
    discountOff: 0,
    description: "undefined",
    discountMaximum: 0,
    createAt: "2021-06-02T02:36:11.851Z",
    __v: 0,
  },
  {
    confirmed: true,
    _id: "6129806a5b6609001683faad",
    typeId: 1,
    name: "Gà quay",
    unitPrice: 139000,
    imageUrl:
      "https://res.cloudinary.com/dacnpm17n2/image/upload/v1630109802/yccykuuqh6xfo2nmvshb.jpg",
    discountOff: 10,
    description: "Gà quay",
    discountMaximum: 10000,
    createAt: "2021-08-28T00:16:42.952Z",
    __v: 0,
  },
  {
    confirmed: true,
    _id: "612980db5b6609001683faae",
    typeId: 1,
    name: "Nước chanh giải khát",
    unitPrice: 20000,
    imageUrl:
      "https://res.cloudinary.com/dacnpm17n2/image/upload/v1630109915/ltckkvyyvfzw0ztxlgjd.jpg",
    discountOff: 0,
    description: "abc",
    discountMaximum: 0,
    createAt: "2021-08-28T00:18:35.465Z",
    __v: 0,
  },
  {
    confirmed: true,
    _id: "612987a45b6609001683fabc",
    typeId: 1,
    name: "Nước chanh giải khát",
    unitPrice: 20000,
    imageUrl:
      "https://res.cloudinary.com/dacnpm17n2/image/upload/v1630111652/cb7k83ycp61p2i6h6a5e.jpg",
    discountOff: 10,
    description: "undefined",
    discountMaximum: 1000,
    createAt: "2021-08-28T00:47:32.731Z",
    __v: 0,
  },
  {
    confirmed: true,
    _id: "612989ef5b6609001683fafc",
    typeId: 2,
    name: "Expresso",
    unitPrice: 20001,
    imageUrl:
      "https://res.cloudinary.com/dacnpm17n2/image/upload/v1630112237/zrsg9pxbbpihhzqsosca.jpg",
    discountOff: 0,
    description: "undefined",
    discountMaximum: 0,
    createAt: "2021-08-28T00:57:19.600Z",
    __v: 0,
  },
  {
    confirmed: true,
    _id: "612989ef5b6609001683fafc",
    typeId: 2,
    name: "Expresso",
    unitPrice: 20001,
    imageUrl:
      "https://res.cloudinary.com/dacnpm17n2/image/upload/v1630112237/zrsg9pxbbpihhzqsosca.jpg",
    discountOff: 0,
    description: "undefined",
    discountMaximum: 0,
    createAt: "2021-08-28T00:57:19.600Z",
    __v: 0,
  },
];
export const ProductManagement = () => {
  const [age, setAge] = useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [page, setPage] = useState(1);
  const handleChangePage = (event, value) => {
    setPage(value);
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
          <SearchInput></SearchInput>
        </div>
        <div className="food-filtering">
          <div className="food-filtering-type">
            <Select
              value={age}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>Chọn loại sản phẩm</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </div>
          <div className="food-filtering-category">
            <Select
              value={age}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>Chọn loại</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </div>
          <div className="food-filtering-sorting">
            <Select
              value={age}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>Tăng dần</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </div>
          <Button variant="contained" endIcon={<AddIcon />}>
            Thêm mới
          </Button>
        </div>
      </div>
      <Grid
        className="product-management-content"
        container
        rowSpacing={3}
        columnSpacing={4}
      >
        {dummy.map((item, index) => {
          return (
            <Grid key={item._id} item xs={6} md={4} lg={3}>
              <FoodCategory item={item} key={index}></FoodCategory>
            </Grid>
          );
        })}
      </Grid>
      <div className="product-management-footer">
        <Stack spacing={2}>
          <Typography>Trang: {page}</Typography>
          <Pagination count={10} page={page} onChange={handleChangePage} />
        </Stack>
      </div>
    </div>
  );
};
