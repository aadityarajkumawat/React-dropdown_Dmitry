import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import Fuse from "fuse.js";
import { FC, Fragment, ReactNode, useState } from "react";
import { usePopper } from "react-popper";
import { classNames } from "../utils";
import { Button } from "./Button";
import { FormStyles } from "./FormStyles";

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
  const [query, setQuery] = useState("");
  const [referenceElement, setReferenceElement] = useState<HTMLElement>();
  const [popperElement, setPopperElement] = useState<HTMLElement>();
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: props.position || "bottom-start",
  });

  if (props.items.length === 0) {
    throw new Error("FormDropdown must have at least one item");
  }
  const items = props.items.slice(1);

  const fuse = new Fuse(items, { includeScore: true, keys: ["name"] });

  const filteredResults =
    query === ""
      ? props.items
      : fuse.search(query).map((res) => ({ ...res.item }));

  return (
    <div className={props.className}>
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
          onChange={(newValue) => {
            props.onChange(props.items.find((item) => item.value === newValue));
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
                  "absolute z-10 mt-2 max-h-[300px] w-full min-w-fit overflow-auto bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm rounded-t-md",
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
                {props.search && (
                  <div className="flex items-center border-b rounded-t-md shadow-none">
                    <div className="px-3">
                      <SearchIcon className="text-zinc-500" width={20} />
                    </div>
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      type="text"
                      className="w-full border-none outline-none shadow-none focus-styles px-0 pl-0.5 rounded-tr-md"
                    />
                  </div>
                )}
                <div className="overflow-auto max-h-[250px]">
                  {filteredResults.map((item) => (
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
    </div>
  );
};

export default FormDropdown;
