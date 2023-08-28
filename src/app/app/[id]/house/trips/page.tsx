"use client";
import usePastBookings from "@/hooks/bookings/usePastBookings";
import { BoltIcon } from "@heroicons/react/24/outline";
import format from "date-fns/format";
import { IoWaterOutline } from "react-icons/io5";

export default function TripsPage() {
  const { pastBookings } = usePastBookings();

  return (
    <div className="p-6">
      <div className="grid grid-cols-3 gap-6">
        {pastBookings?.map((booking) => (
          <div key={booking.id} className="bg-orange-50 rounded-lg p-4">
            <h1 className="font-medium">
              {`Booket fra ${format(
                new Date(booking?.start_date),
                "dd MMMM"
              )} til ${format(new Date(booking?.end_date), "dd MMMM")}`}
            </h1>
            <div className="flex gap-2 mt-4 items-center">
              <IoWaterOutline fontSize="16px" />
              <p>Vand brugt</p>
              <p className="bg-blue-200 p-1 rounded-lg text-sm font-medium">
                100dkk / 10l
              </p>
            </div>
            <div className="flex gap-2 mt-4 items-center">
              <BoltIcon className="h-4" />
              <p>Strøm brugt</p>
              <p className="bg-yellow-200 rounded-lg p-1 text-sm font-medium">
                100dkk / 10kw
              </p>
            </div>
            <button className="bg-orange-400 border text-sm border-orange-500 w-full rounded-lg mt-4 text-white font-medium p-1 pl-4 pr-4">
              Betal nu
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
