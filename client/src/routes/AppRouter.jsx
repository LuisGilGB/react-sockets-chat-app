import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ChatView from "../views/ChatView";
import AuthRouter from "./AuthRouter";
import ConditionalRoute from "./ConditionalRoute";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
  const { logged, verificationPending, verifyToken } = useContext(AuthContext);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  if (verificationPending) {
    return <h1>Loading app...</h1>;
  }

  return (
    <Router>
      <div>
        <Switch>
          <ConditionalRoute
            condition={!logged}
            path="/auth"
            component={AuthRouter}
          />
          <PrivateRoute
            isAuthenticated={logged}
            exact
            path="/"
            component={ChatView}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
