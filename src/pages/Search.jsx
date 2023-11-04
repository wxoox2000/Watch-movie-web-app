import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { userSearch } from "../Components/fetchAPI";
import { Card } from "../Components/Card";
import { SeriesCard } from "../Components/CardSeries";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import { ListItem } from "../Components/ListItem";
import { createPortal } from "react-dom";
import { BackdropModal } from "../Components/BackdropModal";
import { FilmModal } from "../Components/FilmModal";
import { SeriesModal } from "../Components/SeriesModal";
import { selectModalData } from "../Redux/selectors";
import { motion } from "framer-motion";
import {
  bgVariants,
  exit,
  listVariants,
  mainVariants,
} from "../Components/FramerMotionVariants/Variants";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState({});
  const URLquery = searchParams.get("query");
  const URLpage = searchParams.get("page");
  const pageRef = useRef(1);
  const modalData = useSelector(selectModalData);
  const showLoadMore =
    results.total_pages && results.total_pages > pageRef.current;
  const showPrev = pageRef.current > 1;

  if (URLquery && URLquery !== query) {
    setQuery(URLquery);
  }
  if (URLpage) {
    pageRef.current = Number(URLpage);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (
      form.elements.search.value.trim() === "" ||
      form.elements.search.value === query
    ) {
      console.log("empty");
      return;
    }
    setSearchParams({ query: form.elements.search.value, page: 1 });
    setQuery(form.elements.search.value);
    // navigate(`search?query=${form.elements.search.value}&page=1`)
  };

  const onClick = () => {
    console.log(pageRef.current);
    pageRef.current += 1;
    setSearchParams({ query: URLquery, page: pageRef.current });
    const fetch = async () => {
      const res = await userSearch(query, pageRef.current);
      console.log(res);
      setResults({ ...results, results: [...results.results, ...res.results] });
    };
    fetch();
  };
  const onClickPrev = () => {
    pageRef.current -= 1;
    setSearchParams({query: URLquery, page: pageRef.current });
    const fetch = async () => {
      const res = await fetchTrendingMovies(pageRef.current);
      console.log(res);
      setResults({ ...results, results: [...results.results, ...res.results] });
    };
    fetch();
  };

  useEffect(() => {
    if (query === "") {
      return;
    }
    const fetch = async () => {
      const res = await userSearch(query, pageRef.current);
      console.log(res);
      setResults(res);
    };
    fetch();
    window.scrollBy({
      top: -400,
      left: 0,
      behavior: "smooth",
    });
  }, [query]);

  return (
    <div className={` w-full h-[100vh] bg-black}`}>
      <motion.div className={`w-full min-h-full bg-black pb-10`}>
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
        <motion.form
          className="w-fit pt-[136px] mb-10 mx-auto flex items-stretch animate-searchAppear"
          onSubmit={onSubmit}
          exit={exit}
        >
          <input
            type="text"
            name="search"
            className="bg-white rounded-xl w-64 py-[15px] pl-4 pr-8 outline-none font-medium text-xl"
          />
          <button className="px-6 py-[17px] text-white rounded-xl bg-blue hover:bg-purple trans ml-4 cursor-pointer">
            Search
          </button>
        </motion.form>
        {results.total_results === 0 && (
          <p className="text-white font-semibold text-2xl leading-normal mb-4 text-center">
            No results matching your search...
          </p>
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
            className="flex gap-x-6 gap-10 flex-wrap mb-10 px-8 pb-3"
            variants={listVariants}
            initial="init"
            animate="visible"
            exit={exit}
          >
            {results?.results.map((elem) => {
              if (elem.media_type === "movie") {
                return (
                  <ListItem key={nanoid()} id={elem.id} type={"movie"}>
                    <Card id={elem.id} />
                  </ListItem>
                );
              } else if (elem.media_type === "tv") {
                return (
                  <ListItem key={nanoid()} id={elem.id} type={"tv"}>
                    <SeriesCard id={elem.id} />
                  </ListItem>
                );
              } else {
                return null;
              }
            })}
          </motion.ul>
        ) : null}
        {showLoadMore && (
          <button
            onClick={onClick}
            className="px-6 py-[17px] mx-auto block text-white rounded-xl bg-blue hover:bg-purple trans cursor-pointer"
          >
            Load more
          </button>
        )}
      </motion.div>
    </div>
  );
};
