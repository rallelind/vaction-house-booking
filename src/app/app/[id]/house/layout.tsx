"use client";
import {
  HomeModernIcon,
  MapIcon,
  CalendarDaysIcon,
  UsersIcon,
  UserIcon,
  Cog6ToothIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import { ReactNode, useState } from "react";
import Link from "next/link";
import NavigationItem from "@/components/navigation/NavigationItem";
import Avatar from "@/components/ui/Avatar";
import { useSession, useUser } from "@clerk/nextjs";
import useHouse from "@/hooks/useHouse";
import { useParams } from "next/navigation";
import { HousesLoader } from "../../houses/page";
import { Dialog } from "@headlessui/react";

export default function ApplicationLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { session } = useSession();
  const { user } = useUser();
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState<
    "profile" | "payments"
  >("profile");

  console.log(user);

  //check if route includes your-family
  const yourFamilyPage = window.location.href.includes("your-family");

  const { house, houseLoading, houseError } = useHouse();

  if (houseLoading) {
    return (
      <div className="min-h-screen mt-auto flex">
        <HousesLoader />
      </div>
    );
  }

  const { firstName, primaryEmailAddress, imageUrl, lastName, emailAddresses } =
    session?.user || {};

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
                  href={`/app/${house?.id}/house/adminstrate`}
                  icon={<Cog6ToothIcon className="h-6 lg:mr-3" />}
                  text="Adminstrer huset"
                />
              )}
              <NavigationItem
                href={`/app/${house?.id}/house/bookings`}
                icon={<HomeModernIcon className="h-6 lg:mr-3" />}
                text="Bookinger"
              />
              <NavigationItem
                href={`/app/${house?.id}/house/trips`}
                icon={<MapIcon className="h-6 lg:mr-3" />}
                text="Dine ture"
              />
              <NavigationItem
                href={`/app/${house?.id}/house/availability`}
                icon={<CalendarDaysIcon className="h-6 lg:mr-3" />}
                text="Tjek ledighed"
              />
              <NavigationItem
                href={`/app/${house?.id}/house/your-family`}
                icon={<UsersIcon className="h-6 lg:mr-3" />}
                text="Din familie"
              />
            </ul>
            <button
              className="fixed bottom-4 text-left"
              onClick={() => setProfileOpen(true)}
            >
              <div className="flex items-center">
                <Avatar avatarUrl={imageUrl} />
                <div className="hidden lg:block ml-3">
                  <p className="font-semibold">{firstName}</p>
                  <p className="text-xs truncate w-32">
                    {primaryEmailAddress?.emailAddress}
                  </p>
                </div>
              </div>
            </button>
          </aside>
        </div>
        <div className="flex w-0 flex-1 flex-col">{children}</div>
      </div>
      <Dialog onClose={() => setProfileOpen(false)} open={profileOpen}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex justify-center h-fit mt-20">
          <Dialog.Panel className="bg-white rounded-lg w-[50%] flex min-h-[500px]">
            <div className="bg-orange-50 h-full flex flex-col rounded-tl-lg rounded-bl-lg p-4">
              <button
                onClick={() => setSelectedSetting("profile")}
                className={`mt-4 text-left text-sm font-medium rounded-lg flex items-center p-1 ${
                  selectedSetting === "profile" ? "bg-orange-100" : "unset"
                }`}
              >
                <UserIcon className="h-4 mr-2" />
                Profil
              </button>
              <button
                onClick={() => setSelectedSetting("payments")}
                className={`mt-4 text-left text-sm font-medium flex items-center rounded-lg p-1 ${
                  selectedSetting === "payments" ? "bg-orange-100" : "unset"
                }`}
              >
                <CreditCardIcon className="h-4 mr-2" /> Betalinger
              </button>
            </div>
            <div className="p-6 w-full">
              {selectedSetting === "profile" && (
                <>
                  <Dialog.Title className="flex items-center text-xl">
                    <UserIcon className="h-4 mr-4" /> Profil indstillinger
                  </Dialog.Title>
                  <Dialog.Description className="text-slate-500 mt-2">
                    Adminstrer din profils indstillinger
                  </Dialog.Description>
                  <p className="border-b mt-6 pb-4 text-md font-medium border-gray-200">
                    Min Profil
                  </p>
                  <div className="mt-4">
                    <div className="w-fit flex">
                      <Avatar avatarUrl={imageUrl} height="14" width="14" />
                      <div className="flex flex-col ml-6">
                        <label className="text-sm mb-2 font-medium text-gray-900 block">
                          Fornavn
                        </label>
                        <input
                          className="outline-0 rounded-md mb-4 bg-gray-50 border border-gray-300 text-gray-900 p-1 pl-2 pr-2"
                          placeholder="Fornavn"
                          value={firstName}
                        />
                        <label className="text-sm mb-2 font-medium text-gray-900 block">
                          Efternavn
                        </label>
                        <input
                          className="outline-0 rounded-md bg-gray-50 border border-gray-300 text-gray-900 p-1 pl-2 pr-2"
                          placeholder="Efternavn"
                          value={lastName}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="border-b mt-10 pb-4 text-md font-medium border-gray-200">
                    Emails
                  </p>
                  <div className="mt-4">
                    {emailAddresses?.map(({ emailAddress, id }) => (
                      <div key={id} className="flex items-center">
                        <p>{emailAddress}</p>
                        {primaryEmailAddress?.id === id && (
                          <div className="bg-orange-100 p-1 pl-2 pr-2 ml-4 rounded-lg text-sm font-medium">
                            Primære email
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
