import useFavorites from "@/hooks/userFavorite";
import { SafeUser } from "@/types";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasFavorited, toggleFavorite } = useFavorites({
    listingId,
    currentUser,
  });
  return (
    <div
      onClick={toggleFavorite}
      className=" relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className=" fill-white absolute -top-[2px] -right-[2px]"
      ></AiOutlineHeart>
      <AiFillHeart
        size={24}
        className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
      ></AiFillHeart>
    </div>
  );
};

export default HeartButton;
