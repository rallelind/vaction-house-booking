"use client";
import { useEffect, useRef, useMemo, useState } from "react";
import { Combobox } from "@headlessui/react";
import { Loader } from "@googlemaps/js-api-loader";
import { MapPinIcon, HomeIcon } from "@heroicons/react/24/outline";

export default function HouseCreation() {
  const [inputQuery, setInputQuery] = useState("");
  const [predictions, setPredictions] = useState<
    [] | google.maps.places.AutocompletePrediction[]
  >([]);

  const autoCompleteServiceRef =
    useRef<null | google.maps.places.AutocompleteService>(null);

  const mapsRef = useRef<null | google.maps.Map>(null);

  useEffect(() => {
    autoCompleteServiceRef.current
      ?.getPlacePredictions({ input: inputQuery })
      .then(({ predictions }) => setPredictions(predictions))
      .catch(() => setPredictions([]));
  }, [inputQuery]);

  useEffect(() => {
    const mapOptions = {
      center: {
        lat: 0,
        lng: 0,
      },
      zoom: 10,
      disableDefaultUI: true,
    };

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
      version: "weekly",
      libraries: ["places"],
    });

    loader
      .importLibrary("maps")
      .then(async ({ Map }) => {
        const map = new Map(document.getElementById("map") as HTMLElement, mapOptions);

        const { AutocompleteService } = await loader.importLibrary("places");

        let autoCompleteService = new AutocompleteService();

        autoCompleteServiceRef.current = autoCompleteService;
        mapsRef.current = map;
      })
      .catch((e) => {
        // do something
      });
  }, []);

  console.log(predictions);

  return (
    <div>
      <div className="relative w-[600px] m-auto">
        <div id="map" className="h-[500px] rounded-lg"></div>
        <div className="absolute top-0 p-6 w-full">
          <Combobox>
            {({ open }) => (
              <>
                <div
                  className={`flex ${
                    !open ? "rounded-lg" : "rounded-t-lg"
                  } p-4 w-full bg-white cursor-text`}
                >
                  <div className="bg-orange-100 border-orange-200 p-2 rounded-lg border">
                    <MapPinIcon className="h-6" />
                  </div>
                  <Combobox.Input
                    className="focus:outline-none w-full ml-4"
                    onChange={(e) => setInputQuery(e.target.value)}
                  />
                </div>
                <Combobox.Options
                  className={`bg-white rounded-b-lg max-h-60 overflow-auto`}
                >
                  {predictions.map((prediction) => (
                    <Combobox.Option
                      className="p-4 flex items-center hover:bg-orange-50"
                      value={prediction.description}
                      key={prediction.place_id}
                    >
                      <div className="bg-orange-100 rounded-lg p-2 border-orange-200 border">
                        <HomeIcon className="h-6" />
                      </div>
                      <p className="ml-4">{prediction.description}</p>
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </>
            )}
          </Combobox>
        </div>
      </div>
    </div>
  );
}
