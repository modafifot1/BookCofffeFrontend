import React from "react";
import { FoodCategory } from "../components/category/FoodCategory";


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
