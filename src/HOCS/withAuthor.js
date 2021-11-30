import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router";
import { SideBar, HeaderBar } from "../layouts";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
export const withAuthor = (Component) => (props) => {
  const classes = useStyles();
  const history = useHistory();
  const token = Cookies.get("token");
  useEffect(() => {
    if (!token) {
      history.push("/login");
    }
  }, [token]);
  return (
    <div className="app-admin">
      {token && (
        <>
          <SideBar />
          <HeaderBar></HeaderBar>
          <main className={`${classes.content} app-admin__body`}>
            <div className="app-admin__body__inner">
              <Component {...props} />
            </div>
          </main>
        </>
      )}
    </div>
  );
};
