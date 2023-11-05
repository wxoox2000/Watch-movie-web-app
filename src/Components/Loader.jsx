import { ClipLoader, FadeLoader } from "react-spinners";

export const Loader = () => {
  return (
    <FadeLoader
      color="#6100C2"
      height={50}
      margin={40}
      radius={30}
      speedMultiplier={1.5}
      width={20}
      cssOverride={{
        position: "absolute",
        top: "calc(50vh - 87px)",
        left: "calc(60vw - 87px)",
      }}
    />
  );
};
