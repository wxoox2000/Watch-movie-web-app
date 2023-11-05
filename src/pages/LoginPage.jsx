import { Login } from "../Components/Login";
import { createPortal } from "react-dom";

const LoginPage = () => {
  return <>{createPortal(<Login />, document.querySelector("#popup-root"))}</>;
};

export default LoginPage;
