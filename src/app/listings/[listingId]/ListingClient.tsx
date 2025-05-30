"use client";
import Container from "@/components/Container";
import ListingHead from "@/components/Listings/ListingHead";
import ListingInfo from "@/components/Listings/ListingInfo";
import ListingReservation from "@/components/Listings/ListingReservation";
import { categories } from "@/components/Navbar/Categories";
import useLoginModel from "@/hooks/useLoginModel";
import { SafeListing, SafeReservation, SafeUser } from "@/types";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";

const InitialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientPrpos {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser: SafeUser | null;
}

const ListingClient: React.FC<ListingClientPrpos> = ({
  reservations = [],
  listing,
  currentUser,
}) => {
  const loginModel = useLoginModel();
  const router = useRouter();

  const disableDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(InitialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      loginModel.onOpen();
      return;
    }
    setIsLoading(true);
    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Reservation created successfully");
        setDateRange(InitialDateRange);
        router.push("/trips");
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModel]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

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
            <div className=" order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disable={isLoading}
                disableDates={disableDates}
              ></ListingReservation>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
