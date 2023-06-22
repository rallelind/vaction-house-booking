import { ReactNode } from "react";

export interface NavigationItemInterface {
  icon: ReactNode;
  text: string;
  href: string;
}

export interface MultiSelectInterface {
  label: string;
}
