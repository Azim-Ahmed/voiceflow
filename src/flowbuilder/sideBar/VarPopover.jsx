import { Popover, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import SideVariable from "./SideVariable";
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
const VarPopover = ({ addVariable }) => {
  const [openState, setOpenState] = useState(false);
  const handleStateFocus = () => setOpenState(true);
  return (
    <div className="">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              onClick={() => handleStateFocus()}
              className="py-2 px-2 border border-[#ccc] hover:border-[#6039DB] text-[#6039DB] bg-[#6039DB1A] font-semibold rounded hover:bg-violet-100 hover:outline-none focus:outline-none focus:none focus:none focus:none"
            >
              Variables
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                className={`absolute bottom-[50px] ${
                  open && "z-10"
                } mt-3  min-w-[250px]  shadow-lg -translate-x-1/2 transform px-4 sm:px-0`}
              >
                <SideVariable
                  handleStateFocus={handleStateFocus}
                  setOpenState={setOpenState}
                  openState={openState}
                  addVariable={addVariable}
                  solutions={solutions}
                />
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};
export default VarPopover;
