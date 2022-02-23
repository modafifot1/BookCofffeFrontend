import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router";

export const withAuth = (Component) => (props) => {
  const history = useHistory();
  const token = Cookies.get("token");
  useEffect(() => {
    if (token) {
      history.push("/statistic-management");
    }
  }, [token]);
  return (
    <div className="app">
      {!Cookies.get("token") && (
        <>
          <div className="app__body">
            <Component {...props} />
          </div>
        </>
      )}
    </div>
  );
};
