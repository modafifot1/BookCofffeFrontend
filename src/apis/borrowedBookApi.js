import { axiosClient } from "./axiosClient";

export const borrowedBookApi = {
  getBorrowedBookByStatus(borrowedBooktatus) {
    return axiosClient.get(`/borrowedBook/statuses/${borrowedBooktatus}`);
  },
  getBorrowedBookById(borrowedBookId) {
    return axiosClient.get(`/borrowedBook/${borrowedBookId}`);
  },
  updateBorrowedBookById(borrowedBookId) {
    return axiosClient.put(`/borrowedBook/${borrowedBookId}`);
  },
};
