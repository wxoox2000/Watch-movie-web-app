import { useEffect, useState } from "react";
import { FiHeart, FiX } from "react-icons/fi";
import { fetchById, fetchSeriesById } from "./fetchAPI";
import { BackdropModal } from "./BackdropModal";
import { FilmModal } from "./FilmModal";
import { SeriesModal } from "./SeriesModal";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { closingModal, modalDataToInit } from "../Redux/modalSlice";
import { motion } from "framer-motion";
import { NotifModalVariants } from "./FramerMotionVariants/Variants";

const NotificationModal = ({ modalData, closeModal }) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      try {
        if (modalData.content.type === "movie") {
          const resp = await fetchById(modalData.content.id);
          setData(resp);
          return;
        }
        const resp = await fetchSeriesById(modalData.content.id);
        setData(resp);
      } catch (error) {
        setError(true);
      }
    };
    fetch();
  }, []);
  const close = () => {
    dispatch(closingModal());
    setTimeout(() => {
      dispatch(modalDataToInit());
      setOpenModal(false);
    }, 700);
  };

  const url = `https://image.tmdb.org/t/p/w154/${data?.poster_path}`;
  return (
    <motion.div
      className={`absolute flex items-center justify-center top-0 -left-[340px] w-80 h-80 border border-gray bg-black px-4 py-6 rounded-2xl shadow-xl shadow-shadowColor `}
      variants={NotifModalVariants}
      initial="init"
      animate="visible"
    >
      <FiX
        className="absolute top-2 right-2 w-8 h-8 stroke-red ml-3 cursor-pointer hover:scale-110 trans"
        onClick={closeModal}
      />
      <div className="w-full h-full px-4 flex flex-col items-center">
        {error ? (
          <p className="text-white w-fit text-xl text-center mx-auto mt-24">
          Something went wrong, try reload the page
        </p>
        ) : (
          <>
            <div
              className=" relative w-3/5 h-2/3 border rounded-2xl mb-5 cursor-pointer hover:drop-shadow-xl hover:scale-105 bg-cover bg-center bg-no-repeat trans"
              style={{ backgroundImage: `url(${url})` }}
              onClick={() => setOpenModal(true)}
            >
              {modalData.type === "add" ? (
                <FiHeart className="absolute -bottom-2 -right-6 w-10 h-10 mr-3 stroke-blue fill-blue" />
              ) : (
                <FiHeart className="absolute -bottom-2 -right-6 w-10 h-10 mr-3 stroke-blue" />
              )}
            </div>
            <p className="text-white text-lg text-center">
              {modalData.content.type === "movie" ? data?.title : data?.name}
            </p>
          </>
        )}
      </div>
      {openModal &&
        createPortal(
          <BackdropModal close={() => setOpenModal(false)}>
            {modalData.content.type === "movie" ? (
              <FilmModal id={modalData.content.id} closeModal={close} />
            ) : (
              <SeriesModal id={modalData.content.id} closeModal={close} />
            )}
          </BackdropModal>,
          document.querySelector("#popup-root")
        )}
    </motion.div>
  );
};

export default NotificationModal;
