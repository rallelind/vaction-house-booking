"use client";
import { HomeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import useHouses from "@/hooks/useHouses";

const HouseWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded-lg bg-orange-50 relative border w-60 h-60 flex items-center justify-center object-contain border-gray-300 hover:shadow-md cursor-pointer">
      {children}
    </div>
  );
};

const HousesLoader = () => {
  return (
    <HomeIcon className="animate-bounce h-14 m-auto p-2 bg-orange-100 border border-orange-200 rounded-lg" />
  );
};

export default function Houses() {
  const { houses, housesError, housesIsloading } = useHouses();

  if (housesIsloading) {
    return <HousesLoader />;
  }

  return (
    <div>
      <div className="grid grid-flow-col auto-cols-auto gap-6 justify-center">
        <HouseWrapper>
          <div className="w-full text-center">
            <div className="flex justify-center">
              <HomeIcon className="h-12 p-2 bg-orange-100 border border-orange-200 rounded-lg" />
            </div>
            <p className="mt-6 font-medium">Tilføj et hus</p>
          </div>
        </HouseWrapper>
        {houses?.map((house) => (
          <div
            key={house.id}
            className="h-60 w-60 border bg-orange-50 rounded-lg border-gray-300 relative hover:shadow-md cursor-pointer"
          >
            <img
              className="object-cover h-40 w-full rounded-tl-lg rounded-tr-lg"
              src={house.login_images ? house.login_images[0] : "/huset.jpg"}
              alt="billede af huset"
            />
            <div className="bg-orange-100 w-fit p-1 rounded-lg flex items-center top-2 right-2 absolute">
              <MapPinIcon className="h-4 mr-2" />
              <p>{house?.address}</p>
            </div>
            <div className="p-4">
              <p className="text-2xl font-semibold">{house?.house_name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
