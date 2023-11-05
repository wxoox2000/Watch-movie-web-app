import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { SlidePrevButton, SlideNextButton } from "../btn";
import { BsCameraReels } from "react-icons/bs";
import { fetchUpcomingMovies } from "../fetchAPI";
import { Card } from "../Card";
import { FilmModal } from "../FilmModal";
import { Link } from "react-router-dom";

export const ComingSoon = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(false);
  const [id, setId] = useState(null);
  const modalRef = useRef();

  const modalOpen = (id) => {
    setOpenModal(true);
    setId(id);
    const scrollToModal =
      window.innerHeight -
      (modalRef.current.getBoundingClientRect().bottom + 450);
    if (scrollToModal < 0) {
      window.scrollBy({
        top: Math.abs(scrollToModal) + 100,
        left: 0,
        behavior: "smooth",
      });
    }
  };
  const modalClose = () => {
    setId(null);
    if (modalRef.current.getBoundingClientRect().top < 0) {
      window.scrollBy({
        top: -300,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const resp = await fetchUpcomingMovies();
        setUpcoming(resp);
      } catch (error) {
        setError(true);
      }
    };
    fetchUpcoming();
  }, []);
  const UpcomingNavRef = useRef(0);
  let count = 0;
  return (
    <div ref={modalRef} className="w-[1092px] mb-8">
      <Swiper
        className="pr-[10px]"
        onProgress={(p) => (UpcomingNavRef.current = p.progress)}
        spaceBetween={24}
        slidesPerView={4}
      >
        {upcoming?.results?.map((film) => {
          if (count >= 7) {
            return;
          }
          count += 1;
          return (
            <SwiperSlide key={film.id}>
              <Card id={film.id} openModal={modalOpen} />
            </SwiperSlide>
          );
        })}
        <SwiperSlide>
          <Link
            to="coming_soon"
            className="w-64 h-[301px] block shrink-0 hover:shadow-xlInn px-5 py-8 rounded-2xl border border-gray hover:shadow-shadowColor trans"
          >
            <BsCameraReels className="mx-auto drop-shadow-2xl fill-purple w-20 h-20 mb-20" />
            <p className="text-white font-semibold text-3xl leading-normal mb-4 text-center">
              See more...
            </p>
          </Link>
        </SwiperSlide>
        {error ? (
          <SwiperSlide>
            <p className="text-white font-semibold text-2xl leading-normal mb-4 text-center mt-24">
              Something went wrong, try reload the page...
            </p>
          </SwiperSlide>
        ) : null}
        <SlideNextButton ref={UpcomingNavRef} />
        <SlidePrevButton ref={UpcomingNavRef} />
      </Swiper>
      {id && <FilmModal id={id} closeModal={modalClose} />}
    </div>
  );
};
