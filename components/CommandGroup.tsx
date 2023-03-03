import React from "react";
import clsx from "clsx";
import { Combobox } from "@headlessui/react";

export const CommandGroup = ({ commands, group }: any) => {
  return (
    <React.Fragment>
      {/* only show the header when there are commands belonging to this group */}
      {commands.filter((command: any) => command.group === group).length >=
        1 && (
        <div className="flex items-center h-6 flex-shrink-0 bg-accent/50">
          <span className="text-xs text-zinc-600 px-3.5 font-bold">
            {group}
          </span>
        </div>
      )}
      {commands
        .filter((command: any) => command.group === group)
        .map((command: any, idx: any) => (
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
                  <span className="text-[10px]">{command.shortcut}</span>
                </div>
              </div>
            )}
          </Combobox.Option>
        ))}
    </React.Fragment>
  );
};
