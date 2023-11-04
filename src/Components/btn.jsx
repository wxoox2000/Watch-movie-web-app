import { forwardRef, useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useSwiper } from "swiper/react";

export const SlideNextButton = forwardRef((_, ref) => {
  const [progress, setProgress] = useState(0);
  setInterval(() => {
    setProgress(ref.current);
  }, 700);
  const swiper = useSwiper();
  return (
    <button
      disabled={progress >= 1}
      onClick={() => swiper.slideNext()}
      className={`absolute top-[calc(50%-27px)] group p-[15px] bg-btn-grad bg-purple ${
        progress >= 0.9 && "opacity-75"
      } rounded-full z-10 border border-white backdrop-blur-[4px] opacity-100 active:scale-90 -right-3 hover:-translate-x-3 trans`}
    >
      <FiArrowRight className="w-6 h-6 stroke-blue group-hover:scale-110 trans" />
    </button>
  );
});

export const SlidePrevButton = forwardRef((_, ref) => {
    const [progress, setProgress] = useState(0);
    setInterval(() => {
      setProgress(ref.current);
    }, 700);  
  const swiper = useSwiper();
  return (
    <button disabled={progress <=0}
      onClick={() => swiper.slidePrev()}
      className={`absolute top-[calc(50%-27px)] group p-[15px] bg-btn-grad bg-purple ${
        progress <= 0.1 && "opacity-75"
      } rounded-full rotate-180 z-10 border border-white backdrop-blur-[4px] opacity-100 active:scale-90 -left-3 hover:translate-x-3 trans`}
    >
      <FiArrowRight className="w-6 h-6 stroke-blue group-hover:scale-110 trans" />
    </button>
  );
});
