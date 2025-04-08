import EmptyState from "@/components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import ClientOnly from "@/components/ClientOnly";
import getReservations from "../actions/getReservations";
import ReservationClient from "./ReservationClient";

const Page = async () => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthrized"
          subtitle="Please login to continue"
        ></EmptyState>
      </ClientOnly>
    );
  }
  const reservation = await getReservations({
    authorId: currentUser,
  });

  if (reservation.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Reservation Found"
          subtitle="Looks like you have no reservation"
        ></EmptyState>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationClient
        reservation={reservation}
        currentUser={currentUser}
      ></ReservationClient>
    </ClientOnly>
  );
};

export default Page;
