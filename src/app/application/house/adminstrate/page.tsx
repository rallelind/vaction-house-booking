"use client";
import UserInvite from "@/components/house-adminstrate/user-invite";
import ItemSelect from "@/components/house-adminstrate/item-select";
import {
  EnvelopeIcon,
  EnvelopeOpenIcon,
  PlusIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";
import { useState } from "react";

export default function HouseAdminstration() {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full p-10">
      <UserInvite label="Admin brugere" />
      <div className="mt-6"></div>
      <p className="mb-2 text-md font-medium text-gray-900">Booking type</p>
      <div className="flex">
        <ItemSelect
          description="Tillad åben booking, dette betyder at du ikke skal acceptere bookinger"
          title="Åben booking"
          icon={<EnvelopeOpenIcon className="h-10" />}
          selected={false}
        />
        <ItemSelect
          description="Lukket booking gør at alle bookinger skal accepteres af en admin"
          title="Lukket booking"
          icon={<EnvelopeIcon className="h-10 text-center" />}
          selected={true}
        />
      </div>
      <div className="mt-6"></div>
      <div className="flex justify-between">
        <p className="mb-2 text-md font-medium text-gray-900">Familier</p>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 flex bg-orange-100 border-solid border rounded-lg border-orange-200 hover:bg-orange-200"
        >
          <UserPlusIcon className="h-6 mr-2" />
          <p>Tilføj familie</p>
        </button>
      </div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex justify-center items-start mt-20">
          <Dialog.Panel className="bg-white p-6 rounded-lg w-[50%]">
            <Dialog.Title className="text-xl font-semibold">
              Tilføj en familie til havklitvej 60
            </Dialog.Title>
            <Dialog.Description className="text-md font-light">
              Venligst tilføj familie medlemmer og navn på familien!
            </Dialog.Description>

            <div className="mt-4">
              <label className="text-md mb-2 font-medium text-gray-900 block">
                Famile kalde navn
              </label>
              <input
                className="outline-0 rounded-md bg-gray-50 border border-gray-300 text-gray-900 w-1/2 p-2"
                placeholder="Familiens kalde navn..."
              />
            </div>

            <div className="mt-4">
              <UserInvite label="Tilføj familie medlemmer" />
            </div>

            <div className="mt-4 flex justify-end">
              <button
                className="p-2 mr-2 flex items-center bg-orange-100 border-solid border rounded-lg border-orange-200 hover:bg-orange-200"
                onClick={() => setIsOpen(false)}
              >
                <PlusIcon className="h-6 mr-2" />
                <p className="mr-2">Tilføj</p>
              </button>
              <button
                className="bg-gray-50 p-2 border rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Afbryd
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
