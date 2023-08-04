"use client";
import { FC, useRef } from "react";
import { useState, KeyboardEvent } from "react";
import { XMarkIcon, UserIcon } from "@heroicons/react/24/outline";
import { MultiSelectInterface } from "../types";

const UserInvite: FC<MultiSelectInterface> = ({
  label,
  description,
  onChangeUsers,
}) => {
  const [items, setItems] = useState<string[]>([]);
  const [itemToAdd, setItemToAdd] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (items.includes(itemToAdd)) {
      return;
    }

    if (event.key === "Enter" && event.currentTarget.checkValidity()) {
      const newItems = [...items, itemToAdd];
      setItems(newItems);
      setItemToAdd("");
      onChangeUsers(newItems);
    }
  };

  const removeItem = (item: string) => {
    setItems((prevItems) => prevItems.filter((prevItem) => prevItem !== item));
  };

  const handleOuterInputClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      <div>
        <label className="text-md font-medium text-gray-900">{label}</label>
        {!!description && <p className="font-light">{description}</p>}
        <div
          onClick={handleOuterInputClick}
          className="mt-2 p-1 w-full cursor-text text-md rounded-md border border-gray-300 text-gray-900"
        >
          <div className="max-w-full">
            {items.map((item) => (
              <span
                key={item}
                className="w-fit inline-block align-center mr-1 h-full"
              >
                <div className="flex items-center w-fit bg-orange-100 rounded-md pr-1 pl-1">
                  <div className="flex items-center">
                    <UserIcon className="h-4 mr-2" />
                    {item}
                  </div>
                  <XMarkIcon
                    onClick={() => removeItem(item)}
                    className="h-4 ml-2"
                    role="button"
                  />
                </div>
              </span>
            ))}
            <input
              className="outline-0 bg-transparent p-1"
              onKeyDown={onKeyDown}
              value={itemToAdd}
              placeholder={items.length === 0 ? "Tilføj brugers emails..." : ""}
              onChange={(e) => setItemToAdd(e.target.value)}
              type="email"
              ref={inputRef}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInvite;
