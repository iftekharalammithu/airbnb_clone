"use client";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/Listings/ListingCard";
import { SafeReservation, SafeUser } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface ReservationClientProps {
  reservation: SafeReservation[];
  currentUser: SafeUser | null;
}

const ReservationClient: React.FC<ReservationClientProps> = ({
  reservation,
  currentUser,
}) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeleteId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation Cancelled");
          router.refresh();
        })
        .catch(() => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          setDeleteId("");
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading
        title="Reservations"
        subtitle="Bookings on your Properties"
      ></Heading>
      <div className=" mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 ">
        {reservation.map((item) => (
          <ListingCard
            key={item.id}
            data={item.listing}
            reservation={item}
            onAction={onCancel}
            disabled={deleteId === item.id}
            actionLabel="Cancel guest reservation"
            actionId={item.id}
            currentUser={currentUser}
          ></ListingCard>
        ))}
      </div>
    </Container>
  );
};

export default ReservationClient;
