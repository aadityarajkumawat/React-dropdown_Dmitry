import React from "react";
import clsx from "clsx";
import { Combobox } from "@headlessui/react";
import { DropdownItemProps } from "./FormDropdown";

interface CommandGroupProps {
  commands: Array<DropdownItemProps>;
}

export const CommandGroup = ({ commands }: CommandGroupProps) => {
  return (
    <React.Fragment>
      {commands.map((command, idx) => (
        <Combobox.Option key={idx} value={command}>
          {({ active }) => (
            <div
              className={clsx(
                "w-full h-[46px] text-black flex items-center hover:bg-primary/40 cursor-default transition-colors duration-100 ease-in",
                active ? "bg-zinc-200" : "bg-white"
              )}
            >
              <div className="px-3.5 flex items-center w-full">
                {command.icon && (
                  <div className="mr-3 flex items-center justify-center w-4">
                    {command.icon}
                  </div>
                )}
                <span className="text-sm text-left flex flex-auto">
                  {command.name}
                </span>
                <span className="text-[10px]">{command.rightText}</span>
              </div>
            </div>
          )}
        </Combobox.Option>
      ))}
    </React.Fragment>
  );
};
