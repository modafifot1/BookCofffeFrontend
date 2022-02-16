import { AccountBox } from "@material-ui/icons";
import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchInput } from "../components/common/CommonInput";
import EnhancedTable from "../components/customerTable/EnhancedTable";
import { getCustomers } from "../redux/slices/customerSlice";
import { convertQuery2String } from "../utils";

export const CustomerManagement = () => {
  const { customers } = useSelector((state) => state.customer);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState({
    searchText: "",
    customerType: 0,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCustomers());
  }, []);
  useEffect(() => {
    setData(customers.data);
  }, [customers.data]);
  const onSearch = (searchText) => {
    setQuery({
      ...query,
      searchText,
    });
  };
  const onChangeEmployeeType = (event) => {
    setQuery({
      ...query,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    const queryString = convertQuery2String(query);
    dispatch(getCustomers(queryString));
  }, [query]);
  return (
    <div className="employee-management-container">
      <div className="page-title">
        <div className="page-icon">
          <AccountBox />
        </div>
        <div className="page-title-content">
          <div className="page-title-content-header">Khách hàng</div>
          <div className="page-title-content-footer">Quản lý khách hàng</div>
        </div>
      </div>
      <div className="employee-management-header">
        <div className="employee-search">
          <SearchInput
            onClick={onSearch}
            value={query.searchText}
          ></SearchInput>
        </div>
        <div className="employee-filtering">
          <div className="employee-filtering-type">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Trạng thái nhân viên
                </InputLabel>
                <NativeSelect
                  inputProps={{
                    name: "customerType",
                  }}
                  onChange={onChangeEmployeeType}
                  value={query.customerType}
                >
                  <option value={0}>Tất cả</option>
                  <option value={-1}>Bình thường</option>
                  <option value={1}>Đã khóa</option>
                </NativeSelect>
              </FormControl>
            </Box>
          </div>
        </div>
      </div>
      {customers.loadingPage ? (
        <div className="loading">
          <CircularProgress color="success" />
        </div>
      ) : (
        <EnhancedTable data={data} setData={setData}></EnhancedTable>
      )}
    </div>
  );
};
