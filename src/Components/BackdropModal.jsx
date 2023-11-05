import { useDispatch, useSelector } from "react-redux";
import { selectModalData } from "../Redux/selectors";
import { closingModal, modalDataToInit } from "../Redux/modalSlice";
import { useEffect } from "react";

export const BackdropModal = ({children}) => {
    const modalData = useSelector(selectModalData);
    const dispatch = useDispatch();
    const closeFav = () => {
      dispatch(closingModal())
      setTimeout(() => {
        dispatch(modalDataToInit());
      }, 700);
    };
    const escClose = (e) => {
      if (e.code === "Escape") {
        closeFav();
      }
    };
  useEffect(() => {
    window.addEventListener("keydown", escClose)
    return () => {
      window.removeEventListener("keydown", escClose);
    }
  }, []);

  return (
    <div
      className={`w-full h-full fixed top-0 left-0 z-10 backdrop-blur-sm bg-modalRadial ${
        modalData.closing ? "animate-inputPopOut" : "animate-inputPopUp"
      }`}
      onClick={closeFav}
    >
      <div className="absolute top-[calc(50%-221px)] left-[calc(50%-548px)]">
        {children}
      </div>
    </div>
  );
};
