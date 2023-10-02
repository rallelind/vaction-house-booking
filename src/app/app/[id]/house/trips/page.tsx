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
            <h1 className="font-medium text-md">
              {`Booket fra ${format(
                new Date(booking?.start_date),
                "dd MMMM"
              )} til ${format(new Date(booking?.end_date), "dd MMMM")}`}
            </h1>
            <div className="flex gap-4 mt-4">
              <div className="bg-blue-100 w-full p-4 rounded-lg relative">
                <IoWaterOutline fontSize="16px" />
                <p>Vand brugt</p>
                <p className="bg-blue-200 p-1 z-10 rounded-lg text-sm font-medium relative mb-2 opacity-80">
                  100dkk / 10l
                </p>
                <svg className="z-0 absolute bottom-0 left-0 rounded-b-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                  <path
                    fill="#0099ff"
                    fill-opacity="1"
                    d="M0,32L26.7,58.7C53.3,85,107,139,160,154.7C213.3,171,267,149,320,165.3C373.3,181,427,235,480,218.7C533.3,203,587,117,640,96C693.3,75,747,117,800,133.3C853.3,149,907,139,960,117.3C1013.3,96,1067,64,1120,48C1173.3,32,1227,32,1280,42.7C1333.3,53,1387,75,1413,85.3L1440,96L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
                  ></path>
                </svg>
              </div>
              <div className=" bg-yellow-100 w-full p-4 rounded-lg">
                <BoltIcon className="h-4" />
                <p>Strøm brugt</p>
                <p className="bg-yellow-200 rounded-lg p-1 text-sm font-medium">
                  100dkk / 10kw
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
