"use client";
import UserInvite from "@/components/house-adminstrate/UserInvite";
import ItemSelect from "@/components/house-adminstrate/ItemSelect";
import {
  EnvelopeIcon,
  EnvelopeOpenIcon,
  PencilIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import Avatar from "@/components/ui/Avatar";
import AddFamilyModalContent from "@/components/house-adminstrate/AddFamilyModalContent";
import ImageUpload from "@/components/house-adminstrate/ImageUpload";
import { Tab } from "@headlessui/react";

export default function HouseAdminstration() {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <Tab.Group>
        <Tab.List className="bg-orange-50 p-2 rounded-lg">
          <Tab className="mr-4 ui-selected:bg-orange-200 ui-selected:font-medium pr-2 pl-2 rounded-lg focus:outline-none">
            Billeder
          </Tab>
          <Tab className="mr-4 ui-selected:bg-orange-200 ui-selected:font-medium pr-2 pl-2 rounded-lg focus:outline-none">
            Familier
          </Tab>
          <Tab className="mr-4 ui-selected:bg-orange-200 ui-selected:font-medium pr-2 pl-2 rounded-lg focus:outline-none">
            Indstillinger
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div className="grid mt-4 grid-flow-col grid-cols-3 mb-6">
              <ImageUpload />
              <ImageUpload />
              <ImageUpload />
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-md font-medium text-gray-900">Familier</p>
                <p className="font-light">
                  Dette er de familier der er tilføjet til dette hus
                </p>
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
          </Tab.Panel>
          <Tab.Panel>
            <p className="mt-6 text-md font-medium text-gray-900">
              Booking type
            </p>
            <p className="mb-2 font-light">
              Vælg om bookinger manuelt skal accepteres af en admin eller om de
              ikke behøver at accepteres
            </p>
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
            <UserInvite
              label="Admin brugere"
              description="Tilføj admin brugere. Admin brugere kan ændre i alt adminstrativt omkring huset."
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0" aria-hidden="true" />
        <div className="fixed inset-0 flex justify-center items-start mt-20">
          <Dialog.Panel className="bg-white p-6 rounded-lg w-[50%]">
            <AddFamilyModalContent onClose={() => setIsOpen(false)} />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
