import logo from "./logo.svg";
import "./App.css";
import { routers } from "./utils";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoginPage, DashboardPage, ProductManagement } from "./pages";
import { withAuth, withAuthor } from "./HOCS";
const {
  LOGIN_ROUTE,
  FORGOTPASSWORD_ROUTE,
  RESETPASSWORD_ROUTE,
  DASHBOARD_ROUTE,
  PRODUCT_MANAGEMENT,
} = routers;

function App() {
  return (
    <Router>
      <Switch>
        <Route path={LOGIN_ROUTE} component={withAuth(LoginPage)}></Route>
        <Route
          path={[PRODUCT_MANAGEMENT, "/product-management"]}
          component={withAuthor(ProductManagement)}
        ></Route>
      </Switch>
    </Router>
  );
}

export default App;
