import { axiosClient } from "./axiosClient";

export const borrowedBookApi = {
  getBorrowedBookByStatus(borrowedBookStatus) {
    return axiosClient.get(`/borrowedBooks/statuses/${borrowedBookStatus}`);
  },
  getBorrowedBookById(borrowedBookId) {
    return axiosClient.get(`/borrowedBooks/${borrowedBookId}`);
  },
  updateBorrowedBookById(borrowedBookId) {
    return axiosClient.put(`/borrowedBooks/${borrowedBookId}`);
  },
};
