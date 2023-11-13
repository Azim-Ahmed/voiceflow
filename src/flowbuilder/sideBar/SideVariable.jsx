import { Fragment, useEffect, useRef, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useClickAway } from "react-use";

const SideVariable = ({
  value = "",
  onChange,
  onBlur,
  addVariable,
  manual,
}) => {
  const ref = useRef(null);
  const solutions = [
    {
      name: "First Name",
      variable: "{{First name}}",
    },
    {
      name: "Last Name",
      variable: "{{Last name}}",
    },
    {
      name: "Company name",
      variable: "{{Company name}}",
    },
    {
      name: "Headline",
      variable: "{{Headline}}",
    },
    {
      name: "Biography",
      variable: "{{Biography}}",
    },
    {
      name: "Work experience",
      variable: "{{Work experience}}",
    },
    {
      name: "Last post",
      variable: "{{Last post}}",
    },
    {
      name: "Last repost",
      variable: "{{Last repost}}",
    },
    {
      name: "Username",
      variable: "{{Username}}",
    },
    {
      name: "My value proposition",
      variable: "{{My value proposition}}",
    },
  ];
  const [query, setQuery] = useState("");
  const [openState, setOpenState] = useState(false);
  const handleStateFocus = () => setOpenState(!openState);
  const comboBtn = useRef(null);
  const renderedItems = manual ? solutions.slice(0, 3) : solutions;
  const filteredVariable =
    query === ""
      ? renderedItems
      : renderedItems.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  useEffect(() => {
    if (openState) {
      comboBtn.current?.click();
    }
  }, [openState]);
  useClickAway(ref, () => {
    handleStateFocus();
  });
  const handleInputFocus = () => comboBtn.current?.click();
  return (
    <div className="relative">
      <div onClick={handleStateFocus} className="flex items-center rounded-md">
        <button type="button" className="text-[#6039DB] bg-[#6039DB1A]">
          Variables
        </button>
      </div>
      {openState && (
        <div ref={ref} className={`absolute min-w-[200px] bottom-[245px] `}>
          <Combobox value={value} onChange={onChange}>
            <div className="relative">
              <div className="relative w-full cursor-default border overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-#C7CBD1 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Button
                  className="hidden"
                  ref={comboBtn}
                ></Combobox.Button>
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center">
                  <MagnifyingGlassIcon
                    className="h-5 w-5  text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
                <Combobox.Input
                  className="w-full h-12  py-1 border-none pr-10 text-sm leading-5 text-gray-900  focus:outline-none  focus:none"
                  displayValue={(person) => person.name}
                  onClick={handleInputFocus}
                  placeholder="Search variables"
                  onBlur={onBlur}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery("")}
              >
                <Combobox.Options className="fixedScrollbar z-30 absolute bg-white max-h-48 w-full overflow-auto   py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredVariable.length === 0 && query !== "" ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    filteredVariable.map((item, index) => (
                      <Combobox.Option
                        key={index}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-purple-600 text-white"
                              : "text-gray-900"
                          }`
                        }
                        onClick={() => {
                          addVariable(item.variable);
                          handleStateFocus();
                        }}
                        value={item}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {item.name}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? "text-white" : "text-teal-600"
                                }`}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>
      )}
    </div>
  );
};
export default SideVariable;
