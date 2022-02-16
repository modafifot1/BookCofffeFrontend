import React from "react";
import { MenuBook } from "@material-ui/icons";

export const BookManagement = () => {
  return (
    <div className="book-management-container">
      <div className="page-title">
        <div className="page-icon">
          <MenuBook />
        </div>
        <div className="page-title-content">
          <div className="page-title-content-header">Sách</div>
          <div className="page-title-content-footer">Quản lý sách</div>
        </div>
      </div>
    </div>
  );
};
