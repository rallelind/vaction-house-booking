import { FC, ReactNode } from "react";
import Link from "next/link";

interface NavigationItemInterface {
  icon: ReactNode;
  text: string;
  href: string;
}

const NavigationItem: FC<NavigationItemInterface> = ({ icon, text, href }) => {
  return (
    <li className="mt-5 mb-5">
      <Link
        href={href}
        className="flex items-center hover:bg-orange-100 w-full p-3 rounded-lg"
      >
        {icon}
        <p className="hidden lg:block">{text}</p>
      </Link>
    </li>
  );
};

export default NavigationItem;
