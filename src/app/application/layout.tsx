import { HomeModernIcon, MapIcon, CalendarDaysIcon, UsersIcon, UserIcon } from "@heroicons/react/24/outline"
import { ReactNode } from "react";
import Link from 'next/link';

export default function ApplicationLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <aside className="fixed top-0 left-0 h-screen lg:w-64 md:w-32 bg-orange-50 p-4">
                <h1 className="text-2xl font-bold">Havklitvej 60</h1>
                <ul>
                    <li className="mt-5 mb-5">
                        <Link href="/application/bookings" className="flex font-semibold items-center hover:bg-orange-100 w-full p-3 rounded-lg">
                            <HomeModernIcon className="h-6 mr-3" />
                            Bookinger
                        </Link>
                    </li>
                    <li className="mt-5 mb-5">
                        <Link href="/application/bookings" className="flex font-semibold items-center hover:bg-orange-100 w-full p-3 rounded-lg">
                            <MapIcon className="h-6 mr-3" />
                            Dine ture
                        </Link>
                    </li>
                    <li className="mt-5 mb-5">
                        <Link href="/application/bookings" className="flex font-semibold items-center hover:bg-orange-100 w-full p-3 rounded-lg">
                            <CalendarDaysIcon className="h-6 mr-3" />
                            Tjek ledighed
                        </Link>
                    </li>
                    <li className="mt-5 mb-5">
                        <Link href="/application/bookings" className="flex font-semibold items-center hover:bg-orange-100 w-full p-3 rounded-lg">
                            <UsersIcon className="h-6 mr-3" />
                            Tilknyttet familie
                        </Link>
                    </li>
                </ul>
                <div className="fixed bottom-4">
                    <div className="flex items-center">
                        <div className=" bg-amber-100 p-2 mr-3 rounded-lg border-2 border-black">
                            <UserIcon className="h-6" />
                        </div>
                        <div>
                            <p>navn</p>
                            <p>email.test@test.com</p>
                        </div>
                    </div>
                </div>
            </aside>
            {children}
        </div>
    )
}