import logo from "./logo.svg";
import "./App.css";
import { routers } from "./utils";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  LoginPage,
  DashboardPage,
  ProductManagement,
  EmployeeManagement,
  CustomerManagement,
  OrderManagement,
} from "./pages";
import { withAuth, withAuthor } from "./HOCS";
const {
  LOGIN_ROUTE,
  FORGOTPASSWORD_ROUTE,
  RESETPASSWORD_ROUTE,
  DASHBOARD_ROUTE,
  PRODUCT_MANAGEMENT,
  EMPLOYEE_MANAMENT,
  USER_MANAGEMENT,
  ORDER_MANAGEMENT,
} = routers;

function App() {
  return (
    <Router>
      <Switch>
        <Route path={LOGIN_ROUTE} component={withAuth(LoginPage)}></Route>
        <Route
          path={EMPLOYEE_MANAMENT}
          component={withAuthor(EmployeeManagement)}
        ></Route>
        <Route
          path={[PRODUCT_MANAGEMENT, "/product-management"]}
          component={withAuthor(ProductManagement)}
        ></Route>
        <Route
          path={USER_MANAGEMENT}
          component={withAuthor(CustomerManagement)}
        ></Route>
        <Route
          path={ORDER_MANAGEMENT}
          component={withAuthor(OrderManagement)}
        ></Route>
      </Switch>
    </Router>
  );
}

export default App;
