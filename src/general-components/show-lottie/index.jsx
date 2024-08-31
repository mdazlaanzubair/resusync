import React from "react";
import Lottie from "react-lottie";

const ShowLottie = ({
  animationData,
  isLoop = true,
  height = 300,
  width = 300,
}) => {
  const defaultOptions = {
    loop: isLoop,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} height={height} width={width} />;
};

export default ShowLottie;
