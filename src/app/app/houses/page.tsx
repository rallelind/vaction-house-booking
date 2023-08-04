"use client";
import { HomeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import useHouses from "@/hooks/useHouses";
import { useRouter } from "next/navigation";

export const HousesLoader = () => {
  return (
    <HomeIcon className="animate-bounce h-14 m-auto p-2 bg-orange-100 border border-orange-200 rounded-lg" />
  );
};

export default function Houses() {
  const { houses, housesError, housesIsloading } = useHouses();

  const { push } = useRouter();

  if (housesIsloading) {
    return <HousesLoader />;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 justify-center">
        <button
          onClick={() => push(`/app/houses/create`)}
          className="rounded-lg relative border w-60 h-60 flex items-center justify-center object-contain border-gray-300 hover:shadow-sm cursor-pointer"
        >
          <div className="w-full text-center">
            <div className="flex justify-center">
              <HomeIcon className="h-12 p-2 bg-orange-100 border border-orange-200 rounded-lg" />
            </div>
            <p className="mt-6 font-medium">Tilføj et hus</p>
          </div>
        </button>
        {houses?.map((house) => (
          <button
            key={house.id}
            className="w-60 h-60 border bg-orange-50 rounded-lg border-gray-300 relative hover:shadow-md cursor-pointer"
            onClick={() => push(`/app/${house.id}/house`)}
          >
            <img
              className="object-cover h-full w-full rounded-lg"
              src={house.login_images ? house.login_images[0] : "/huset.jpg"}
              alt="billede af huset"
            />
            <div className="bg-orange-50 border font-semibold border-orange-300 w-fit p-1 pr-2 rounded-lg flex items-center top-2 right-2 absolute">
              <MapPinIcon className="h-4 mr-2" />
              <p>{house?.address}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
