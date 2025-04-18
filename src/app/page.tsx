import ClientOnly from "@/components/ClientOnly";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import ListingCard from "@/components/Listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";

interface HomePorops {
  searchParams: IListingsParams;
}

export default async function Home({ searchParams }: HomePorops) {
  const listings = await getListings(searchParams);
  // console.log(listings);
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
