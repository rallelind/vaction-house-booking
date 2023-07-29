"use client";
import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

export default function Page() {
  const { getToken } = useAuth();

  const getHouse = async () => {
    const token = await getToken();

    console.log(token);

    fetch("http://localhost:8080/house/2", {
      headers: { Authorization: `Bearer ${token}` },
      method: "GET",
    }).then((res) =>
      console.log(res.json().then((final) => console.log(final)))
    );
  };

  useEffect(() => {
    getHouse();
  }, []);

  return (
    <>
      <p>hello world</p>
    </>
  );
}
