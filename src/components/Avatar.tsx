"use client";
import { avatar } from "@/asserts";
import Image from "next/image";
import React from "react";

interface AvatarProps {
  src?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      height={30}
      width={30}
      className="rounded-full"
      alt="Avatar"
      src={src || avatar}
    ></Image>
  );
};

export default Avatar;
