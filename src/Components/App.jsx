import { Route, Routes, useLocation } from "react-router-dom";
import { SharedLayout } from "./SharedLayout";
import { RestrictedRoute } from "./RestrictedRoute";
import { useDispatch, useSelector } from "react-redux";
import {
  selectID,
  selectIsLoggedIn,
  selectIsRefreshing,
} from "../Redux/auth/selectors";
import { refreshUser } from "../Redux/auth/operations";
import { lazy, useEffect } from "react";
import { fetchFavM, fetchFavS } from "../Redux/account/operations";
import { selectModalData } from "../Redux/selectors";
import { Loader } from "./Loader";
const Home = lazy(() =>import("../pages/Home"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const Favourites = lazy(() => import("../pages/Favourites"));
const Search = lazy(() => import("../pages/Search"));
const TrendingPage = lazy(() => import("../pages/TrendingPage"));
const ComingSoonPage = lazy(() => import("../pages/ComingSoonPage"));
const Movies = lazy(() => import("../pages/Movies"));
const Series = lazy(() => import("../pages/Series"));
const Documentaries = lazy(() => import("../pages/Documentaries"));

function App() {
  const refresh = useSelector(selectIsRefreshing);
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectIsLoggedIn);
  const accId = useSelector(selectID);
  const modalData = useSelector(selectModalData);
  const location = useLocation();

  const openM = modalData.openMovie;
  const openS = modalData.openSeries;

  useEffect(() => {
    if (openM || openS) {
      document.body.style.overflow = "hidden";
    } else if (!openM && !openS) {
      document.body.style.overflow = "auto";
    }
  }, [openM, openS]);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch, loggedIn]);

  useEffect(() => {
    if (!loggedIn) {
      return;
    }
    dispatch(fetchFavM(accId));
    dispatch(fetchFavS(accId));
  }, [loggedIn]);

  return (
    <>
      {refresh ? (
        <Loader />
      ) : (
          <Routes location={location} key={location.key}>
            <Route path="/" element={<SharedLayout />}>
              <Route index element={<Home />} />
              <Route
                path="login"
                element={
                  <RestrictedRoute component={<LoginPage />} redirectTo="/" />
                }
              />
              <Route path="favourites" element={<Favourites />} />
              <Route path="search" element={<Search />} />
              <Route path="trending" element={<TrendingPage />} />
              <Route path="coming_soon" element={<ComingSoonPage />} />
              <Route path="top_rated_movies" element={<Movies />} />
              <Route path="top_rated_series" element={<Series />} />
              <Route path="documentaries" element={<Documentaries />} />
            </Route>
          </Routes>
      )}
    </>
  );
}

export default App;
