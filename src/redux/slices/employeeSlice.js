import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { employeeApi } from "../../apis";

export const getEmployees = createAsyncThunk(
  "get/employees",
  async (queryString, { rejectWithValue, dispatch }) => {
    try {
      return await employeeApi.getEmployees(queryString);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getEmployee = createAsyncThunk(
  "get/employee",
  async (employeeId, { rejectWithValue, dispatch }) => {
    try {
      return await employeeApi.getEmployee(employeeId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateEmployee = createAsyncThunk(
  "update/employee",
  async ({ employeeId, data }, { rejectWithValue, dispatch }) => {
    try {
      return await employeeApi.updateEmployee(employeeId, data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createEmployee = createAsyncThunk(
  "create/employee",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      return await employeeApi.createEmployee(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "delete/employee",
  async (employeeIds, { rejectWithValue, dispatch }) => {
    try {
      return await employeeApi.deleteEmployee(employeeIds);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const initialState = {
  employees: {
    data: [],
    loading: false,
    status: null,
    msg: "",
  },
  employee: {
    data: {},
    loading: false,
    status: null,
    msg: "",
  },
  employeeId: "",
  isOpen: false,
};

const employeeSlice = createSlice({
  name: "/employee",
  initialState,
  reducers: {
    resetEmployeeState(state, action) {
      console.log("ssdsd");
      state.employee.data = {
        email: "",
        password: "",
        fullName: "",
        phoneNumber: "",
        birthday: new Date(),
        address: "",
        isConfirmed: false,
      };
    },
    setEmployeeId(state, action) {
      state.employeeId = action.payload.employeeId;
      state.isOpen = action.payload.isOpen;
    },
    onEmployeeChange(state, action) {
      state.employee.data = {
        ...state.employee.data,
        [action.payload[0]]: action.payload[1],
      };
    },
  },
  extraReducers: {
    [getEmployees.pending](state, action) {
      state.employees.loading = true;
      state.employees.msg = "";
      state.employees.status = null;
    },
    [getEmployees.fulfilled](state, action) {
      state.employees.data = action.payload.employees;
      state.employees.loading = false;
      state.employees.status = action.payload.status;
      state.employees.msg = action.payload.msg;
    },
    [getEmployees.rejected](state, action) {
      state.employees.loading = false;
      state.employees.status = action.payload?.status;
      state.employees.msg = action.payload?.msg;
    },
    [getEmployee.pending](state, action) {
      state.employee.loading = true;
      state.employee.msg = "";
      state.employee.status = null;
    },
    [getEmployee.fulfilled](state, action) {
      state.employee.data = action.payload.employee;
      state.employee.loading = false;
      state.employee.status = action.payload.status;
      state.employee.msg = action.payload.msg;
    },
    [getEmployee.rejected](state, action) {
      state.employee.loading = false;
      state.employee.status = action.payload?.status;
      state.employee.msg = action.payload?.msg;
    },
    [updateEmployee.pending](state, action) {
      state.employee.loading = true;
      state.employee.status = null;
      state.employee.msg = "";
    },
    [updateEmployee.fulfilled](state, action) {
      state.employee.loading = false;
      state.employee.status = action.payload.status;
      state.employee.msg = action.payload.msg;
      const newEmployee = state.employee.data;
      const foodIndex = state.employees.data.findIndex(
        (ele) => ele._id === state.employeeId
      );
      state.employees.data[foodIndex] = newEmployee;
    },
    [updateEmployee.rejected](state, action) {
      state.employee.loading = false;
      state.employee.status = action.payload?.status;
      state.employee.msg = action.payload?.msg;
    },
    [createEmployee.pending](state, action) {
      state.employee.loading = true;
      state.employee.status = null;
      state.employee.msg = "";
    },
    [createEmployee.fulfilled](state, action) {
      state.employee.loading = false;
      state.employee.status = action.payload.status;
      state.employee.msg = action.payload.msg;
      state.employee.data = {
        ...state.employee.data,
        _id: action.payload.userId,
      };
      state.employees.data.push(state.employee.data);
    },
    [createEmployee.rejected](state, action) {
      state.employee.loading = false;
      state.employee.status = action.payload?.status;
      state.employee.msg = action.payload?.msg;
    },
    [deleteEmployee.pending](state, action) {
      state.employee.loading = true;
      state.employee.status = null;
      state.employee.msg = "";
    },
    [deleteEmployee.fulfilled](state, action) {
      state.employee.loading = false;
      state.employee.status = action.payload.status;
      state.employee.msg = action.payload.msg;
      state.employees.data = state.employees.data.filter(
        (item) => !action.payload.employeeIds.includes(item._id)
      );
    },
    [deleteEmployee.rejected](state, action) {
      state.employee.loading = false;
      state.employee.status = action.payload?.status;
      state.employee.msg = action.payload?.msg;
    },
  },
});

const { reducer, actions } = employeeSlice;
export const {
  resetEmployeeState,
  setEmployeeId,
  onEmployeeChange,
  onDeleteEmplyees,
} = actions;
export default reducer;
