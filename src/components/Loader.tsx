"use client";
import React from "react";
import { PuffLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className=" h-[70vh] flex items-center justify-center flex-col">
      <PuffLoader size={80} color="red"></PuffLoader>
    </div>
  );
};

export default Loader;
