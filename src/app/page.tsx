import ClientOnly from "@/components/ClientOnly";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import getLinstings from "./actions/getLintings";
import ListingCard from "@/components/Listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";

export default async function Home() {
  const listings = await getLinstings();
  const currentUsr = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset></EmptyState>
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <Container>
        <div className=" pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings &&
            listings.map((listing) => {
              return (
                <ListingCard
                  key={listing.id}
                  data={listing}
                  currentUser={currentUsr}
                ></ListingCard>
              );
            })}
        </div>
      </Container>
    </ClientOnly>
  );
}
