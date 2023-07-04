"use client";
import UserInvite from "@/components/house-adminstrate/user-invite";
import ItemSelect from "@/components/house-adminstrate/item-select";
import {
  EnvelopeIcon,
  EnvelopeOpenIcon,
  PencilIcon,
  PlusIcon,
  RectangleGroupIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import Avatar from "@/components/ui/Avatar";
import AddFamilyModalContent from "@/components/house-adminstrate/add-family-modal-content";

export default function HouseAdminstration() {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full p-10">
      <button className="mb-6 p-2 flex bg-orange-100 border-solid border rounded-lg border-orange-200 hover:bg-orange-200">
        <RectangleGroupIcon className="h-6 mr-2" />
        <p>Personaliser log in side</p>
      </button>
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
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-md font-medium text-gray-900">Familier</p>
          <p>Dette er de familier der er tilføjet til dette hus</p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 flex bg-orange-100 border-solid border rounded-lg border-orange-200 hover:bg-orange-200"
        >
          <UserPlusIcon className="h-6 mr-2" />
          <p>Tilføj familie</p>
        </button>
      </div>
      <ul>
        <li className="border rounded-lg border-gray-200 p-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="flex -space-x-4">
                <Avatar />
                <Avatar />
                <Avatar />
                <Avatar />
                <Avatar />
              </div>
              <p className="ml-4 font-medium">Familien Lind</p>
            </div>
            <button className="p-2 flex text-xs bg-orange-100 border-solid border rounded-lg border-orange-200 hover:bg-orange-200">
              <PencilIcon className="h-4 mr-2" />
              <p>Ændre detaljer</p>
            </button>
          </div>
        </li>
      </ul>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex justify-center items-start mt-20">
          <Dialog.Panel className="bg-white p-6 rounded-lg w-[50%]">
            <AddFamilyModalContent onClose={() => setIsOpen(false)} />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
