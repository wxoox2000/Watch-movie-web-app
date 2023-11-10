import { motion } from "framer-motion";

const fillVariants = {
  hidden: {
    pathLength: 0,
    stroke: "rgba(255, 255, 255, 0)",
    fill: "rgba(255, 255, 255, 0)",
  },
  visible: {
    pathLength: 1,
    fill: [
      "rgba(255, 255, 255, 0)",
      "rgba(255, 255, 255, 0)",
      "rgba(255, 255, 255, 0)",
      "rgba(255, 255, 255, 0)",
      "rgba(255, 255, 255, 1)",
    ],
    stroke: "rgba(255, 255, 255, 1)",
    transition: {
      delay: 1,
      duration: 1.5,
    },
  },
};
const strokeVariants = {
  hidden: {
    pathLength: 0,
    stroke: "rgba(255, 255, 255, 0)",
  },
  visible: {
    pathLength: 1,
    stroke: [
      "rgba(255, 255, 255, 0.2)",
      "rgba(255, 255, 255, 0.4)",
      "rgba(255, 255, 255, 0.6)",
      "rgba(255, 255, 255, 1)",
    ],
    transition: {
      delay: 1,
      duration: 1.5,
    },
  },
};
const strokeVariantsF = {
  hidden: {
    pathLength: 0,
    stroke: "rgba(255, 255, 255, 0)",
  },
  visible: {
    pathLength: 1,
    stroke: [
      "rgba(255, 255, 255, 0.2)",
      "rgba(255, 255, 255, 0.4)",
      "rgba(255, 255, 255, 0.6)",
      "rgba(255, 255, 255, 0.8)",
      "rgba(255, 255, 255, 0.8)",
      "rgba(255, 255, 255, 0.8)",
      "rgba(255, 255, 255, 0.8)",
      "#7900C2",
    ],
    transition: {
      delay: 1,
      duration: 1.5,
    },
  },
};
const svgVariants1 = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1,1,1, 0.8, 0.4, 0],
    scale: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    // translateX: [0, 0, 0, 0, 0, -674],
    // translateY: [0, 0, 0, 0, 0, -319],

    transition: {
      duration: 4,
    },
  },
};
export const Icon = () => {
  return (
    <div className="fixed w-full h-full top-0 left-0 backdrop-blur-sm z-50 animate-iconPop">
    <motion.div
      variants={svgVariants1}
      initial="hidden"
      animate="visible"
      className="absolute w-96 h-96 top-[calc(50vh-182px)] left-[calc(50vw-182px)] bg-black rounded-2xl flex items-center justify-center z-50"
    >
      <motion.svg
        className="drop-shadow-3xl shadow-blue"
        xmlns="http://www.w3.org/2000/svg"
        width="240"
        height="240"
        viewBox="0 0 32 32"
        fill="none"
      >
        <motion.path
          d="M24 10.6666H25.3333C26.7478 10.6666 28.1044 11.2285 29.1046 12.2287C30.1048 13.2289 30.6667 14.5855 30.6667 16C30.6667 17.4144 30.1048 18.771 29.1046 19.7712C28.1044 20.7714 26.7478 21.3333 25.3333 21.3333H24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={strokeVariants}
        />
        <motion.path
          d="M2.66669 10.6666H24V22.6666C24 24.0811 23.4381 25.4377 22.4379 26.4379C21.4377 27.4381 20.0812 28 18.6667 28H8.00002C6.58553 28 5.22898 27.4381 4.22878 26.4379C3.22859 25.4377 2.66669 24.0811 2.66669 22.6666V10.6666Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={fillVariants}
        />
        <motion.path
          d="M8 1.33337V5.33337"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={strokeVariants}
        />
        <motion.path
          d="M13.3333 1.33337V5.33337"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={strokeVariantsF}
        />
        <motion.path
          d="M18.6667 1.33337V5.33337"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={strokeVariants}
        />
      </motion.svg>
    </motion.div>
    </div>
  );
};
