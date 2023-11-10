import { useSelector } from "react-redux";
import {
  selectIsLoading,
  selectIsLoggedIn,
  selectIsRefreshing,
} from "../Redux/auth/selectors";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ component: Component, redirectTo = "/" }) => {
  const loggedIn = useSelector(selectIsLoggedIn);
  const refresh = useSelector(selectIsRefreshing);
  const loading = useSelector(selectIsLoading);


  let Redirect = !loggedIn && !refresh && !loading;
  return loading ? null : Redirect ? <Navigate to={redirectTo} /> : Component;
};
