import { useEffect, useState } from "react";
import { fetchById, fetchProviders } from "./fetchAPI";
import { FiStar, FiX } from "react-icons/fi";
import { LikeBtn } from "./LikeBtn";
import { useDispatch } from "react-redux";
import { closingModal, modalDataToInit } from "../Redux/modalSlice";

export const FilmModal = ({ id, closeModal }) => {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [watchUrl, setWatchUrl] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchFilm = async (id) => {
      try {
        const resp = await fetchById(id);
        setData(resp);
      } catch (error) {
        setError(true);
      }
    };
    fetchFilm(id);
  }, []);
  useEffect(() => {
    const fetch = async () => {
      const resp = await fetchProviders(id);
      setWatchUrl(resp.results?.US?.link);
    };
    fetch();
  }, []);
  const runTime = (duration) => {
    const hours = Math.floor(duration / 60);
    const mins = duration - hours * 60;
    return `${hours}h ${mins}m`;
  };
  const closeFav = () => {
    dispatch(closingModal());
    setTimeout(() => {
      dispatch(modalDataToInit());
    }, 700);
  };

  const url = `https://image.tmdb.org/t/p/w1280/${data?.backdrop_path}`;
  return (
    <div className="w-[1095px]  bg-black rounded-2xl mt-3 flex items-center z-10 relative">
      <div className="w-full bg-black absolute top-0 left-0 h-[431px] z-10 animate-modalAppear"></div>
      <FiX
        className="absolute top-0 right-2 w-8 h-8 stroke-white cursor-pointer hover:stroke-gray hover:scale-110 trans"
        onClick={closeModal ? closeModal : closeFav}
      />
      <div
        className="w-[534px] h-[431px] border border-gray rounded-2xl overflow-hidden bg-cover bg-center mr-6 shrink-0"
        style={{ backgroundImage: `url(${url})` }}
      ></div>
      <div className="w-full pr-3">
        {error ? (
          <p className="text-white font-semibold text-2xl leading-normal mb-4 text-center mt-24">
            Something went wrong, try reload the page...
          </p>
        ) : null}
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-[32px] leading-10 font-semibold text-white">
            {data?.title}
          </h2>
          <div className="flex">
            <FiStar className="fill-[#FFC01E] mr-2 w-6 h-6" />
            <span className="text-lg leading-6 text-white font-medium">{`${data?.vote_average?.toFixed(
              1
            )}/10`}</span>
          </div>
        </div>
        <div className="flex mb-5">
          <span className="text-lg leading-6 text-white font-medium">
            {data?.release_date?.slice(0, 4)}
          </span>
          <span className="text-lg leading-6 text-white font-medium mx-9">
            {data?.genres[0]?.name}
          </span>
          <span className="text-lg leading-6 text-white font-medium">{`${runTime(
            data?.runtime
          )}`}</span>
        </div>
        <p className="text-base text-white font-normal mb-[26px] h-32 overflow-y-scroll no-scroll">
          {data?.overview}
        </p>
        <div className="flex items-center">
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-[17px] text-white rounded-xl bg-blue hover:bg-purple trans mr-4"
          >
            Watch now
          </a>
          <LikeBtn M_Id={id} type="movie" variant="m" />
        </div>
      </div>
    </div>
  );
};
