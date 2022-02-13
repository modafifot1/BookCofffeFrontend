import { axiosClient } from "./axiosClient";

export const customerApi = {
  getCustomers(queryString) {
    return axiosClient.get(`/customers?${queryString}`);
  },
  getCustomerById(customerId) {
    return axiosClient.get(`/customers/${customerId}`);
  },
  updateCustomerStatus(customerId) {
    return axiosClient.put(`/customers/${customerId}`);
  },
};
