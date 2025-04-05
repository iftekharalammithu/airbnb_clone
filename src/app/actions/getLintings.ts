import prisma from "@/libs/prismadb";

export default async function getLinstings() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createAt: "desc",
      },
    });
    const safeListings = listings.map((listing) => ({
      ...listing,
      createAt: listing.createAt.toISOString(),
    }));
    return safeListings;
  } catch (error) {
    return error;
  }
}
