import { Fragment, useRef, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const AutoComplete = ({ value, onChange, onBlur, renderNodes }) => {
  const [query, setQuery] = useState("");
  const comboBtn = useRef(null);
  const filteredPeople =
    query === ""
      ? renderNodes
      : renderNodes.filter((person) => {
          return person.node
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""));
        }) || [];

  console.log(
    "🚀 ~ file: AutoComplete.jsx:10 ~ AutoComplete ~ filteredPeople:",
    filteredPeople
  );
  const handleInputFocus = () => comboBtn.current?.click();

  return (
    <div className="w-full">
      <Combobox value={value} onChange={onChange}>
        <div className="relative">
          <div className="relative w-full cursor-default border overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-#C7CBD1 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Button
              className="hidden"
              ref={comboBtn}
            ></Combobox.Button>
            <Combobox.Button className="border-0 absolute inset-y-0 right-0 flex items-center">
              <ChevronDownIcon
                className="h-5 w-5  text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
            <Combobox.Input
              className="w-full h-12  py-1 pl-2 border-none pr-10 text-sm leading-5 text-gray-900 bg-white focus:outline-none  focus:none"
              displayValue={(person) => person.node}
              onClick={handleInputFocus}
              placeholder="Select a Sender"
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
            <Combobox.Options className=" z-30 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople?.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredPeople?.map((node, index) => (
                  <Combobox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-purple-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={node}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {node.node}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-purple-600"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
  );
};
export default AutoComplete;
