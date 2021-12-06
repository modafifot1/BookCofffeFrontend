import { axiosClient } from "./axiosClient";
export const productApi = {
  getProducts(query) {
    return axiosClient.get(`/foods?${query}`);
  },
  getProduct(productId) {
    return axiosClient.get(`/foods/${productId}`);
  },
  createNewProduct(product) {
    const formData = new FormData();
    formData.append("image", product.image);
    formData.append("name", product.name);
    formData.append("unitPrice", product.unitPrice);
    formData.append("discountOff", product.discountOff);
    formData.append("discountMaximum", product.discountMaximum);
    formData.append("description", product.description);
    return axiosClient.post(`/foods`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  },
  updateProduct(product) {
    return axiosClient.put(`/foods/${product._id}`, product);
  },
  deleteProduct(productId) {
    return axiosClient.delete(`/foods/${productId}`);
  },
  confirmFood(productId) {
    return axiosClient.post(`/foods/${productId}`);
  },
};
