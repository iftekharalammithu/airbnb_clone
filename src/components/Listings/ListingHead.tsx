"use client";
import useCountries from "@/hooks/useCountrys";
import { SafeUser } from "@/types";
import React from "react";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton/HeartButton";

interface ListingHeadProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <div>
      <Heading
        title={title}
        subtitle={`${location?.region} , ${location?.label}`}
      ></Heading>
      <div className=" w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          alt="Image"
          src={imageSrc}
          fill
          className=" object-cover w-full"
        ></Image>
        <div className=" absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser}></HeartButton>
        </div>
      </div>
    </div>
  );
};

export default ListingHead;
