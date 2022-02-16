import React from "react";
import { LibraryBooks } from "@material-ui/icons";

export const BorrowAndReturnBookManagement = () => {
  return (
    <div className="borrow-and-return-book-management-container">
      <div className="page-title">
        <div className="page-icon">
          <LibraryBooks />
        </div>
        <div className="page-title-content">
          <div className="page-title-content-header">Mượn trả sách</div>
          <div className="page-title-content-footer">Quản lý mượn trả sách</div>
        </div>
      </div>
    </div>
  );
};
