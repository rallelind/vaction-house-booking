"use client";
import useBookings from "@/hooks/useBookings";
import useHouse from "@/hooks/useHouse";
import { useParams } from "next/navigation";
import useTodaysBooking from "@/hooks/useTodaysBooking";
import Avatar from "@/components/ui/Avatar";
import format from "date-fns/format";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Application() {
  const { id } = useParams();
  const { house, houseError, houseLoading } = useHouse(id);
  const { todaysBooking, todaysBookingLoading, todaysBookingError } =
    useTodaysBooking(id);

  const { push } = useRouter();

  if (houseLoading || todaysBookingLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex">
        <div className="w-full p-4 m-4 bg-orange-50 rounded-lg">
          <div className="flex gap-4">
            <h1>Velkommen til {house?.house_name}</h1>
            <Image
              height="100"
              width="100"
              src={house?.login_images[0]}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-full m-4 p-4 rounded-lg bg-orange-50">
          <h1 className="font-semibold text-xl">
            {todaysBookingError
              ? "Huset står i øjeblikket frit"
              : "Huset er i øjeblikket booket"}
          </h1>
          <div className="w-fit flex items-center mt-4">
            {todaysBookingError ? (
              <p>Der er ingen der har booket huset i øjeblikket</p>
            ) : (
              <>
                <Avatar avatarUrl={todaysBooking?.user?.profile_image_url} />
                <div className="ml-4">
                  <p>
                    {todaysBooking?.user?.first_name}{" "}
                    {todaysBooking?.user?.last_name}
                  </p>
                  <p className="font-normal text-gray-700 text-sm">
                    {`Booket fra ${format(
                      new Date(todaysBooking?.booking?.start_date),
                      "dd MMMM"
                    )} til ${format(
                      new Date(todaysBooking?.booking?.end_date),
                      "dd MMMM"
                    )}`}
                  </p>
                </div>
              </>
            )}
          </div>
          <hr className="mt-4 mb-4" />
          <div className="flex justify-center items-center">
            <button
              onClick={() => push(`/app/${id}/house/availability`)}
              className="p-2 bg-slate-800 font-semibold pl-4 pr-4 text-sm rounded-full text-white"
            >
              Reserver din tur her
            </button>
          </div>
        </div>
        <div className="w-full m-4 p-4 rounded-lg bg-orange-50">
          <h1>{house?.address}</h1>
        </div>
      </div>
    </div>
  );
}
