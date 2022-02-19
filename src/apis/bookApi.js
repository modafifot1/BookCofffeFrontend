import { axiosClient } from ".";

export const bookApi = {
  getListBook(query) {
    return axiosClient.get(`/books?${query}`);
  },
  getBookById(bookId) {
    return axiosClient.get(`/books/${bookId}`);
  },
  updateBookById(bookId, data) {
    return axiosClient.put(`/books/${bookId}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  createBook(data) {
    return axiosClient.post("/books", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  deleteBook(bookId) {
    return axiosClient.delete(`/books`, {
      data: bookId,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
