import { FiHeart } from "react-icons/fi";
import { useEffect, useState } from "react";
import { fetchSeriesById } from "./fetchAPI";
import { LikeBtn } from "./LikeBtn";
import { Link } from "react-router-dom";
import { CircleLoader } from "react-spinners";
import { motion } from "framer-motion";
import { HoverAnim } from "./FramerMotionVariants/Variants";

export const SeriesCard = ({ id, openModal }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const resp = await fetchSeriesById(id);
        setData(resp);
      } catch (error) {
        console.log(error);
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
    <motion.div whileHover={HoverAnim}>
      <div className="w-64 h-[301px] shrink-0 hover:shadow-xl hover:shadow-shadowColor trans">
        <div
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
                  {data?.name}
                </p>
                <span className="font-normal text-[14px] leading-4">
                  {`${data?.first_air_date?.slice(
                    0,
                    4
                  )} - ${data?.last_air_date?.slice(0, 4)} | ${genres}`}
                </span>
              </div>
              <LikeBtn M_Id={id} type="tv" variant="s" />
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};
