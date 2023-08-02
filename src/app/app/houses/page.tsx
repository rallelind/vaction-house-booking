"use client";
import { HomeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import useHouses from "@/hooks/useHouses";
import { useRouter } from "next/navigation";

const HousesLoader = () => {
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
      <div className="grid grid-flow-col auto-cols-auto gap-6 justify-center">
        <button
          onClick={() => push(`/app/houses/create`)}
          className="rounded-lg bg-orange-50 relative border w-60 h-60 flex items-center justify-center object-contain border-gray-300 hover:shadow-md cursor-pointer"
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
            className="h-60 w-60 border bg-orange-50 rounded-lg border-gray-300 relative hover:shadow-md cursor-pointer"
            onClick={() => push(`/app/${house.id}/house`)}
          >
            <img
              className="object-cover w-full rounded-tl-lg rounded-tr-lg"
              src={house.login_images ? house.login_images[0] : "/huset.jpg"}
              alt="billede af huset"
            />
            <div className="bg-orange-100 w-fit p-1 rounded-lg flex items-center top-2 right-2 absolute">
              <MapPinIcon className="h-4 mr-2" />
              <p>{house?.address}</p>
            </div>
            <div className="p-4">
              <p className="text-2xl capitalize font-semibold">
                {house?.house_name}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
