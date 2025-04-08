import prisma from "@/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const favoriteListings = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    const safefavorites = favoriteListings.map((listing) => ({
      ...listing,
      createAt: listing.createAt.toISOString(),
    }));

    return safefavorites;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}
