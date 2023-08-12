import { getCookie } from "cookies-next";

export default async function apiWrapper<T>(
  endpoint: string,
  request: RequestInit
): Promise<T> {
  const sessionCookie = getCookie("__session");

  try {
    const reqHeaders = new Headers(request.headers);

    if (!reqHeaders.has("Authorization")) {
      reqHeaders.set("Authorization", `Bearer ${sessionCookie}`);
    }

    request.headers = reqHeaders;
    
    console.log(request)

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`,
      request
    );

    if (response.ok) {
      return await response.json();
    } else {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  } catch (error) {
    throw error;
  }
}
