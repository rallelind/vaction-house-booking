"use client";
import {
  HomeModernIcon,
  MapIcon,
  CalendarDaysIcon,
  UsersIcon,
  UserIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import NavigationItem from "@/components/navigation/NavigationItem";
import Avatar from "@/components/ui/Avatar";
import { useSession, useUser } from "@clerk/nextjs";
import useHouse from "@/hooks/useHouse";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { HousesLoader } from "../../houses/page";
import { Dialog } from "@headlessui/react";
import apiWrapper from "@/lib/api-wrapper/api-wrapper";
import usePaymentMethods from "@/hooks/payments/usePaymentMethods";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";

const CardIcon = ({ cardType }) => {
  if (cardType === "visa") {
    return <FaCcVisa fontSize="30px" />;
  }

  if (cardType === "mastercard") {
    return <FaCcMastercard fontSize="30px" />;
  }
};

export default function ApplicationLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { session } = useSession();
  const { paymentMethods, paymentMethodsLoading, mutatePaymentMethods } =
    usePaymentMethods();
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState<
    "profile" | "payments"
  >("profile");

  const { push } = useRouter();
  const searchParams = useSearchParams();

  console.log(paymentMethods);
  const paymentSessionId = searchParams.get("session_id");

  useEffect(() => {
    if (paymentSessionId) {
      setSelectedSetting("payments");
      setProfileOpen(true);
    }
  }, [paymentSessionId]);

  const { house, houseLoading, houseError } = useHouse();

  if (houseLoading || paymentMethodsLoading) {
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

  const redirectUrl = window.location.href;

  const createSession = async () => {
    const response = await apiWrapper("payment/card/session", {
      method: "POST",
      body: JSON.stringify({ redirectUrl }),
    });

    if (response) {
      push(response);
    }
  };

  const setPrimaryPaymentMethod = async (paymentMethodId: string) => {
    const response = await apiWrapper(`payment/methods/${paymentMethodId}`, {
      method: "PUT",
    });

    if (response) {
      mutatePaymentMethods();
    }
  };

  const deletePrimaryPaymentMethod = async (paymentMethodId: string) => {
    const response = await apiWrapper(`payment/methods/${paymentMethodId}`, {
      method: "DELETE",
    });

    if (response) {
      mutatePaymentMethods();
    }
  };

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
                className={`mt-4 text-left text-sm font-medium rounded-lg flex items-center p-1 pr-2 ${
                  selectedSetting === "profile" ? "bg-orange-100" : "unset"
                }`}
              >
                Profil
              </button>
              <button
                onClick={() => setSelectedSetting("payments")}
                className={`mt-4 text-left text-sm font-medium flex items-center rounded-lg p-1 pr-2 ${
                  selectedSetting === "payments" ? "bg-orange-100" : "unset"
                }`}
              >
                <CreditCardIcon className="h-4 mr-2" /> Betaling
              </button>
            </div>
            <div className="p-6 w-full">
              {selectedSetting === "profile" && (
                <>
                  <Dialog.Title className="flex items-center text-xl">
                    <UserIcon className="h-4 mr-4" /> Profil indstillinger
                  </Dialog.Title>
                  <Dialog.Description className="text-slate-500">
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
              {selectedSetting === "payments" && (
                <>
                  <Dialog.Title className="flex items-center text-xl">
                    Betaling metoder
                  </Dialog.Title>
                  <Dialog.Description className="text-slate-500 mb-4">
                    Adminstrer din profils betalings metoder
                  </Dialog.Description>
                  <div className="flex flex-col gap-4">
                    {paymentMethods.map((paymentMethod) => (
                      <div
                        key={paymentMethod.id}
                        className="p-2 pr-4 pl-4 bg-orange-50 rounded-lg flex justify-between"
                      >
                        <div className="flex items-start">
                          <CardIcon cardType={paymentMethod.card.brand} />
                          <div className="ml-4">
                            <p className="capitalize inline text-sm font-medium">
                              {paymentMethod.card.brand}{" "}
                            </p>
                            <p className="inline text-sm font-medium">
                              {` slutter på ${paymentMethod.card.last4}`}
                            </p>
                            <p className="text-sm text-slate-700">
                              Udløber {paymentMethod.card.exp_month}/
                              {paymentMethod.card.exp_year}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {paymentMethod.customer.invoice_settings
                            .default_payment_method.id === paymentMethod.id ? (
                            <p className="bg-orange-200 rounded-lg p-1 pr-2 pl-2 text-sm font-medium">
                              Primære
                            </p>
                          ) : (
                            <button
                              onClick={() =>
                                setPrimaryPaymentMethod(paymentMethod.id)
                              }
                              className="text-orange-500 font-medium text-sm"
                            >
                              Brug som primær
                            </button>
                          )}
                          <button
                            onClick={() =>
                              deletePrimaryPaymentMethod(paymentMethod.id)
                            }
                          >
                            <TrashIcon className="h-6 text-red-800 ml-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      className="bg-orange-400 w-fit m-auto p-1 pr-4 pl-4 border-orange-500 border rounded-lg shadow-md font-medium text-white text-sm"
                      onClick={createSession}
                    >
                      Tilføj betalingsmetode
                    </button>
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
