import { Combobox, Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { FC, Fragment, ReactNode, useEffect, useState } from "react";
import { usePopper } from "react-popper";
import { Button } from "./Button";
import { classNames } from "../utils";
import { FormStyles } from "./FormStyles";
import { forwardRef } from "react";
import Fuse from "fuse.js";
import { CommandGroup } from "./CommandGroup";

export interface DropdownItemProps {
  name: string;
  value: string | number;
  rightText?: string;
  icon?: ReactNode;
  noCheck?: boolean;
}

export interface FormDropdownProps {
  placeholder?: ReactNode;
  label?: string;
  disabled?: boolean;
  id: string;
  className?: string;
  items: DropdownItemProps[];
  buttonClassName?: string;
  optionsContainerClassName?: string;
  onChange: (newValue?: DropdownItemProps) => void;
  footer?: JSX.Element;
  value?: DropdownItemProps;
  position?: "bottom-start" | "top-start";
  search?: boolean;
}

export const FormDropdown: FC<FormDropdownProps> = (props) => {
  const [referenceElement, setReferenceElement] = useState<HTMLElement>();
  const [popperElement, setPopperElement] = useState<HTMLElement>();
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: props.position || "bottom-start",
  });

  // ------FOR COMMAND PALLET------
  const [isOpen, setIsOpen] = useState(true);
  const [query, setQuery] = useState("");

  const fuse = new Fuse(props.items, { includeScore: true, keys: ["name"] });

  const filteredCommands =
    query === ""
      ? props.items
      : fuse.search(query).map((res) => ({ ...res.item }));

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeydown);

    return () => {
      window.removeEventListener("keydown", onKeydown);
      setIsOpen(false);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  return (
    <div className={props.className}>
      {props.search ? (
        <>
          <div className="my-2">
            <p className="text-sm">{props.label}</p>
          </div>
          <Transition.Root show={true}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity duration-100"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Combobox
                as="div"
                className="border max-w-2xl mx-auto rounded-md relative flex flex-col"
                onChange={(command: DropdownItemProps) => {
                  console.log(command);
                  // do whatever you want with the command
                }}
              >
                <div className="flex items-center justify-between text-lg font-medium border-b border-slate-500 gap-0">
                  <div className="pl-3 pr-0">
                    <SearchIcon width={20} />
                  </div>
                  <Combobox.Input
                    as={Fragment}
                    onChange={(e) => setQuery(e.target.value)}
                  >
                    <input
                      type="text"
                      placeholder="Type a command or search..."
                      className="pr-3 pl-3 py-1 text-zinc-600 placeholder-zinc-400 text-sm w-full bg-transparent border-0 outline-none rounded-t-md font-normal hover_styles"
                    />
                  </Combobox.Input>
                </div>

                <Combobox.Options
                  className="max-h-72 overflow-y-auto flex flex-col"
                  static
                >
                  <CommandGroup commands={filteredCommands} />
                </Combobox.Options>
              </Combobox>
            </Transition.Child>
          </Transition.Root>
        </>
      ) : (
        <>
          {props.label && (
            <label
              htmlFor={props.id}
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              {props.label}
            </label>
          )}
          <Listbox
            multiple={false}
            disabled={props.disabled}
            value={props.value?.value}
            onChange={(newValues) => {
              props.onChange(
                props.items.find((item) => item.value === newValues)
              );
            }}
            /* @ts-ignore */
            ref={setReferenceElement}
          >
            <div className="relative">
              <Listbox.Button
                as={Button}
                variant="secondary"
                className={classNames(
                  props.buttonClassName ?? "",
                  FormStyles({ disabled: props.disabled, hasError: false }),
                  "!shadow-none !rounded-md "
                )}
              >
                <span className="block truncate">
                  {!props.value ? (
                    <span className="text-slate-400">{props.placeholder}</span>
                  ) : (
                    <div className="flex items-center">
                      {props.value.icon && (
                        <div className="mr-2 flex items-center">
                          {props.value.icon}
                        </div>
                      )}
                      {props.value.name}
                    </div>
                  )}
                </span>
                <span className="pointer-events-none flex flex-1 items-center justify-end pl-2">
                  <ChevronDownIcon
                    className="h-5 w-5 text-blue-600"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  className={classNames(
                    "absolute z-10 max-h-[300px] w-full min-w-fit overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
                    props.optionsContainerClassName
                      ? props.optionsContainerClassName
                      : "",
                    !!props.search
                      ? "rounded-t-0 rounded-b-md mt-0"
                      : "rounded-md mt-1"
                  )}
                  /* @ts-ignore */
                  ref={setPopperElement}
                  style={styles.popper}
                  {...attributes.popper}
                >
                  <div className="overflow-auto max-h-[250px]">
                    {props.items.map((item) => (
                      <Listbox.Option
                        key={item.value}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "bg-slate-100 text-blue-600"
                              : "text-slate-900",
                            item.noCheck ? "pl-4" : "pl-10",
                            "relative cursor-default select-none py-2 pr-4"
                          )
                        }
                        value={item.value}
                      >
                        {({ selected }) => (
                          <div className="flex">
                            {item.icon && (
                              <div className="mr-2 justify-center flex items-center">
                                {item.icon}
                              </div>
                            )}
                            <span
                              className={`block truncate ${
                                selected ? "font-semibold" : "font-medium"
                              }`}
                            >
                              {item.name}
                            </span>
                            {selected && !item.noCheck ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </div>

                  {props.footer ? props.footer : null}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </>
      )}
    </div>
  );
};

export default FormDropdown;
