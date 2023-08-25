"use client";
import useUserFamily from "@/hooks/useUserFamily";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useRef, ChangeEvent } from "react";
import apiWrapper from "@/lib/api-wrapper/api-wrapper";

export default function YourFamilyPage() {
  const { userFamily, mutateUserFamily } = useUserFamily();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClickFileUpload = () => {
    fileInputRef.current?.click();
  };

  const onChangeCoverImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    const response = await apiWrapper(
      `family/${userFamily?.family.id}/cover-image`,
      {
        method: "PUT",
        body: formData,
      }
    );

    if (response) {
      mutateUserFamily();
    }
  };

  return (
    <div>
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={onChangeCoverImage}
      />
      {userFamily?.family?.cover_image && (
        <div className="h-60 w-full relative">
          <img
            src={userFamily?.family?.cover_image}
            className="h-full w-full object-cover"
          />

          <button
            onClick={handleClickFileUpload}
            className="absolute flex bottom-2 items-center border border-slate-700 right-2 bg-white pr-2 pl-2 text-sm font-semibold text-slate-700 p-1 rounded-lg"
          >
            <PhotoIcon className="h-4 mr-2" />
            Ændre cover billede
          </button>
        </div>
      )}
      <div className="p-6">
        {!userFamily?.family?.cover_image && (
          <button
            onClick={handleClickFileUpload}
            className="flex items-center border-slate-700 right-2 bg-white pr-2 pl-2 text-sm font-semibold text-slate-700 p-1 rounded-lg hover:bg-slate-100"
          >
            <PhotoIcon className="h-4 mr-2" />
            Tilføj cover billede
          </button>
        )}
        <h1 className="text-3xl font-semibold">
          Familien {userFamily?.family.family_name}
        </h1>
        <p className="text-slate-500 text-md">
          Du er en del af familien {userFamily?.family.family_name}. Herunder
          kan du se andre medlemmer af din familie og du vil kunne se opslag fra
          ture som der kun bliver delt med jeres famile!
        </p>
        <div className="mt-6">
          {userFamily?.users.map((user) => (
            <div
              key={user.id}
              className="p-4 rounded-lg bg-orange-50 w-fit flex items-center"
            >
              <img
                className="h-10 w-10 rounded-lg m-auto"
                src={user.profile_image_url}
              />
              <div className="ml-4">
                <p className="text-xl font-semibold">{user.first_name}</p>
                <p className="text-sm text-slate-700">
                  {user.email_addresses[0].email_address}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
