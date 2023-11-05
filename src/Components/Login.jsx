import { Link } from "react-router-dom";
import Coffee from "../assets/coffee.svg";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../Redux/auth/operations";
import { tryLogin, getData, getId } from "../Redux/auth/authSlice";
import { motion } from "framer-motion";
import { formVariants, loginVariants } from "./FramerMotionVariants/Variants";
import { FiCoffee } from "react-icons/fi";
import {
  selectAttempt,
  selectIsError,
  selectIsLoading,
  selectIsRefreshing,
} from "../Redux/auth/selectors";
import { ToastContainer, toast } from "react-toastify";

export const Login = () => {
  const [openForm, setOpenForm] = useState(false);
  const [tip, setTip] = useState(false);
  const dispatch = useDispatch();
  const error = useSelector(selectIsError);
  const loading = useSelector(selectIsRefreshing);
  const attempt = useSelector(selectAttempt);
  const showMessage = error && attempt && !loading;
  console.log(showMessage);
  const onClick = () => {
    if (!openForm) {
      setOpenForm(true);
    }
  };
  const showTip = () => {
    setTip(true);
  };
  const dispatchId = (id) => {
    dispatch(getId(id));
  };
  const dispatchData = (obj) => {
    dispatch(getData(obj));
  };
  const schema = Yup.object().shape({
    username: Yup.string().required("Enter your username"),
    password: Yup.string()
      .min(6, "Password should be 6 or more symbols")
      .max(50, "Too long")
      .required("Enter your password"),
  });
  useEffect(() => {
    if (showMessage) {
      toast.warn("Please enter valid login and/or password", {
        position: "top-center",
        autoClose: 2000,
        delay: 1000,
        hideProgressBar: false,
        icon: <FiCoffee />,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      });
    }
  }, [showMessage]);
  return (
    <div className="w-[1440px] mx-auto h-full absolute bg-black bg-bgModal bg-cover animate-inputPopUp z-20">
      {showMessage && <ToastContainer limit={1} />}
      <motion.div
        className="absolute top-[calc(50%-160px)] left-[calc(50%-120px)] w-fit flex flex-col items-center"
        variants={loginVariants}
        initial="init"
        animate="visible"
      >
        <Link className="mb-5" to="/">
          <div className="flex items-center gap-2 ">
            <img className="w-8 h-8" src={Coffee} alt="" />
            <h2 className="uppercase text-white leading-6 tracking-[1.32px] font-bold text-[22px]">
              watch
            </h2>
          </div>
        </Link>
        <p className="text-white text-lg leading-5 font-normal mb-10">
          Enjoy the newest movies
        </p>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={schema}
          onSubmit={
            openForm
              ? (values) => {
                  dispatch(
                    logIn({ values, f: dispatchId, data: dispatchData })
                  );
                  dispatch(tryLogin(true));
                  setTimeout(() => {
                    dispatch(tryLogin(false));
                  }, 4000);
                }
              : null
          }
        >
          <Form className="mb-4 flex flex-col gap-4 items-center relative">
            {openForm && (
              <motion.div
                className="flex flex-col gap-4"
                variants={formVariants}
              >
                <Field
                  className="h-10 rounded-xl w-56 outline-none px-2 py-2 bg-gray focus:bg-white trans text-black text-lg leading-5 font-semibold"
                  name="username"
                />
                <div className="absolute -right-40 top-[6px] w-[150px]">
                  <ErrorMessage
                    className="text-purple text-lg font-semibold"
                    component="span"
                    name="username"
                  />
                </div>
                <Field
                  type="password"
                  className="h-10 rounded-xl w-56 outline-none px-2 py-2 bg-gray focus:bg-white trans text-black text-lg leading-5 font-semibold"
                  name="password"
                />
                <div className="absolute -right-[368px] top-[62px] w-[358px]">
                  <ErrorMessage
                    className="text-purple text-lg font-semibold"
                    component="span"
                    name="password"
                  />
                </div>
              </motion.div>
            )}
            <button
              type="submit"
              className="px-6 py-[17px] mt-5 w-56 text-white rounded-xl bg-blue hover:bg-purple trans"
            >
              Log in
            </button>
          </Form>
        </Formik>
        {!openForm && (
          <button
            onClick={onClick}
            className="px-6 py-[17px] mt-5 w-56 absolute top-28 text-white rounded-xl bg-blue hover:bg-purple trans"
          >
            Log in
          </button>
        )}
        <p className="text-white text-base leading-5 font-medium mb-4">
          No account?
          <b
            onClick={showTip}
            className="underline cursor-pointer hover:text-gray trans"
          >
            Sign up
          </b>
        </p>
        {tip && (
          <div className="animate-inputPopUp w-96 flex flex-col gap-4 items-center absolute -bottom-36">
            <p className="text-white text-xs leading-5 font-normal text-center">
              You will be redirected to TMDB website to register new account.
              After successful registration you can login to your account in the
              Watch app:)
            </p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-[17px] flex-grow-0 text-white rounded-xl bg-blue hover:bg-purple trans"
              href="https://www.themoviedb.org/signup?"
            >
              Ok
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
};
