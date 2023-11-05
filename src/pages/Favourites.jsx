import { useEffect, useState } from "react";
import { Card } from "../Components/Card";
import { FilmModal } from "../Components/FilmModal";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectFavMovies, selectFavSeries } from "../Redux/account/selectors";
import { BsCameraReels } from "react-icons/bs";
import { openModal } from "../Redux/modalSlice";
import { SeriesCard } from "../Components/CardSeries";
import { selectID } from "../Redux/auth/selectors";
import { fetchFavM, fetchFavS } from "../Redux/account/operations";
import { SeriesModal } from "../Components/SeriesModal";
import { ListItem } from "../Components/ListItem";
import { selectModalData } from "../Redux/selectors";
import { BackdropModal } from "../Components/BackdropModal";
import { AnimatePresence, motion } from "framer-motion";
import {
  exit,
  listVariants,
} from "../Components/FramerMotionVariants/Variants";

const Favourites = () => {
  const favMovies = useSelector(selectFavMovies);
  const favSeries = useSelector(selectFavSeries);
  const accId = useSelector(selectID);
  const dispatch = useDispatch();
  const modalData = useSelector(selectModalData);

  useEffect(() => {
    dispatch(fetchFavM(accId));
    dispatch(fetchFavS(accId));
  }, []);
  const isEmptyList = favMovies.length === 0 && favSeries.length === 0;
  return (
    <div className={`w-full h-[100vh] bg-black`}>
      <div className={`w-full h-fit bg-black pt-[136px] px-8 pb-5`}>
        {modalData.openMovie &&
          createPortal(
            <BackdropModal>
              <FilmModal id={modalData.id} />
            </BackdropModal>,
            document.querySelector("#popup-root")
          )}
        {modalData.openSeries &&
          createPortal(
            <BackdropModal>
              <SeriesModal id={modalData.id} />
            </BackdropModal>,
            document.querySelector("#popup-root")
          )}
        {isEmptyList ? (
          <>
            <BsCameraReels className="mx-auto drop-shadow-2xl fill-purple w-20 h-20 mb-20" />
            <p className="text-center text-white leading-[18px] font-medium text-base">
              You didn't add any movies or series to favourites yet
            </p>
          </>
        ) : (
          <>
            {favMovies.length === 0 ? (
              <p className="text-center text-white leading-[18px] font-medium text-base">
                No favourite movies
              </p>
            ) : (
              <motion.div
                variants={listVariants}
                initial="init"
                animate="visible"
                exit={exit}
              >
                <h3 className="text-white font-semibold text-xl leading-normal mb-4">
                  Movies
                </h3>
                <ul className="flex gap-x-6 gap-10 flex-wrap mb-10">
                  {favMovies.map((id) => {
                    return (
                      <ListItem key={id} id={id} type="movie">
                        <Card id={id} />
                      </ListItem>
                    );
                  })}
                </ul>
              </motion.div>
            )}
            {favSeries.length === 0 ? (
              <p className="text-center text-white leading-[18px] font-medium text-base">
                No favourite series
              </p>
            ) : (
              <motion.div
                variants={listVariants}
                initial="init"
                animate="visible"
                exit={exit}
              >
                <h3 className="text-white font-semibold text-xl leading-normal mb-4">
                  Series
                </h3>
                <ul className="flex gap-x-6 gap-10 flex-wrap">
                  {favSeries.map((id) => {
                    return (
                      <ListItem key={id} id={id} type="tv">
                        <SeriesCard id={id} />
                      </ListItem>
                    );
                  })}
                </ul>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Favourites;
