import prisma from "@/libs/prismadb";

export default async function getLinstings() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createAt: "desc",
      },
    });
    return listings;
  } catch (error) {
    return error;
  }
}
