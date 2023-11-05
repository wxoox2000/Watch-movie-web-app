import {
  FiFilm,
  FiHeart,
  FiTrendingUp,
  FiCalendar,
  FiSearch,
  FiBell,
  FiLogOut,
  FiCoffee,
} from "react-icons/fi";
import Coffee from "../assets/coffee.svg";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  selectAvatar,
  selectID,
  selectIsLoggedIn,
  selectIsRefreshing,
  selectSessionID,
  selectUserName,
} from "../Redux/auth/selectors";
import { logOut } from "../Redux/auth/operations";
import { revertToInit } from "../Redux/account/accSlice";
import { motion } from "framer-motion";
import { bgVariants, sideVariants } from "./FramerMotionVariants/Variants";
import { selectNotLogged } from "../Redux/account/selectors";
import { ToastContainer, toast } from "react-toastify";
import { Suspense, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "./Loader";

export const SharedLayout = () => {
  const loggedIn = useSelector(selectIsLoggedIn);
  const refresh = useSelector(selectIsRefreshing);
  const userName = useSelector(selectUserName);
  const avatar = useSelector(selectAvatar);
  const sessionId = useSelector(selectSessionID);
  const addFavUnlogged = useSelector(selectNotLogged);
  const dispatch = useDispatch();
  const location = useLocation();

  const logged = loggedIn && sessionId;
  console.log(location);

  const loggingOut = () => {
    dispatch(logOut(sessionId));
    dispatch(revertToInit());
  };

  useEffect(() => {
    if (addFavUnlogged) {
      toast.warn("You must be logged in to add to favourites", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        icon: <FiCoffee />,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      });
    }
  }, [addFavUnlogged]);

  return (
    <>
      <div className="w-full flex relative">
        {addFavUnlogged && <ToastContainer limit={1} />}
        <div className="w-[274px] shrink-0">
          <motion.aside
            className="w-[274px] bg-black shadow-xl shadow-shadowColor h-screen p-10 fixed"
            variants={location.pathname === "/" ? sideVariants : null}
            initial={location.pathname === "/" ? "init" : ""}
            animate={location.pathname === "/" ? "visible" : ""}
          >
            <Link to="/">
              <div className="flex items-center gap-2 mb-[62px]">
                <img className="w-8 h-8" src={Coffee} alt="" />
                <h2 className="uppercase text-white leading-6 tracking-[1.32px] font-bold text-[22px]">
                  watch
                </h2>
              </div>
            </Link>
            <ul className="flex flex-col gap-9 mb-64">
              <li>
                <NavLink to="/" className="group">
                  <div className="flex items-center gap-3 hover:scale-110 trans">
                    <FiFilm className="w-6 h-6 stroke-white opacity-80 trans group-hover:opacity-100 " />
                    <h2
                      className={`text-white leading-6 text-4 font-normal opacity-80 group-hover:opacity-100 trans`}
                    >
                      Home
                    </h2>
                  </div>
                </NavLink>
              </li>
              {loggedIn && (
                <li>
                  <NavLink to="/favourites" className="group">
                    <div className="flex items-center gap-3 hover:scale-110 trans">
                      <FiHeart className="w-6 h-6 stroke-white opacity-80 trans group-hover:opacity-100 " />
                      <h2 className="text-white leading-6 font-normal text-4 opacity-80 group-hover:opacity-100 trans">
                        Favourites
                      </h2>
                    </div>
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink to="/trending" className="group">
                  <div className="flex items-center gap-3 hover:scale-110 trans">
                    <FiTrendingUp className="w-6 h-6 stroke-white opacity-80 trans group-hover:opacity-100 " />
                    <h2 className="text-white leading-6 font-normal text-4 opacity-80 group-hover:opacity-100 trans">
                      Trending
                    </h2>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/coming_soon" className="group">
                  <div className="flex items-center gap-3 hover:scale-110 trans">
                    <FiCalendar className="w-6 h-6 stroke-white opacity-80 trans group-hover:opacity-100 " />
                    <h2 className="text-white leading-6 font-normal text-4 opacity-80 group-hover:opacity-100 trans">
                      Coming soon
                    </h2>
                  </div>
                </NavLink>
              </li>
            </ul>
            {loggedIn ? (
              <Link to="/" className="group" onClick={loggingOut}>
                <div className="flex items-center gap-3 hover:scale-110 trans">
                  <FiLogOut className="w-6 h-6 stroke-white opacity-80 trans group-hover:opacity-100 " />
                  <h2 className="text-white leading-6 font-normal text-4 opacity-80 group-hover:opacity-100 trans">
                    Log out
                  </h2>
                </div>
              </Link>
            ) : null}
          </motion.aside>
        </div>
        <motion.div
          className="w-full h-full"
          variants={location.pathname === "/" ? bgVariants : null}
          initial={location.pathname === "/" ? "init" : ""}
          animate={location.pathname === "/" ? "visible" : ""}
        >
          <div className="flex justify-between w-[1092px] items-center absolute z-10 top-11 right-[42px]">
            <nav>
              <ul className="flex gap-8">
                <li className="hover:scale-110 trans">
                  <NavLink to="top_rated_movies" className="main-nav">
                    <p className="text-white leading-[18px] font-medium text-base opacity-80 ">
                      Movies
                    </p>
                  </NavLink>
                </li>
                <li className="hover:scale-110 trans">
                  <NavLink to="top_rated_series" className="main-nav">
                    <p className="text-white leading-[18px] font-medium text-base opacity-80 ">
                      Series
                    </p>
                  </NavLink>
                </li>
                <li className="hover:scale-110 trans">
                  <NavLink to="documentaries" className="main-nav">
                    <p className="text-white leading-[18px] font-medium text-base opacity-80 ">
                      Documentaries
                    </p>
                  </NavLink>
                </li>
              </ul>
            </nav>
            <div className="flex gap-6 items-center">
              <div className="relative w-52 h-8">
                <Link
                  to="search"
                  className={`group absolute top-1 right-1 z-10 hover:scale-110 trans ${
                    location.pathname === "/search" && "animate-searchIcon"
                  }`}
                >
                  <FiSearch
                    className={`w-6 h-6 stroke-white group-hover:stroke-blue trans`}
                  />
                </Link>
              </div>
              <button>
                <FiBell className="w-6 h-6 stroke-white" />
              </button>
              {refresh ? null : logged ? (
                <div className="flex gap-2 items-center">
                  <div className="w-8 h-8 rounded-full bg-gray flex items-center justify-center overflow-hidden">
                    {avatar ? (
                      <img src={avatar} className="w-8 h-8" />
                    ) : (
                      <p className="text-white text-2xl">
                        {userName?.slice(0, 1)}
                      </p>
                    )}
                  </div>
                  <p className="text-white font-medium text-lg leading-[18px]">
                    {userName}
                  </p>
                </div>
              ) : (
                <Link
                  to="login"
                  className="px-6 h-8 flex items-center justify-center rounded-xl hover:bg-blue trans"
                >
                  <p className="text-white leading-[18px] font-medium text-base ">
                    Log in
                  </p>
                </Link>
              )}
            </div>
          </div>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </motion.div>
      </div>
    </>
  );
};
