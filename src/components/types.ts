import { ReactNode } from "react";

export interface NavigationItemInterface {
  icon: ReactNode;
  text: string;
  href: string;
}

export interface MultiSelectInterface {
  label: string;
  description?: string;
  onChangeUsers: (value: string[]) => void;
}

export interface ItemSelectInterface {
    selected: boolean,
    icon: ReactNode,
    description: string,
    title: string,
}
