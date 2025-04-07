import ClientOnly from "@/components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "@/components/EmptyState";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";

const Page = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please login to continue"
        ></EmptyState>
      </ClientOnly>
    );
  }

  const reservation = await getReservations(currentUser.id);

  if (reservation.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Trips Found"
          subtitle="Looks like you haven't booked any trips yet."
        ></EmptyState>
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <TripsClient
        reservation={reservation}
        currentUser={currentUser}
      ></TripsClient>
    </ClientOnly>
  );
};

export default Page;
