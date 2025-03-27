"use client";
import React from "react";
import Container from "../Container";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "./CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { FaSkating } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This Property is close to the beach",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This Property has a windmill",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This Property is modern",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This Property is in the countryside",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This Property has a pool",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This Property is on an island",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This Property is Close to a lake",
  },
  {
    label: "Skiing",
    icon: FaSkating,
    description: "This Property has skiing activities",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This Property is a castle",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This Property has camping activities",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This Property is in the Arctic",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This Property is in a cave",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This Property is in a desert",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This Property has a barn",
  },
  {
    label: "Luxurious",
    icon: IoDiamond,
    description: "This Property is luxurious",
  },
];

const Categories = () => {
  const params = useSearchParams();

  const category = params?.get("category");
  const pathName = usePathname();

  const isMainPage = pathName === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className=" pt-4 flex flex-row items-center  justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          ></CategoryBox>
        ))}
      </div>
    </Container>
  );
};

export default Categories;
