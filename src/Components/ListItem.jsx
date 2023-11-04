import { useDispatch, useSelector } from "react-redux";
import { selectModalData } from "../Redux/selectors";
import { openMovieModal, openSeriesModal } from "../Redux/modalSlice";

export const ListItem = ({ id, type, children }) => {
    const modalData = useSelector(selectModalData);
    const dispatch = useDispatch();
    const openFav = (e) => {
        if (e.target.id === "likebtn" || e.target.tagName === "path") {
          return;
        }
        if (e.currentTarget.dataset.type === "movie") {
          dispatch(openMovieModal(e.currentTarget.id))
        } else {
            dispatch(openSeriesModal(e.currentTarget.id))
        }
      };
  return (
    <li id={id} data-type={type} onClick={openFav}>
      {children}
    </li>
  );
};
