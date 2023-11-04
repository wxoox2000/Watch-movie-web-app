/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      blue: "#6100C2",
      purple: "#7900C2",
      gray: "#969696",
      white: "#ffffff",
      black: "#21201E",
      shadowColor: "rgba(97, 0, 194, 0.40)",
      transparent: "transparent",
    },
    fontFamily: {
      sans: ["Poppins"],
    },
    extend: {
      keyframes: {
        inputPopUp: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        searchColor: {
          "0%": { stroke: "#ffffff" },
          "100%": { stroke: "#7900C2" },
        },
        inputPopOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        searchColorBack: {
          "0%": { stroke: "#7900C2" },
          "100%": { stroke: "#ffffff" },
        },
        swipeForward: {
          "0%": { translate: "0 0" },
          "100%": { translate: "-1102px 0" },
        },
        modalAppear: {
          "0%": {
            transform: "scaleX(1)",
            "transform-origin": "right",
          },
          "100%": {
            transform: "scaleX(0)",
            "transform-origin": "right",
          },
        },
        loginAppear: {
          "0%": {
            transform: "scaleX(0)",
            "transform-origin": "left",
          },
          "100%": {
            transform: "scaleX(1)",
            "transform-origin": "left",
          },
        },
        searchAppear: {
          "0%": {
            transform: "scaleX(0)",
            "transform-origin": "left",
            opacity: 0,
          },
          "100%": {
            transform: "scaleX(1)",
            "transform-origin": "left",
            opacity: 1,
          },
          
        },
        searchIcon: {
          "0%": {
            transform: "translate(0, 0) scale(1)",
            opacity: 1,
          },
          "70%": {
            transform: "translate(-525px, 105px) scale(1.2)",
            opacity: 0.7,
          },
          "99%": {
            transform: "translate(-525px, 105px) scale(3.5)",
            opacity: 0,
          },
          "100%": {
            transform: "translate(-525px, 105px) scale(3.5)",
            opacity: 0,
            visibility: "hidden",
          }
        },
        iconPop: {
          "0%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
            visibility: "hidden"
          }
          
        },

      },
      animation: {
        inputPopUp: "inputPopUp 700ms ease-in-out 1 forwards alternate",
        searchColor: "searchColor 700ms ease-in-out 1 forwards alternate",
        inputPopOut: "inputPopOut 700ms ease-in-out 1 backwards alternate",
        searchColorBack:
          "searchColorBack 700ms ease-in-out 1 backwards alternate",
        swipeForward: "swipeForward 2000ms ease-in-out 1 forwards alternate",
        modalAppear: "modalAppear 1000ms ease-in-out 1 forwards alternate",
        loginAppear: "loginAppear 1000ms ease-in-out 1 forwards alternate",
        searchIcon: "searchIcon 1000ms ease-in-out 1 forwards alternate",
        searchAppear: "searchAppear 1000ms 600ms ease-in-out 1 backwards alternate",        
        iconPop: "iconPop 700ms 3000ms ease-in-out 1 forwards alternate",        
      },
      transitionProperty: {
        "transition-all": "duration-1000 ease-in",
      },
      borderRadius: {
        xl: "14px",
        "2xl": "20px",
      },
      backgroundImage: {
        "gray-grad":
          "linear-gradient(90deg, rgba(255, 255, 255, 0.62) -9.39%, rgba(255, 255, 255, 0.78) 106.21%)",
        "black-grad":
          "conic-gradient(from -2deg at 28.99% 107.28%, #37312A 175.51443457603455deg, #191817 342.4887156486511deg, #191817 360deg)",
        image: "url('/src/assets/bg-image.jpg')",
        bgModal: "url('/src/assets/bg-modal.png')",
        bgIcon: "url('./src/assets/cameraIcon.png')",
        "btn-grad":
          "linear-gradient(99deg, #FFF 3.36%, rgba(255, 255, 255, 0.00) 238.16%)",
        cardInfoGrad:
          "linear-gradient(100deg, #FFF 12.94%, rgba(255, 255, 255, 0.00) 159.1%)",
          modalRadial: "radial-gradient(circle, rgba(142,138,138,0.7456232492997199) 20%, rgba(0,0,0,0.8548669467787114) 100%)"
      },
      boxShadow: {
        xl: "2px 0px 90px 0px rgba(0, 0, 0, 0.40)",
        xlInn: "inset 2px 0px 90px 0px rgba(0, 0, 0, 0.40)",
      },
      dropShadow: {
        xl: "0px 0px 2px #ffffff",
        "2xl": "3px -3px 4px #6100C2",
        "3xl": "0px 2px 15px #6100C2",
      },
    },
  },
  plugins: [],
};
