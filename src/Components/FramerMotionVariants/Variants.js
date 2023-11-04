export const bgVariants = {
  init: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.7,
    },
  },
};

export const sideVariants = {
  init: {
    opacity: 0.4,
    y: "-100vh",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 120,
      mass: 1,
      delay: 0.5,
      duration: 0.7,
    },
  },
};

export const bannerVariants = {
  init: {
    opacity: 0,
    x: "100vh",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      delay: 1,
      duration: 0.7,
      damping: 12,
      stiffness: 120,
      mass: 1,
    },
  },
};
export const mainVariants = {
  init: {
    opacity: 0,
    y: "100vh",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      delay: 1.5,
      duration: 0.7,
      damping: 12,
      stiffness: 120,
      mass: 1,
    },
  },
};
export const listVariants = {
  init: {
    opacity: 0,
    y: "100vh",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      delay: 0.3,
      duration: 1.2,
      damping: 12,
      stiffness: 120,
      mass: 1,
    },
  },
};

export const loginVariants = {
  init: {
    opacity: 0.3,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      delay: 0.7,
      duration: 0.7,
      damping: 10,
      stiffness: 140,
    },
  },
};

export const formVariants = {
  init: {
    opacity: 0,
    x: "-100vh",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      delay: 0.8,
      duration: 0.7,
      damping: 12,
      stiffness: 120,
      mass: 1,
    },
  },
};

export const HoverAnim = {
  rotateZ: ["0deg", "8deg", "-8deg", "8deg", "-8deg", "0deg"],
  transition: {
    delay: 3,
    duration: 0.8,
    repeat: Infinity,
    repeatDelay: 5,
  },
};

export const exit = { opacity: 0, transition: { duration: 0.4 } };
