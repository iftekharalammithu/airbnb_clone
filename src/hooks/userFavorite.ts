import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";
import useLoginModel from "./useLoginModel";
import { useCallback, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface IUserFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorites = ({ listingId, currentUser }: IUserFavorite) => {
  const route = useRouter();
  const loginModel = useLoginModel();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [listingId, currentUser]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentUser) {
        return loginModel.onOpen();
      }
      try {
        let request;
        if (hasFavorited) {
          request = () => axios.delete(`/api/favorite/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorite/${listingId}`);
        }
        await request();
        route.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("Something went wrong");
        console.log(error);
      }
    },
    [currentUser, hasFavorited, listingId, loginModel, route]
  );
  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorites;
