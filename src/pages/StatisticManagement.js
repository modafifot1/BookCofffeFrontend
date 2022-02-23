import React, { useEffect, useState } from "react";
import ProfitIcon from "../assets/icons/profit.png";
import AccessUserIcon from "../assets/icons/group.png";
import NumberSellCourseIcon from "../assets/icons/numberOfCoursesSell.png";
import OrderHandleIcon from "../assets/icons/orderHandle.png";
import TabsStatistic from "../components/common/TabStatistic";
import { DropdownCommon } from "../components/dropdown/DropDown";
import { Bar } from "react-chartjs-2";
import { Timeline } from "@material-ui/icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import {
  getGeneralInfo,
  getRevenuesInfo,
} from "../redux/slices/statisticSlice";
import { dateFunction } from "../utils";
const { getMonthsByquater, getQuaterByMonth } = dateFunction;
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labelOptions = ["Theo tuần", "Theo tháng", "Theo quý", "Theo năm"];
const options = (byType) => {
  return {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: true,
        text: `Biểu đồ doanh thu (${labelOptions[byType]})`,
        fontSize: 24,
      },
    },
  };
};
export const StatisticManagement = () => {
  const dispatch = useDispatch();
  const { revenuesInfo, generalInfo } = useSelector((state) => state.statistic);
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [selectedItem, setSelectedItem] = useState(0);
  const executeData = () => {
    let tempLabels = [
      "Chủ nhật",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
    ];
    const today = new Date();
    if (selectedItem === 1) {
      tempLabels = [];

      const days = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
      ).getDate();
      for (let i = 1; i <= days; i++) {
        tempLabels.push(`Ngày ${i}`);
      }
    }
    if (selectedItem === 2) {
      const quater = getQuaterByMonth(today.getMonth() + 1);
      const months = getMonthsByquater(quater);
      tempLabels = months.map((item) => `Tháng ${item}`);
    }
    if (selectedItem === 3) {
      tempLabels = [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
      ];
    }
    const tempDatasets = tempLabels.map((_, index) => {
      return revenuesInfo.revenues[index.toString()] || 0;
    });
    console.log(tempDatasets);
    setLabels(tempLabels);
    setDatasets(tempDatasets);
  };
  // useEffect();
  useEffect(() => {
    dispatch(getGeneralInfo());
  }, []);
  useEffect(() => {
    dispatch(getRevenuesInfo(selectedItem));
  }, [selectedItem]);
  useEffect(() => {
    executeData();
  }, [revenuesInfo]);
  return (
    <div className="statistic-management-container">
      <div className="page-title">
        <div className="page-icon">
          <Timeline></Timeline>
        </div>
        <div className="page-title-content">
          <div className="page-title-content-header">Doanh thu</div>
          <div className="page-title-content-footer">Quản lý doanh thu</div>
        </div>
      </div>
      <div className="statistic-container">
        <div className="statistic-container__top">
          <div className="statistic-container__top--item turnover">
            <div className="statistic-container__top--item__inner">
              <span>Doanh thu (VND)</span>
              <div>
                <img src={ProfitIcon} alt="" />
                <span>
                  {Math.round(generalInfo.totalRevenues).toLocaleString("en")}
                </span>
              </div>
            </div>
          </div>
          <div className="statistic-container__top--item number-users">
            <div className="statistic-container__top--item__inner">
              <span>Số lượng người dùng</span>
              <div>
                <img src={AccessUserIcon} alt="" />
                <span>{generalInfo.totalCustomers.toLocaleString("en")}</span>
              </div>
            </div>
          </div>
          <div className="statistic-container__top--item number-orders">
            <div className="statistic-container__top--item__inner">
              <span>Số đơn hàng đã xử lý</span>
              <div>
                <img src={OrderHandleIcon} alt="" />
                <span>{generalInfo.totalOrders.toLocaleString("en")}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="statistic-container__bottom">
          <div className="statistic-container__bottom-left">
            <DropdownCommon
              label="Bộ lọc"
              options={labelOptions}
              handleMenuClick={(e) => setSelectedItem(Number(e.key))}
              selectedItem={selectedItem}
            />
            <Bar
              style={{ marginTop: 36 }}
              options={options(selectedItem)}
              data={{
                labels,
                datasets: [
                  {
                    data: datasets,
                    backgroundColor: "rgba(28, 43, 61, 0.8)",
                  },
                ],
              }}
            />
          </div>
          <div className="statistic-container__bottom-right">
            <TabsStatistic />
          </div>
        </div>
      </div>
    </div>
  );
};
