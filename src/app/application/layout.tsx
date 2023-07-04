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

export default function ApplicationLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useUser();

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <div className="relative">
          <aside className="top-0 left-0 h-screen min-w-max md:sticky lg:w-64 bg-orange-50 p-4">
            <h1 className="hidden lg:block text-2xl font-bold p-3">
              Havklitvej 60
            </h1>
            <ul>
              {user?.house_admin && (
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
                <Avatar avatarUrl={user?.picture} />
                <div className="hidden lg:block ml-3">
                  <p>{user?.name}</p>
                  <p className="text-xs truncate">{user?.email}</p>
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
