import { Timeline } from "@material-ui/icons";
import React from "react";

export const StatisticManagement = () => {
  return (
    <div className="statistic-management-container">
      <div className="page-title">
        <div className="page-icon">
          <Timeline />
        </div>
        <div className="page-title-content">
          <div className="page-title-content-header">Doanh thu</div>
          <div className="page-title-content-footer">Quản lý doanh thu</div>
        </div>
      </div>
    </div>
  );
};
