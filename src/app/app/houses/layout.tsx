"use client"
import useUser from "@/hooks/useUser"
import Avatar from "@/components/ui/Avatar";
import { useAuth, useSession } from "@clerk/nextjs";

export default function Layout({children}: {
  children: React.ReactNode
}) {

    const { session } = useSession()

    const { firstName, primaryEmailAddress, imageUrl } = session?.user || {}
    
    return (
        <div>
            <header className="border-b p-4">
                <div className="flex items-center hover:bg-orange-50 p-2 w-fit rounded-lg cursor-pointer">
                    <Avatar avatarUrl={imageUrl} />
                    <div className="ml-4">
                        <p className="font-semibold text-md">{firstName}</p>
                        <p className="font-light text-sm">{primaryEmailAddress?.emailAddress}</p>
                    </div>
                </div>
            </header>
            <div className="p-20">{children}</div>
        </div>
    )
}