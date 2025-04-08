import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  listingsId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  const { listingsId } = await params;

  if (!listingsId || typeof listingsId !== "string") {
    throw new Error("Invalid ID");
  }

  const favoriteId = [...(currentUser.favoriteIds || [])];

  favoriteId.push(listingsId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds: favoriteId,
    },
  });

  return NextResponse.json(user);
}

// DELETE
export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const { listingsId } = params;
  if (!listingsId || typeof listingsId !== "string") {
    throw new Error("Invalid ID");
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds = favoriteIds.filter((id) => id !== listingsId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });
  return NextResponse.json(user);
}
