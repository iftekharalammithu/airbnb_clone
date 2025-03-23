"use client";
import { avatar } from "@/asserts";
import Image from "next/image";
import React from "react";

const Avatar = () => {
  return (
    <Image
      height={30}
      width={30}
      className="rounded-full"
      alt="Avatar"
      src={avatar}
    ></Image>
  );
};

export default Avatar;
