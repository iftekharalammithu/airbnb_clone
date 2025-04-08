import ClientOnly from "@/components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "@/components/EmptyState";
import getFavoriteListings from "../actions/getFavorites";
import FavoriteClient from "./FavoriteClient";

const Page = async () => {
  const currentUser = await getCurrentUser();
  const listings = await getFavoriteListings();

  if (listings?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Favorites FOund"
          subtitle="Looks like you have no favorites"
        ></EmptyState>
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <FavoriteClient
        listing={listings}
        currentUser={currentUser}
      ></FavoriteClient>
    </ClientOnly>
  );
};

export default Page;
