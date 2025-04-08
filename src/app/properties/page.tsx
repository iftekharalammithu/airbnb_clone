import ClientOnly from "@/components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "@/components/EmptyState";
import getListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";

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

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties Found"
          subtitle="Looks like you haven't listed any properties."
        ></EmptyState>
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <PropertiesClient
        listings={listings}
        currentUser={currentUser}
      ></PropertiesClient>
    </ClientOnly>
  );
};

export default Page;
