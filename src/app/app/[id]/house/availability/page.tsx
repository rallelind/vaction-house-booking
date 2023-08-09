"use client";
import { useState, useRef } from "react";
import Calendar from "@/components/ui/Calendar";
import { clerkClient } from "@clerk/nextjs";
import useBookings from "@/hooks/useBookings";
import apiWrapper from "@/lib/api-wrapper/api-wrapper";

export default async function Application() {
  const submitBooking = async () => {
    const body = {};

    const createdBooking = await apiWrapper("bookings", {
      method: "POST",
      body: JSON.stringify(body),
    });
  };

  return (
    <main>
      <div>
        <Calendar />
      </div>
    </main>
  );
}
