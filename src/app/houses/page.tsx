"use client"
import { Dialog } from "@headlessui/react";
import useUser from "@/hooks/useUser";
import GoogleSignInButton from "@/components/sign-in/google";

export default function Houses() {
  const { user, userError } = useUser();

  return (
    <div>
      <Dialog
        open={userError instanceof Error}
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
