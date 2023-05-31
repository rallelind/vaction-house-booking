import {
  HomeModernIcon,
  MapIcon,
  CalendarDaysIcon,
  UsersIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { ReactNode } from "react";
import Link from "next/link";

export default function ApplicationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <div className="relative">
          <aside className="top-0 left-0 h-screen min-w-max md:sticky lg:w-64 bg-orange-50 p-4">
            <h1 className="hidden lg:block text-2xl font-bold p-3">
              Havklitvej 60
            </h1>
            <ul>
              <li className="mt-5 mb-5">
                <Link
                  href="/application/bookings"
                  className="flex items-center hover:bg-orange-100 w-full p-3 rounded-lg"
                >
                  <HomeModernIcon className="h-6 lg:mr-3" />
                  <p className="hidden lg:block">Bookinger</p>
                </Link>
              </li>
              <li className="mt-5 mb-5">
                <Link
                  href="/application/bookings"
                  className="flex items-center hover:bg-orange-100 w-full p-3 rounded-lg"
                >
                  <MapIcon className="h-6 lg:mr-3" />
                  <p className="hidden lg:block">Dine ture</p>
                </Link>
              </li>
              <li className="mt-5 mb-5">
                <Link
                  href="/application/bookings"
                  className="flex items-center hover:bg-orange-100 w-full p-3 rounded-lg"
                >
                  <CalendarDaysIcon className="h-6 lg:mr-3" />
                  <p className="hidden lg:block">Tjek ledighed</p>
                </Link>
              </li>
              <li className="mt-5 mb-5">
                <Link
                  href="/application/bookings"
                  className="flex items-center hover:bg-orange-100 w-full p-3 rounded-lg"
                >
                  <UsersIcon className="h-6 lg:mr-3" />
                  <p className="hidden lg:block">Tilknyttet familie</p>
                </Link>
              </li>
            </ul>
            <div className="fixed bottom-4">
              <div className="flex items-center">
                <div className=" bg-orange-200 p-2 mr-3 rounded-lg">
                  <UserIcon className="h-6" />
                </div>
                <div className="hidden lg:block">
                  <p>navn</p>
                  <p>email.test@test.com</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
        <div className="flex w-0 flex-1 flex-col">{children}</div>
      </div>
    </div>
  );
}
