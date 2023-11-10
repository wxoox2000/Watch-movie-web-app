import { useSelector } from "react-redux"
import { selectID, selectIsLoggedIn } from "../Redux/auth/selectors"
import { Navigate } from "react-router-dom";

export const RestrictedRoute = ({component: Component, redirectTo = '/'}) => {
    const loggedIn = useSelector(selectIsLoggedIn);
    const id = useSelector(selectID);
    const successLogin = loggedIn && id !== '';
    return successLogin ? <Navigate to={redirectTo}/> : (Component );
}