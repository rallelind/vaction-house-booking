"use client";
import useUserFamily from "@/hooks/useUserFamily";
import { PhotoIcon } from "@heroicons/react/24/outline";

export default function YourFamilyPage() {
  const { userFamily } = useUserFamily();

  return (
    <div>
      <div className="h-60 w-full relative">
        <img src="/natur_et.jpg" className="h-full w-full object-cover" />
        <button className="absolute flex bottom-2 items-center border border-slate-700 right-2 bg-white pr-2 pl-2 text-sm font-semibold text-slate-700 p-1 rounded-lg">
          <PhotoIcon className="h-4 mr-2" />
          Ændre cover billede
        </button>
      </div>
      <div className="p-6">
        <h1 className="text-3xl font-semibold">
          Familien {userFamily?.family.family_name}
        </h1>
        <p className="text-slate-500 text-md">
          Du er en del af familien {userFamily?.family.family_name}. Herunder
          kan du se andre medlemmer af din familie og du vil kunne se opslag fra
          ture som der kun bliver delt med jeres famile!
        </p>
      </div>
      <div></div>
    </div>
  );
}
