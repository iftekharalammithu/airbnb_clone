"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Logo = () => {
  const router = useRouter();
  return (
    <div
      className="flex cursor-pointer justify-center items-center gap-2"
      onClick={() => {
        router.push("/");
      }}
    >
      <Image
        alt="Logo"
        height={"50"}
        width={"50"}
        className=" hidden md:block "
        src={"/logo.png"}
      ></Image>
      <h1 className=" text-[#ff5a5f] text-4xl abril-fatface-regular">airbnb</h1>
    </div>
  );
};

export default Logo;
