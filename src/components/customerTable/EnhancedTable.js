import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import HeaderContainer from "./HeaderContainer";
import ToolbarContainer from "./ToolbarContainer";
import BodyContainer from "./BodyContainer";
import { Modal } from "@material-ui/core";
import { CustomerDetail } from "../customerDetail/customerDetail";
import { useSelector, useDispatch } from "react-redux";
import { setCustomerId } from "../../redux/slices/customerSlice";
// import ModalUpdated from "../modal/ModalUpdated";
// import ModalDetail from "../modal/ModalDetail";
// import ModalManageFeedback from "components/common/modal/ModalManageFeedback";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable({ data, setData }) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("createAt");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { customerId, isOpen, customer } = useSelector(
    (state) => state.customer
  );
  const [rows, setRows] = useState([]);
  const handleClose = () => {
    dispatch(setCustomerId({ isOpen: false }));
  };
  useEffect(() => {
    setRows(data);
  }, [data]);
  useEffect(() => {
    if (
      customer.status &&
      customer.status < 300 &&
      customer.msg &&
      !customer.msg.includes("Get")
    ) {
      console.log("vo");
      handleClose();
    }
  }, [customer.status]);
  const dispatch = useDispatch();
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [itemSelected, setItemSelected] = useState("");
  const [itemSeeDetail, setItemSeeDetail] = useState("");
  const [feedbackItemSelected, setFeedbackItemSelected] = useState("");

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <ToolbarContainer
          selected={selected}
          setRows={setRows}
          rows={rows}
          setSelected={setSelected}
        />
        <TableContainer className="table-container">
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <HeaderContainer
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <BodyContainer
              rows={rows}
              order={order}
              orderBy={orderBy}
              selected={selected}
              setSelected={setSelected}
              page={page}
              setRows={setRows}
              rowsPerPage={rowsPerPage}
              setItemSelected={setItemSelected}
              setItemSeeDetail={setItemSeeDetail}
              setFeedbackItemSelected={setFeedbackItemSelected}
            />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CustomerDetail
          customerId={customerId}
          onClose={handleClose}
        ></CustomerDetail>
      </Modal>
    </div>
  );
}
