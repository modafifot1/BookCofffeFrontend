import { AccountBox } from "@material-ui/icons";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchInput } from "../components/common/CommonInput";
import AddIcon from "@mui/icons-material/Add";
import EnhancedTable from "../components/employeeTable/EnhancedTable";
import { getEmployees, setEmployeeId } from "../redux/slices/employeeSlice";
import { convertQuery2String } from "../utils";
import { Notification } from "../components/common/Notification";

export const EmployeeManagement = () => {
  const { employees, employee } = useSelector((state) => state.employee);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState({
    searchText: "",
    employeeType: 0,
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmployees());
  }, []);
  useEffect(() => {
    setData(employees.data);
  }, [employees.data]);
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
    dispatch(getEmployees(queryString));
  }, [query]);
  useEffect(() => {
    if (employees.status) {
      setNotify({
        isOpen: true,
        message: employees.msg,
        type: employees.status < 300 ? "success" : "error",
      });
    }
  }, [employees.status]);
  useEffect(() => {
    if (employee.status) {
      setNotify({
        isOpen: true,
        message: employee.msg,
        type: employee.status < 300 ? "success" : "error",
      });
    }
  }, [employee.status]);
  return (
    <div className="employee-management-container">
      <div className="page-title">
        <div className="page-icon">
          <AccountBox />
        </div>
        <div className="page-title-content">
          <div className="page-title-content-header">Nh??n vi??n</div>
          <div className="page-title-content-footer">Qu???n l?? nh??n vi??n</div>
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
                  Tr???ng th??i nh??n vi??n
                </InputLabel>
                <NativeSelect
                  inputProps={{
                    name: "employeeType",
                  }}
                  onChange={onChangeEmployeeType}
                  value={query.employeeType}
                >
                  <option value={0}>T???t c???</option>
                  <option value={-1}>Ch??a k??ch ho???t</option>
                  <option value={1}>???? k??ch ho???t</option>
                </NativeSelect>
              </FormControl>
            </Box>
          </div>
          <Button
            variant="contained"
            endIcon={<AddIcon />}
            onClick={() => dispatch(setEmployeeId({ isOpen: true }))}
          >
            Th??m m???i
          </Button>
        </div>
      </div>
      {employees.loadingPage ? (
        <div className="loading">
          <CircularProgress color="success" />
        </div>
      ) : (
        <EnhancedTable data={data} setData={setData}></EnhancedTable>
      )}
      <Notification notify={notify} setNotify={setNotify}></Notification>
    </div>
  );
};
