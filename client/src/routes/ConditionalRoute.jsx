import { Redirect, Route } from "react-router-dom";

const ConditionalRoute = ({
  condition,
  toOnFalse = "/",
  component: Component,
  ...otherProps
}) => (
  <Route
    {...otherProps}
    component={({ props }) =>
      condition ? <Component {...props} /> : <Redirect to={toOnFalse} />
    }
  />
);

export default ConditionalRoute;
