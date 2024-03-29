import { useEffect, useState } from "react";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import UserInvite from "./UserInvite";
import { Dialog } from "@headlessui/react";
import apiWrapper from "@/lib/api-wrapper/api-wrapper";
import useFamilies from "@/hooks/families/useFamilies";
import { useParams } from "next/navigation";
import useHouse from "@/hooks/houses/useHouse";
import { Family } from "@/shared.types";

const AddFamilyModalContent = ({
  onClose,
  editFamilyMode,
  familyToEdit,
}: {
  onClose: () => void;
  editFamilyMode?: boolean;
  familyToEdit?: Family;
}) => {
  const [familyMembers, setFamilyMembers] = useState<string[]>([]);
  const [familyName, setFamilyName] = useState<string>("");

  const { id } = useParams();
  const { mutateFamilies } = useFamilies();
  const { house } = useHouse();

  const createFamily = async () => {
    const response = await apiWrapper(`house/families/${id}`, {
      method: "POST",
      body: JSON.stringify({
        family_name: familyName,
        members: familyMembers,
        house_id: Number(id),
      }),
    });

    if (response) {
      mutateFamilies().then(() => onClose());
    }
  };

  const editFamily = async () => {
    const body: Partial<Family> = {};

    body.family_name =
      familyName.length > 0 ? familyName : familyToEdit?.family_name;

    body.members =
      familyMembers.length > 0 ? familyMembers : familyToEdit?.members;

    const response = await apiWrapper(`family/${familyToEdit?.id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });

    if (response) {
      mutateFamilies().then(() => onClose());
    }
  };

  return (
    <>
      <Dialog.Title className="text-xl font-semibold">
        {editFamilyMode ? "Ændre" : "Tilføj en"} familie til {house?.address}
      </Dialog.Title>
      <Dialog.Description className="text-md font-light">
        {editFamilyMode ? "Ændre" : "Venligst tilføj"} familie medlemmer og navn
        på familien!
      </Dialog.Description>

      <div className="mt-4">
        <label className="text-md mb-2 font-medium text-gray-900 block">
          Famile kalde navn
        </label>
        <input
          className="outline-0 rounded-md bg-gray-50 border border-gray-300 text-gray-900 w-1/2 p-2"
          placeholder={"Familiens kalde navn..."}
          onChange={(e) => setFamilyName(e.target.value)}
          defaultValue={familyToEdit ? familyToEdit.family_name : ""}
        />
      </div>

      <div className="mt-4">
        <UserInvite
          users={familyToEdit?.members || []}
          label="Tilføj familie medlemmer"
          onChangeUsers={setFamilyMembers}
        />
      </div>

      <div className="mt-4 flex justify-end">
        <button
          className="p-2 mr-2 flex items-center bg-orange-100 border-solid border rounded-lg border-orange-200 hover:bg-orange-200"
          onClick={editFamilyMode ? editFamily : createFamily}
        >
          {editFamilyMode ? (
            <PencilIcon className="h-6 mr-2" />
          ) : (
            <PlusIcon className="h-6 mr-2" />
          )}
          <p className="mr-2">{editFamilyMode ? "Ændre" : "Tilføj"}</p>
        </button>
        <button className="bg-gray-50 p-2 border rounded-lg" onClick={onClose}>
          Afbryd
        </button>
      </div>
    </>
  );
};

export default AddFamilyModalContent;
