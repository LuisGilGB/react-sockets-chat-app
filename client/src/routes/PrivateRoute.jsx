import ConditionalRoute from "./ConditionalRoute";

const PrivateRoute = ({ isAuthenticated, ...otherProps }) => (
  <ConditionalRoute {...otherProps} condition={isAuthenticated} />
);

export default PrivateRoute;
