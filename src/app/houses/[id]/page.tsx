"use client";
import { useEffect, useRef, useMemo, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function HouseCreation() {
  const [inputQuery, setInputQuery] = useState("");
  const [predictions, setPredictions] = useState<
    [] | google.maps.places.AutocompletePrediction[]
  >([]);

  const autoCompleteServiceRef =
    useRef<null | google.maps.places.AutocompleteService>(null);

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

    const autoCompleteOptions = {
      types: ["geocode"],
      componentRestriction: { country: "dk" },
      fields: ["name", "place_id", "geometry"],
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
        new Map(document.getElementById("map") as HTMLElement, mapOptions);

        const { AutocompleteService } = await loader.importLibrary("places");

        let autoCompleteService = new AutocompleteService();

        autoCompleteServiceRef.current = autoCompleteService;
      })
      .catch((e) => {
        // do something
      });
  }, []);

  return (
    <div>
      <div id="map" className="h-96 rounded-lg"></div>
      <input id="address" onChange={(e) => setInputQuery(e.target.value)} />
    </div>
  );
}
