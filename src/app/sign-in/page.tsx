"use client"
import Image from "next/image";

export default function SignIn() {

    const handleGoogleLogin = async () => {
        await fetch("http://localhost:3000/auth/google", {
            method: "GET",
            mode: "no-cors"
        })
    }

  return (
    <main className="flex h-screen">
      <div className="lg:w-1/2 p-5 flex items-center">
        <div className="p-5">
          <h1 className="text-4xl font-bold mb-5 text-center">
            Velkommen til havklitvej 60
          </h1>
          <p className="font-light text-center">
            Log in med google for at komme videre. Vi deler ikke data med google
            men bruger udelukkende google til at logge ind med!
          </p>
          <button
            type="button"
            className="text-white w-full mt-10  bg-black hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between"
            onClick={handleGoogleLogin}
          >
            <svg
              className="mr-2 -ml-1 w-4 h-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Log in med google
            <div></div>
          </button>
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
