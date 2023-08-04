"use client";
import { useEffect, useRef, useMemo, useState } from "react";
import { Combobox } from "@headlessui/react";
import { Loader } from "@googlemaps/js-api-loader";
import { MapPinIcon, HomeIcon } from "@heroicons/react/24/outline";
import UserInvite from "@/components/house-adminstrate/UserInvite";
import apiWrapper from "@/lib/api-wrapper/api-wrapper";
import { useRouter } from "next/navigation";
import useHouses from "@/hooks/useHouses";

export default function HouseCreation() {
  const [inputQuery, setInputQuery] = useState("");
  const [predictions, setPredictions] = useState<
    [] | google.maps.places.AutocompletePrediction[]
  >([]);

  const { push } = useRouter()

  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [selectedAddressError, setSelectedAddressError] =
    useState<boolean>(false);

  const [houseAdmins, setHouseAdmins] = useState<string[]>([]);
  const [houseName, setHouseName] = useState<string>("");

  const autoCompleteServiceRef =
    useRef<null | google.maps.places.AutocompleteService>(null);

  const mapsRef = useRef<null | google.maps.Map>(null);

  const markerRef = useRef<null | google.maps.Marker>(null);

  const placeServiceRef = useRef<null | google.maps.places.PlacesService>(null);

  const { mutateHouses } = useHouses()

  useEffect(() => {
    autoCompleteServiceRef.current
      ?.getPlacePredictions({
        input: inputQuery,
        componentRestrictions: { country: "dk" },
        types: ["address"],
      })
      .then(({ predictions }) => setPredictions(predictions))
      .catch(() => setPredictions([]));
  }, [inputQuery]);

  useEffect(() => {
    const mapOptions: google.maps.MapOptions = {
      center: {
        lat: 0,
        lng: 0,
      },
      zoom: 12,
      disableDefaultUI: true,
      gestureHandling: "none",
      keyboardShortcuts: false,
      styles: [
        {
          featureType: "poi",
          stylers: [{ visibility: "off" }], // Hide points of interest (business places, etc.)
        },
        {
          featureType: "transit",
          stylers: [{ visibility: "off" }], // Hide public transport
        },
      ],
    };

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
      version: "weekly",
      libraries: ["places"],
    });

    loader
      .importLibrary("maps")
      .then(async ({ Map }) => {
        const map = new Map(
          document.getElementById("map") as HTMLElement,
          mapOptions
        );

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            map.setCenter(pos);
          });
        }

        const { Marker } = await loader.importLibrary("marker");

        const { AutocompleteService, PlacesService } =
          await loader.importLibrary("places");

        const autoCompleteService = new AutocompleteService();
        const placesService = new PlacesService(document.createElement("div"));
        const marker = new Marker({
          icon: "/map-marker.svg",
          map,
        });

        markerRef.current = marker;
        autoCompleteServiceRef.current = autoCompleteService;
        mapsRef.current = map;
        placeServiceRef.current = placesService;
      })
      .catch((e) => {
        // do something
        console.log(e);
      });
  }, []);

  const handleChangeAddress = async (placeId: string) => {
    placeServiceRef.current?.getDetails({ placeId }, (placeDetails) => {
      const location = placeDetails?.geometry?.location;

      if (!location) return;

      const lat = location?.lat();
      const lng = location?.lng();

      const pos = {
        lat,
        lng,
      };

      markerRef.current?.setPosition(pos);
      mapsRef.current?.setCenter(pos);
      mapsRef.current?.setZoom(16);

      if (placeDetails.types?.includes("premise")) {
        setSelectedAddress(placeDetails.name as string);
        setSelectedAddressError(false);
        return;
      } else {
        setSelectedAddressError(true);
        return;
      }
    });
  };

  const submitHouse = async () => {
    try {
      const body = {
        address: selectedAddress,
        house_name: houseName,
        house_admins: houseAdmins,
      };

      await apiWrapper("house", {
        method: "POST",
        body: JSON.stringify(body),
      });

      mutateHouses()
      push("/app/houses")
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="mr-4 w-full flex flex-col">
        {selectedAddressError && (
          <div className="p-4 mb-6 rounded-lg text-center w-full border border-yellow-300 text-yellow-800 bg-yellow-50 font-medium">
            <p>Venligst vælg en præcis hus addresse</p>
          </div>
        )}
        <label className="text-md font-medium text-gray-900">
          Vælg en addresse
        </label>
        <div className="relative mt-2">
          <Combobox>
            {({ open }) => (
              <>
                <div
                  className={`flex border ${
                    !open || predictions.length === 0
                      ? "rounded-lg"
                      : "rounded-t-lg border-b-0"
                  } p-2 w-full cursor-text border-gray-300`}
                >
                  <div className="bg-orange-100 border-orange-200 p-1 rounded-lg border">
                    <MapPinIcon className="h-4" />
                  </div>
                  <Combobox.Input
                    className="focus:outline-none w-full ml-2 p-0 "
                    onChange={(e) => setInputQuery(e.target.value)}
                    placeholder="Indtast din adresse"
                  />
                </div>
                <Combobox.Options
                  className={`bg-white rounded-b-lg border-gray-300 border max-h-60 overflow-auto absolute w-full`}
                  onChange={(e) => console.log(e)}
                >
                  {predictions.map((prediction) => (
                    <Combobox.Option
                      className="p-2 flex items-center hover:bg-orange-50"
                      value={prediction.description}
                      key={prediction.place_id}
                      onClick={() => handleChangeAddress(prediction.place_id)}
                    >
                      <div className="bg-orange-100 rounded-lg p-1 border-orange-200 border">
                        <HomeIcon className="h-4" />
                      </div>
                      <p className="ml-4">{prediction.description}</p>
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </>
            )}
          </Combobox>
        </div>
        <div className="mt-6">
          <UserInvite
            label="Tilføj hus admins"
            onChangeUsers={setHouseAdmins}
          />
        </div>
        <div className="mt-6">
          <label className="text-md font-medium text-gray-900">
            Navngiv huset
          </label>
          <input
            className="block w-full p-2 border mt-2 border-gray-300 rounded-lg"
            placeholder="Vælg et navn til dit hus..."
            onChange={(e) => setHouseName(e.target.value)}
            value={houseName}
          />
        </div>
        <button
          onClick={submitHouse}
          className="bg-orange-50 mt-12 p-2 pr-6 pl-6 font-normal rounded-lg border border-orange-200"
        >
          Lav hus
        </button>
      </div>
      <div className="relative w-full">
        <div id="map" className="h-[500px] rounded-lg"></div>
      </div>
    </div>
  );
}
