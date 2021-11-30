import React from "react";
import { FoodCategory } from "../components/category/FoodCategory";

const dummy = {
  status: 200,
  msg: "Get list confirm food successfullY!",
  foods: [
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
  ],
};
export const DashboardPage = () => {
  return (
    <FoodCategory
      item={{
        confirmed: true,
        _id: "612980db5b6609001683faae",
        typeId: 1,
        name: "Nước chanh giải khát",
        unitPrice: 20000,
        imageUrl:
          "https://res.cloudinary.com/dacnpm17n2/image/upload/v1630109915/ltckkvyyvfzw0ztxlgjd.jpg",
        discountOff: 10,
        description: "abc",
        discountMaximum: 0,
        createAt: "2021-08-28T00:18:35.465Z",
        numOfStars: 2.5,
        __v: 0,
      }}
    ></FoodCategory>
  );
};
