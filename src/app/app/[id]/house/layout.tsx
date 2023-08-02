"use client";
import {
  HomeModernIcon,
  MapIcon,
  CalendarDaysIcon,
  UsersIcon,
  UserIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { ReactNode } from "react";
import Link from "next/link";
import useUser from "@/hooks/useUser";
import NavigationItem from "@/components/navigation/NavigationItem";
import Avatar from "@/components/ui/Avatar";
import { useSession } from "@clerk/nextjs";
import useHouse from "@/hooks/useHouse";
import { useParams } from "next/navigation";
import { HousesLoader } from "../../houses/page";

export default function ApplicationLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { session } = useSession();

  const { id } = useParams();

  const { house, houseLoading } = useHouse(id);

  if (houseLoading) {
    return (
      <div className="min-h-screen mt-auto flex">
        <HousesLoader />
      </div>
    );
  }

  const { firstName, primaryEmailAddress, imageUrl } = session?.user || {};

  const houseAdmin = house?.house_admins.includes(
    primaryEmailAddress?.emailAddress as string
  );

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <div className="relative border-r border-orange-100">
          <aside className="top-0 left-0 h-screen min-w-max md:sticky lg:w-44 bg-orange-50 p-4">
            <h1 className="hidden lg:block text-2xl capitalize font-bold p-3">
              {house?.house_name}
            </h1>
            <ul>
              {houseAdmin && (
                <NavigationItem
                  href="/application/house/adminstrate"
                  icon={<Cog6ToothIcon className="h-6 lg:mr-3" />}
                  text="Adminstrer huset"
                />
              )}
              <NavigationItem
                href="/application/bookings"
                icon={<HomeModernIcon className="h-6 lg:mr-3" />}
                text="Bookinger"
              />
              <NavigationItem
                href="/application/trips"
                icon={<MapIcon className="h-6 lg:mr-3" />}
                text="Dine ture"
              />
              <NavigationItem
                href="/application/availability"
                icon={<CalendarDaysIcon className="h-6 lg:mr-3" />}
                text="Tjek ledighed"
              />
              <NavigationItem
                href="/application/your-family"
                icon={<UsersIcon className="h-6 lg:mr-3" />}
                text="Din familie"
              />
            </ul>
            <div className="fixed bottom-4">
              <div className="flex items-center">
                <Avatar avatarUrl={imageUrl} />
                <div className="hidden lg:block ml-3">
                  <p className="font-semibold">{firstName}</p>
                  <p className="text-xs truncate w-32">
                    {primaryEmailAddress?.emailAddress}
                  </p>
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
