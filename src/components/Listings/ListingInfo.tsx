"use client";
import useCountries from "@/hooks/useCountrys";
import { SafeUser } from "@/types";
import React from "react";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
  category,
}) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <div className=" col-span-4 flex flex-col gap-8">
      <div className=" flex flex-col gap-2">
        <div className=" text-xl font-semibold flex items-center gap-2">
          <div>Mosted by {user?.name}</div>
          <Avatar src={user?.image || avatar} />
        </div>
        <div className="flex item-center gap-4 font-light text-neutral-500">
          <div>{guestCount} Guests</div>
          <div>{roomCount} Rooms</div>
          <div>{bathroomCount} Bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        ></ListingCategory>
      )}
      <hr />
      <div className=" text-lg font-light text-neutral-500"> {description}</div>
      <hr />
    </div>
  );
};

export default ListingInfo;
