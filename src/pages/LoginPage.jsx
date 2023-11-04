import { Login } from "../Components/Login";
import { createPortal } from "react-dom";

export const LoginPage = () => {
  return <>{createPortal(<Login />, document.querySelector("#popup-root"))}</>;
};
