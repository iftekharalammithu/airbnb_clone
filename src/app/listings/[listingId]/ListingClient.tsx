"use client";
import Container from "@/components/Container";
import ListingHead from "@/components/Listings/ListingHead";
import ListingInfo from "@/components/Listings/ListingInfo";
import { categories } from "@/components/Navbar/Categories";
import { SafeListing, SafeUser } from "@/types";
import { Reservation } from "@prisma/client";
import React, { useMemo } from "react";

interface ListingClientPrpos {
  reservations?: Reservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser: SafeUser | null;
}

const ListingClient: React.FC<ListingClientPrpos> = ({
  reservations,
  listing,
  currentUser,
}) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing]);
  return (
    <Container>
      <div className=" max-w-screen-lg mx-auto">
        <div className=" flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          ></ListingHead>
          <div className=" grid grid-cols-1 md:grid-cols-2 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            ></ListingInfo>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
