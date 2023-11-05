import { useSelector } from "react-redux"
import { selectID, selectIsLoggedIn } from "../Redux/auth/selectors"
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiCoffee } from "react-icons/fi";

export const RestrictedRoute = ({component: Component, redirectTo = '/'}) => {
    const loggedIn = useSelector(selectIsLoggedIn);
    const id = useSelector(selectID);
    const successLogin = loggedIn && id !== '';
    // toast.warn("You must be logged in to add to favourites", {
    //     position: "top-center",
    //     autoClose: 2000,
    //     hideProgressBar: false,
    //     icon: <FiCoffee />,
    //     closeOnClick: true,
    //     pauseOnHover: false,
    //     draggable: true,
    //     theme: "dark",
    //   });
  
    return successLogin ? <Navigate to={redirectTo}/> : (Component );
}