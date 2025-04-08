import prisma from "@/libs/prismadb";

export interface IListingsParams {
  userId?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const { userId } = await params;

    const query: any = {};

    if (userId) {
      query.userId = userId;
    }

    const listings = await prisma.listing.findMany({
      where: query,
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
