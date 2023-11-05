import { useEffect, useState } from "react";
import {
  fetchById,
  fetchProviders,
  fetchTrendingMovies,
} from "../Components/fetchAPI";
import "swiper/css";
import { Trending } from "../Components/Homepage previews/Trending";
import { ComingSoon } from "../Components/Homepage previews/ComingSoon";
import { TopRatedF } from "../Components/Homepage previews/TopRatedF";
import { TopRatedS } from "../Components/Homepage previews/TopRatedS";
import { Documentaries } from "../Components/Homepage previews/Documentaries";
import { LikeBtn } from "../Components/LikeBtn";
import iconBg from "../assets/cameraIcon.png";
import { motion } from "framer-motion";
import {
  bannerVariants,
  exit,
  mainVariants,
} from "../Components/FramerMotionVariants/Variants";
import { Icon } from "./Icon";

const Home = () => {
  const [rec, setRec] = useState({});
  const [error, setError] = useState(false);
  const [url, setUrl] = useState("");
  useEffect(() => {
    const random = Math.floor(Math.random() * 10);
    const fetch = async () => {
      const resp = await fetchTrendingMovies();
      return resp.results[random].id;
    };
    fetch()
      .then((value) => {
        const resp = fetchById(value);
        return resp;
      })
      .then((obj) => setRec(obj))
      .catch((error) => setError(true));
  }, []);
  const genres = rec.genres?.map(({ name }) => name).join(" ");
  useEffect(() => {
    if (!rec.id) {
      return;
    }
    const fetch = async () => {
      const resp = await fetchProviders(rec.id);
      setUrl(resp.results?.US?.link);
    };
    fetch();
  }, [rec]);
  const urlBg = `https://image.tmdb.org/t/p/original/${rec?.poster_path}`;
  return (
    <div className="w-full h-full bg-black">
      <Icon />
      <motion.div
        className="relative w-full px-6 py-10 bg-bgIcon bg-center"
        style={{
          backgroundImage: `${
            rec?.poster_path ? `url(${urlBg})` : `url(${iconBg})`
          }`,
          backgroundSize: `${rec?.poster_path && "cover"}`,
        }}
        variants={bannerVariants}
        initial="init"
        animate="visible"
        exit={exit}
      >
        <div className="bg-gradient-to-b from-black to-transparent absolute w-full h-full top-0 left-0 opacity-20 pointer-events-none" />
        <div className="mt-40 pb-3 backdrop-blur-sm w-fit rounded-xl px-2">
          <h1 className="text-5xl font-semibold text-white">
            {Object.keys(rec).length !== 0 ? rec.original_title : ""}
          </h1>
          <p className="text-[14px] font-normal leading-5 text-white mt-5 mb-9">{`${
            Object.keys(rec).length !== 0 ? rec.release_date?.slice(0, 4) : ""
          } | ${genres ? genres : ""}`}</p>
          <div className="flex items-center">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-[17px] text-white rounded-xl bg-blue hover:bg-purple trans mr-4 cursor-pointer"
            >
              Watch now
            </a>
            <LikeBtn M_Id={rec.id} type="movie" variant="m" />
          </div>
        </div>
        {error ? (
          <p className="text-white font-semibold text-2xl leading-normal mb-4 text-center">
            Something went wrong, try reload the page...
          </p>
        ) : null}
      </motion.div>
      <motion.div
        className="pt-[6px] px-8"
        variants={mainVariants}
        initial="init"
        animate="visible"
        exit={exit}
      >
        <h3 className="text-white font-semibold text-xl leading-normal mb-4">
          Trending
        </h3>
        <Trending />
        <h3 className="text-white font-semibold text-xl leading-normal mb-4">
          Coming soon
        </h3>
        <ComingSoon />
        <h3 className="text-white font-semibold text-xl leading-normal mb-4">
          Documentaries
        </h3>
        <Documentaries />
        <h3 className="text-white font-semibold text-xl leading-normal mb-4">
          Top rated Movies
        </h3>
        <TopRatedF />
        <h3 className="text-white font-semibold text-xl leading-normal mb-4">
          Top rated Series
        </h3>
        <TopRatedS />
      </motion.div>
    </div>
  );
};

export default Home;
