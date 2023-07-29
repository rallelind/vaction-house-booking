"use client";
import Image from "next/image";
import GoogleSignInButton from "@/components/sign-in/Google";

export default function SignIn() {

  return (
    <main className="flex h-screen bg-orange-100">
      <div className="lg:w-1/2 p-5 flex items-center">
        <div className="p-5">
          <h1 className="text-4xl font-bold mb-5 text-center">
            Velkommen til havklitvej 60
          </h1>
          <p className="font-light text-center">
            Log in med google for at komme videre. Vi deler ikke data med google
            men bruger udelukkende google til at logge ind med!
          </p>
          <GoogleSignInButton />
        </div>
      </div>
      <div className="lg:w-2/3">
        <div className="relative h-full">
          <Image
            src="/huset.jpg"
            width={500}
            height={500}
            alt="billede af huset"
            className="absolute top-3 right-3 rounded-lg"
          />
          <Image
            src="/natur_et.jpg"
            width={400}
            height={400}
            alt="billede af natur"
            className="absolute top-1/2 left-1/4 rounded-lg transform -translate-x-1/2 -translate-y-1/2 z-10"
          />
          <Image
            src="/natur_to.jpg"
            width={450}
            height={450}
            alt="billede mere af naturen"
            className="absolute bottom-3 right-3 rounded-lg border-white-4 z-5"
          />
        </div>
      </div>
    </main>
  );
}
