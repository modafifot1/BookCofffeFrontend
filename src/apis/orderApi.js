import { axiosClient } from "./axiosClient";

export const orderApi = {
  getOrdersByStatus(orderStatus) {
    return axiosClient.get(`/orders/statuses/${orderStatus}`);
  },
  getOrderById(orderId) {
    return axiosClient.get(`/orders/${orderId}`);
  },
  updateOrderById(orderId) {
    return axiosClient.put(`/orders/${orderId}`);
  },
};
