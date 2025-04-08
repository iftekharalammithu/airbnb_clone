"use client";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/Listings/ListingCard";
import { SafeListing, SafeUser } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface TripsClientProps {
  listings: SafeListing[];
  currentUser: SafeUser | null;
}

const PropertiesClient: React.FC<TripsClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setdeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setdeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listings Deleted");
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
        title="Properties"
        subtitle="Listing of your properties"
      ></Heading>
      <div className=" mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 xl:grid-cols-5 gap-8 2xl:grid-cols-6">
        {listings.map((reserva) => (
          <ListingCard
            key={reserva.id}
            data={reserva}
            actionId={reserva.id}
            disabled={deletingId === reserva.id}
            actionLabel="Delete Property"
            onAction={onCancel}
            currentUser={currentUser}
          ></ListingCard>
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
