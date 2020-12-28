import ConditionalRoute from "./ConditionalRoute";

const PrivateRoute = ({ isAuthenticated, ...otherProps }) => (
  <ConditionalRoute
    {...otherProps}
    condition={isAuthenticated}
    toOnFalse="/auth"
  />
);

export default PrivateRoute;
