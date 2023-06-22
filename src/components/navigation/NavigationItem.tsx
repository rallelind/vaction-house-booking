import { FC } from "react";
import Link from "next/link";
import { NavigationItemInterface } from "../types";

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
