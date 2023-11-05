import { FiHeart } from "react-icons/fi";
import { markFavourite } from "./fetchAPI";
import { useDispatch, useSelector } from "react-redux";
import { selectFavMovies, selectFavSeries } from "../Redux/account/selectors";
import { useEffect, useState } from "react";
import {
  addFavM,
  addFavS,
  notLogged,
  notLoggedInit,
  removeFavM,
  removeFavS,
} from "../Redux/account/accSlice";
import {
  selectID,
  selectIsLoggedIn,
  selectSessionID,
} from "../Redux/auth/selectors";
import { fetchFavM, fetchFavS } from "../Redux/account/operations";

export const LikeBtn = ({ M_Id, type, variant }) => {
  const [marked, setMarked] = useState(false);
  const [size, setSize] = useState(variant);

  const favM = useSelector(selectFavMovies);
  const favS = useSelector(selectFavSeries);
  const s_Id = useSelector(selectSessionID);
  const accId = useSelector(selectID);
  const loggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "movie") {
      setMarked(favM.some((id) => id === M_Id));
      return;
    }
    setMarked(favS.some((id) => id === M_Id));
  }, [favM, favS]);
  const onClick = () => {
    if (!loggedIn || !s_Id) {
      console.log("not logged");
      dispatch(notLogged());
      setTimeout(() => {
        dispatch(notLoggedInit());
      }, 3500);
      return;
    }
    if (!marked) {
      markFavourite({ M_Id, mark: true, type, s_Id, accId });
      type === "movie" ? dispatch(addFavM(M_Id)) : dispatch(addFavS(M_Id));
      setMarked(true);
      return;
    }
    markFavourite({ M_Id, mark: false, type, s_Id, accId });
    type === "movie" ? dispatch(removeFavM(M_Id)) : dispatch(removeFavS(M_Id));
    setMarked(false);
  };
  return (
    <>
      <button
        id="likebtn"
        onClick={onClick}
        className={`group ${
          size === "s"
            ? "p-[9px] absolute top-5 right-5 rounded-[8px]"
            : "p-[15px] rounded-xl"
        } bg-btn-grad border border-white backdrop-blur-[6px]`}
      >
        <FiHeart
          id="likebtn"
          className={`${
            size === "s" ? "w-[14px] h-[14px]" : "w-6 h-6"
          } stroke-blue ${marked && "fill-blue"} group-hover:scale-110 trans`}
        />
      </button>
    </>
  );
};
