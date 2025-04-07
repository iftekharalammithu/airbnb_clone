"use client";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/Listings/ListingCard";
import { SafeReservation, SafeUser } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface TripsClientProps {
  reservation: SafeReservation[];
  currentUser: SafeUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservation,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setdeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setdeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation Deleted");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        })
        .finally(() => {
          setdeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going."
      ></Heading>
      <div className=" mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 xl:grid-cols-5 gap-8 2xl:grid-cols-6">
        {reservation.map((reserva) => (
          <ListingCard
            key={reserva.id}
            data={reserva.listing}
            reservation={reserva}
            actionId={reserva.id}
            disabled={deletingId === reserva.id}
            actionLabel="Cancel Reservation"
            onAction={onCancel}
            currentUser={currentUser}
          ></ListingCard>
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
