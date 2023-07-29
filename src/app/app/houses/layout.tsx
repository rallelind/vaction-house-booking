"use client"
import useUser from "@/hooks/useUser"
import Avatar from "@/components/ui/Avatar";
import useHouse from "@/hooks/useHouse";

export default function Layout({children}: {
  children: React.ReactNode
}) {

    const { user } = useUser();
    
    return (
        <div>
            <header className="border-b p-6">
                <div className="flex items-center hover:bg-orange-50 p-2 w-fit rounded-lg cursor-pointer">
                    <Avatar avatarUrl={user?.picture} />
                    <div className="ml-4">
                        <p className="font-semibold text-md">{user?.name}</p>
                        <p className="font-light text-sm">{user?.email}</p>
                    </div>
                </div>
            </header>
            <div className="p-20">{children}</div>
        </div>
    )
}