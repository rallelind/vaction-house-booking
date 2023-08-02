"use client";
import useHouse from "@/hooks/useHouse";
import { useParams } from "next/navigation";

export default function Application() {
  const { id } = useParams();
  const { house, houseError, houseLoading } = useHouse(id);

  return (
    <div>

    </div>
  );
}
