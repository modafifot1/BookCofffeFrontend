import { axiosClient } from "./axiosClient";

export const employeeApi = {
  getEmployees(queryString) {
    return axiosClient.get(`/employees?${queryString}`);
  },
  getEmployee(employeeId) {
    return axiosClient.get(`/employees/${employeeId}`);
  },
  updateEmployee(employeeId, data) {
    return axiosClient.put(`/employees/${employeeId}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  createEmployee(data) {
    return axiosClient.post("/employees", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  deleteEmployee(employeeIds) {
    return axiosClient.delete(`/employees`, {
      data: employeeIds,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
