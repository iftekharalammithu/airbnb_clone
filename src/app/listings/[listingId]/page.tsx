import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import React from "react";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";
import { SafeReservation, SafeUser } from "@/types";

interface IParams {
  listingId?: string;
}

const Page = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  const reservation = (await getReservations(params)) as
    | SafeReservation[]
    | undefined;

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState></EmptyState>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        reservations={reservation}
        currentUser={currentUser as SafeUser | null}
      ></ListingClient>
    </ClientOnly>
  );
};

export default Page;
