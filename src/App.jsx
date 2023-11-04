import { Route, Routes, useLocation } from "react-router-dom";
import { SharedLayout } from "./Components/SharedLayout";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/LoginPage";
import { RestrictedRoute } from "./Components/RestrictedRoute";
import { useDispatch, useSelector } from "react-redux";
import {
  selectID,
  selectIsLoggedIn,
  selectIsRefreshing,
} from "./Redux/auth/selectors";
import { refreshUser } from "./Redux/auth/operations";
import { useEffect } from "react";
import { fetchFavM, fetchFavS } from "./Redux/account/operations";
import { PrivateRoute } from "./Components/PrivateRoute";
import { Favourites } from "./pages/Favourites";
import { Search } from "./pages/Search";
import { selectModalData } from "./Redux/selectors";
import { TrendingPage } from "./pages/TrendingPage";
import { ComingSoonPage } from "./pages/ComingSoonPage";
import { Movies } from "./pages/Movies";
import { Series } from "./pages/Series";
import { Documentaries } from "./pages/Documentaries";
import { Icon } from "./pages/Icon";
import { AnimatePresence } from "framer-motion";

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
        <p>Loading..</p>
      ) : (
        <AnimatePresence>
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
        </AnimatePresence>
      )}
    </>
  );
}

export default App;
