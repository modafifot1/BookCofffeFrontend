import axios from "axios";
import { axiosClient } from "./axiosClient";

export const statisticApi = {
  getRevenuesInfo(getInfoBy) {
    return axiosClient.get(`/statistic/revenueInfo/${getInfoBy}`);
  },
  getGeneralInfo() {
    return axiosClient.get("/statistic/generalInfo");
  },
};
