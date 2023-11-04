import { useSelector } from "react-redux";
import { selectModalData } from "../Redux/selectors";

export const BackdropModal = ({children}) => {
    const modalData = useSelector(selectModalData);

  return (
    <div
      className={`w-full h-full fixed top-0 left-0 z-10 backdrop-blur-sm bg-modalRadial ${
        modalData.closing ? "animate-inputPopOut" : "animate-inputPopUp"
      }`}
    >
      <div className="absolute top-[calc(50%-221px)] left-[calc(50%-548px)]">
        {children}
      </div>
    </div>
  );
};
