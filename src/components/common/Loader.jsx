import React from "react";
import { BeatLoader } from "react-spinners";

const Loader = () => {
  return (
    <BeatLoader color="black" loading margin={3} size={6} speedMultiplier={1} />
  );
};

export default Loader;
