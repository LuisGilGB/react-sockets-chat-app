import { Redirect, Route, Switch } from "react-router-dom";
import LoginView from "../views/LoginView";
import RegisterView from "../views/RegisterView";
import "../css/login-register.css";

const AuthRouter = () => {
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-t-50 p-b-90">
          <Switch>
            <Route exact path="/auth/login" component={LoginView} />
            <Route exact path="/auth/register" component={RegisterView} />
            <Redirect to="/auth/login" />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default AuthRouter;
