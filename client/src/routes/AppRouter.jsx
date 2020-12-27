import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import ChatView from "../views/ChatView";
import AuthRouter from "./AuthRouter";

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/auth" component={AuthRouter} />
          <Route exact path="/" component={ChatView} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
