import { useEffect, useRef, useState } from "react";
import { fetchById } from "./fetchAPI";
import { useLocation } from "react-router-dom";
import { LikeBtn } from "./LikeBtn";
import { CircleLoader } from "react-spinners";
import { motion } from "framer-motion";
import { HoverAnim } from "./FramerMotionVariants/Variants";

export const Card = ({ id, openModal }) => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const ref = useRef();
  useEffect(() => {
    const fetch = async () => {
      try {
        const resp = await fetchById(id);
        setData(resp);
      } catch (error) {
        return error
      }
    };
    fetch();
  }, []);
  const onClick = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    if (openModal) {
      openModal(id);
      return;
    }
  };
  const url = `https://image.tmdb.org/t/p/original/${data?.backdrop_path}`;
  const genres = data.genres
    ?.slice(0, 2)
    .map(({ name }) => name)
    .join(" ");

  return (
    <motion.div ref={ref} whileHover={HoverAnim}>
      <div className="w-64 h-[301px] shrink-0 hover:shadow-xl hover:shadow-shadowColor trans">
        <div
          state={{ prevLocation: location }}
          className={`w-full h-full border border-gray rounded-2xl block bg-cover bg-center bg-no-repeat relative cursor-pointer`}
          style={{ backgroundImage: `url(${url})` }}
          onClick={onClick}
        >
          {data.length === 0 ? (
            <CircleLoader
              className="absolute top-[calc(50%-70px)] left-[calc(50%-70px)]"
              color="#6100C2"
              size={140}
              speedMultiplier={0.5}
            />
          ) : (
            <>
              <div className="absolute bottom-0 bg-cardInfoGrad rounded-b-2xl py-4 px-5 w-full opacity-95 backdrop-blur-[10px]">
                <p className="text-base leading-6 font-semibold mb-[6px]">
                  {data?.title}
                </p>
                <span className="font-normal text-[14px] leading-4">
                  {`${data?.release_date?.slice(0, 4)} | ${genres}`}
                </span>
              </div>
              <LikeBtn M_Id={id} type="movie" variant="s" />
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};
