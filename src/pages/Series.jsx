import { useEffect, useRef, useState } from "react";
import { fetchTopSeries } from "../Components/fetchAPI";
import { useSelector } from "react-redux";
import { selectModalData } from "../Redux/selectors";
import { BackdropModal } from "../Components/BackdropModal";
import { SeriesModal } from "../Components/SeriesModal";
import { createPortal } from "react-dom";
import { ListItem } from "../Components/ListItem";
import { useSearchParams } from "react-router-dom";
import { SeriesCard } from "../Components/CardSeries";
import { motion } from "framer-motion";
import {
  exit,
  listVariants,
} from "../Components/FramerMotionVariants/Variants";

const Series = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(false);
  const modalData = useSelector(selectModalData);
  const pageRef = useRef(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const URLpage = searchParams.get("page");
  if (URLpage) {
    pageRef.current = Number(URLpage);
  }

  const showLoadMore =
    results.total_pages && results.total_pages > pageRef.current;
  const showPrev = pageRef.current > 1;

  const onClick = () => {
    pageRef.current += 1;
    setSearchParams({ page: pageRef.current });
    const fetch = async () => {
      console.log(pageRef.current);
      const res = await fetchTopSeries(pageRef.current);
      console.log(res);
      setResults({ ...results, results: [...results.results, ...res.results] });
    };
    fetch();
  };
  const onClickPrev = () => {
    pageRef.current -= 1;
    setSearchParams({ page: pageRef.current });
    const fetch = async () => {
      const res = await fetchTrendingMovies(pageRef.current);
      console.log(res);
      setResults({ ...results, results: [...results.results, ...res.results] });
    };
    fetch();
  };

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const resp = await fetchTopSeries(pageRef.current);
        console.log(resp);
        setResults(resp);
      } catch (error) {
        setError(true);
      }
    };
    fetchSeries();
    window.scrollBy({
      top: -400,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="w-full h-[100vh] bg-black">
      <div className="w-full h-fit bg-black pt-[136px] pb-10">
        {modalData.openSeries &&
          createPortal(
            <BackdropModal>
              <SeriesModal id={modalData.id} />
            </BackdropModal>,
            document.querySelector("#popup-root")
          )}
        {showPrev && (
          <button
            onClick={onClickPrev}
            className="px-6 py-[17px] mb-10 mx-auto block text-white rounded-xl bg-blue hover:bg-purple trans cursor-pointer animate-inputPopUp"
          >
            Prev page
          </button>
        )}
        {results.results ? (
          <motion.ul
            className="flex gap-x-6 gap-10 flex-wrap mb-10 px-8 pb-5"
            variants={listVariants}
            initial="init"
            animate="visible"
            exit={exit}
          >
            {results?.results.map((elem) => {
              return (
                <ListItem key={elem.id} id={elem.id} type={"tv"}>
                  <SeriesCard id={elem.id} />
                </ListItem>
              );
            })}
          </motion.ul>
        ) : null}
        {error ? (
          <p className="text-white font-semibold text-2xl leading-normal mb-4 text-center">
            Something went wrong, try reload the page...
          </p>
        ) : null}
        {showLoadMore && (
          <button
            onClick={onClick}
            className="px-6 py-[17px] mx-auto block text-white rounded-xl bg-blue hover:bg-purple trans cursor-pointer"
          >
            Load more
          </button>
        )}
      </div>
    </div>
  );
};
export default Series;
