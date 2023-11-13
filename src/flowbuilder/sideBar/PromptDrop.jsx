import { Fragment, useRef, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

const PromptDrop = ({ setContent }) => {
  const t = useTranslations("common_v2");
  const solutions = [
    {
      name: t("dropdown_casual"),
      value: t("dropdown_value_casual"),
    },
    {
      name: t("dropdown_formal"),
      value: t("dropdown_value_formal"),
    },
    {
      name: t("dropdown_poetic"),
      value: t("dropdown_value_poetic"),
    },
    {
      name: t("dropdown_sales"),
      value: t("dropdown_value_sales"),
    },
  ];
  const [current, setCurrent] = useState(solutions[0]);
  const [query, setQuery] = useState("");
  const comboBtn = useRef(null);

  const filteredPeople =
    query === ""
      ? solutions
      : solutions.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  const handleInputFocus = () => comboBtn.current?.click();
  return (
    <div className="w-[50%] mb-8">
      <Combobox value={current}>
        <div className="relative">
          <div className="relative w-full cursor-default border overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-#C7CBD1 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Button
              className="hidden"
              ref={comboBtn}
            ></Combobox.Button>
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center">
              <ChevronDownIcon
                className="h-5 w-5  text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
            <Combobox.Input
              className="w-full h-12  py-1 border-none pr-10 text-sm leading-5 text-gray-900  focus:outline-none  focus:none"
              displayValue={(person) => current.name}
              onClick={handleInputFocus}
              placeholder="Select a Sender"
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
              {filteredPeople.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((item, index) => (
                  <Combobox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-purple-600 text-white" : "text-gray-900"
                      }`
                    }
                    onClick={() => {
                      setCurrent(item);
                      setContent(item.value);
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
export default PromptDrop;
