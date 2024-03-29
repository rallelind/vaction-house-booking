"use client";
import UserInvite from "@/components/house-adminstrate/UserInvite";
import ItemSelect from "@/components/house-adminstrate/ItemSelect";
import {
  ArrowUpTrayIcon,
  EnvelopeIcon,
  EnvelopeOpenIcon,
  PencilIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";
import { useState, useCallback } from "react";
import Avatar from "@/components/ui/Avatar";
import AddFamilyModalContent from "@/components/house-adminstrate/AddFamilyModalContent";
import { Tab } from "@headlessui/react";
import useHouse from "@/hooks/houses/useHouse";
import useFamilies from "@/hooks/families/useFamilies";
import { useParams } from "next/navigation";
import { useDropzone } from "react-dropzone";
import apiWrapper from "@/lib/api-wrapper/api-wrapper";
import { Family } from "@/shared.types";

export default function HouseAdminstration() {
  const [isOpen, setIsOpen] = useState(false);
  const [editFamilyMode, setEditFamilyMode] = useState(false);
  const [familyToEdit, setFamilyToEdit] = useState<Family | undefined>(
    undefined
  );
  const { id } = useParams();

  const { house, houseLoading, mutateHouse } = useHouse();
  const { families, familiesLoading, familiesError } = useFamilies();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      // Do something with the files
      const formData = new FormData();

      for (const name in acceptedFiles) {
        formData.append("file", acceptedFiles[name]);
      }

      const response = await apiWrapper(`house/${id}/images`, {
        method: "POST",
        body: formData,
      });

      if (response) {
        mutateHouse();
      }
    },
    [id, mutateHouse]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (houseLoading || familiesLoading) {
    return <p>Loading...</p>;
  }

  const changeBookingType = async (type: boolean) => {
    const response = await apiWrapper(`house/${id}/admin/approval`, {
      method: "PUT",
      body: JSON.stringify({
        admin_needs_to_approve: type,
      }),
    });

    if (response) {
      mutateHouse();
    }
  };

  const changeAdminUsers = async (users: string[]) => {
    const response = await apiWrapper(`house/${id}/admin/users`, {
      method: "PUT",
      body: JSON.stringify({
        house_admins: users,
      }),
    });
    if (response) {
      mutateHouse();
    }
  };

  const openEditFamily = (family: Family) => {
    setEditFamilyMode(true);
    setIsOpen(true);
    setFamilyToEdit(family);
  };

  const onCloseModal = () => {
    setIsOpen(false);
    setFamilyToEdit(undefined);
    setEditFamilyMode(false);
  };

  console.log(families);

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl mb-4 font-normal">Adminstrer huset</h1>
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
            <div
              className={`grid-cols-5 space-y-2 lg:space-y-0 lg:grid lg:gap-3 lg:grid-rows-3 mt-4`}
            >
              <div {...getRootProps()} className="hover:cursor-pointer h-full">
                <input {...getInputProps()} />
                <div className="w-full flex flex-col font-semibold justify-center text-md border-dashed h-full bg-gray-50 border border-gray-300 rounded-lg p-2">
                  <ArrowUpTrayIcon className="h-8" />
                  <p className="text-center mt-2 font-normal text-md">
                    Upload et billede af huset
                  </p>
                </div>
              </div>
              {house?.login_images?.map((img, i) => (
                <img
                  alt="hus billede"
                  src={img}
                  className="rounded-lg h-full object-cover"
                />
              ))}
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="flex justify-between items-center mt-10 mb-4">
              <div>
                <p className="text-md font-medium text-gray-900">Familier</p>
                <p className="font-light">
                  Dette er de familier der er tilføjet til dette hus
                </p>
              </div>
              <button
                onClick={() => setIsOpen(true)}
                className="p-2 flex text-sm items-center bg-orange-100 border-solid border rounded-lg border-orange-200 hover:bg-orange-200"
              >
                <UserPlusIcon className="h-4 mr-2" />
                <p>Tilføj familie</p>
              </button>
            </div>
            <hr className="mb-8" />
            <ul>
              {families?.map(({ family, users }) => (
                <li
                  key={family.id}
                  className="border rounded-lg border-gray-200 p-2 mt-4"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="flex border-space-x-4">
                        {users?.map((user) => (
                          <Avatar
                            key={user.id}
                            avatarUrl={user.profile_image_url}
                          />
                        ))}
                      </div>
                      <p className="ml-4 font-medium">{family?.family_name}</p>
                    </div>
                    <button
                      onClick={() => openEditFamily(family)}
                      className="p-2 flex text-xs bg-orange-100 border-solid border rounded-lg border-orange-200 hover:bg-orange-200"
                    >
                      <PencilIcon className="h-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </Tab.Panel>
          <Tab.Panel>
            <div className="mt-10">
              <UserInvite
                label="Admin brugere"
                users={house?.house_admins}
                onChangeUsers={(value) => changeAdminUsers(value)}
                onDeleteUser={(value) => changeAdminUsers(value)}
                description="Tilføj admin brugere. Admin brugere kan ændre i alt adminstrativt omkring huset."
              />
            </div>
            <p className="mt-10 text-md font-medium text-gray-900">
              Booking type
            </p>
            <p className="mb-2 font-light">
              Vælg om bookinger manuelt skal accepteres af en admin eller om de
              ikke behøver at accepteres
            </p>
            <div className="flex mb-10">
              <ItemSelect
                description="Tillad åben booking, dette betyder at du ikke skal acceptere bookinger"
                title="Åben booking"
                icon={<EnvelopeOpenIcon className="h-10" />}
                selected={!house?.admin_needs_to_approve}
                onClick={() => changeBookingType(false)}
              />
              <ItemSelect
                description="Lukket booking gør at alle bookinger skal accepteres af en admin"
                title="Lukket booking"
                icon={<EnvelopeIcon className="h-10 text-center" />}
                selected={!!house?.admin_needs_to_approve}
                onClick={() => changeBookingType(true)}
              />
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      <Dialog open={isOpen} onClose={onCloseModal}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex justify-center items-start mt-20">
          <Dialog.Panel className="bg-white p-6 rounded-lg w-[50%]">
            <AddFamilyModalContent
              familyToEdit={familyToEdit}
              editFamilyMode={editFamilyMode}
              onClose={onCloseModal}
            />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
