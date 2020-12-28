import { Redirect, Route } from "react-router-dom";

const ConditionalRoute = ({
  condition,
  component: Component,
  ...otherProps
}) => (
  <Route
    {...otherProps}
    component={({ props }) =>
      condition ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

export default ConditionalRoute;
