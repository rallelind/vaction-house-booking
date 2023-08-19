import { FC, ReactNode } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";

interface ItemSelectInterface {
  selected: boolean;
  icon: ReactNode;
  description: string;
  title: string;
  onClick: () => void;
}

const ItemSelect: FC<ItemSelectInterface> = ({
  description,
  icon,
  selected,
  title,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${
        selected
          ? "border-solid border border-orange-200 bg-orange-100 hover:bg-orange-50"
          : "border-solid border border-grey-200 bg-gray-100 hover:bg-gray-50"
      } p-4 text-center rounded-lg max-w-[300px] mr-6 relative`}
    >
      {selected && (
        <span className="absolute right-[-10px] top-[-10px] bg-orange-200 rounded-full p-1">
          <CheckIcon className="h-4" />
        </span>
      )}
      <div className="flex items-center mb-2">
        <div className="mr-4">{icon}</div>
        <div className="text-left">
          <h1 className="text-lg font-semibold">{title}</h1>
          <p className="text-sm font-light">{description}</p>
        </div>
      </div>
    </button>
  );
};

export default ItemSelect;
