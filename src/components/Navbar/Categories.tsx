import React from "react";
import Container from "../Container";
import { TbBeach } from "react-icons/tb";
import { GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";

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
];

const Categories = () => {
  return (
    <Container>
      <div className=" pt-4 flex flex-row items-center  justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            description={item.description}
            icon={item.icon}
          ></CategoryBox>
        ))}
      </div>
    </Container>
  );
};

export default Categories;
