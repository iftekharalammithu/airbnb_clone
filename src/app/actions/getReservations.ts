import prisma from "@/libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

// Define a type for the query object
interface Query {
  listingId?: string;
  userId?: string;
  listing?: {
    userId?: string;
  };
}

export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId } = await params;

    // Use the defined Query type instead of any
    const query: Query = {};

    if (listingId) {
      query.listingId = listingId;
    }
    if (userId) {
      query.userId = userId;
    }
    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createAt: "desc",
      },
    });
    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createAt: reservation.createAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createAt: reservation.listing.createAt.toISOString(),
      },
    }));
    return safeReservations;
  } catch (error) {
    return error;
  }
}
