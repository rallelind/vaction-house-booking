"use client";
import { Dialog } from "@headlessui/react";
import useUser from "@/hooks/useUser";
import GoogleSignInButton from "@/components/sign-in/google";
import { HomeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Avatar from "@/components/ui/Avatar";

const HouseWrapper = ({ children }) => {
  return (
    <div className="rounded-lg relative border w-80 h-80 flex items-center justify-center object-contain border-gray-300 hover:shadow-md cursor-pointer">
      {children}
    </div>
  );
};

export default function Houses() {
  const { user, userError } = useUser();

  return (
    <div>
      <div className="grid grid-flow-col auto-cols-auto gap-6">
        <HouseWrapper>
          <div className="w-full text-center">
            <div className="flex justify-center">
              <HomeIcon className="h-12 p-2 bg-orange-100 border border-orange-200 rounded-lg" />
            </div>
            <p className="mt-6 font-medium">Tilføj et hus</p>
          </div>
        </HouseWrapper>
        <div className="h-80 w-80 border rounded-lg border-gray-300 relative">
          <img
            className="object-cover h-40 w-full rounded-tl-lg rounded-tr-lg"
            src="/huset.jpg"
            alt="billede af huset"
          />
          <div className="bg-orange-100 w-fit p-1 rounded-lg flex items-center top-2 right-2 absolute">
            <MapPinIcon className="h-4 mr-2" />
            <p>Havklitvej 60</p>
          </div>
          <div className="p-4">
            <p className="text-2xl font-semibold">Havklitvej 60</p>
            <div className="mt-2">
              <p>Husets admins:</p>
              <div className="flex -space-x-4 mt-2">
                <Avatar />
                <Avatar />
                <Avatar />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={userError ? true : false}
        onClose={() => console.log("closed")}
      >
        <div className="fixed inset-0 bg-black/10" aria-hidden="true" />
        <div className="fixed inset-0 flex justify-center items-start mt-20">
          <Dialog.Panel className="bg-white p-6 rounded-lg w-[40%] text-center">
            <Dialog.Title className="text-xl font-semibold">
              Din session er udløbet!
            </Dialog.Title>
            <Dialog.Description className="text-md font-light">
              Venligst log in for med understående metode for at logge ind!
            </Dialog.Description>
            <GoogleSignInButton />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
