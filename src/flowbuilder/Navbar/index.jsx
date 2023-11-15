import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { toJSON } from "../Utils";

const Navbar = ({ jsonElements }) => {
  return (
    <div className="w-full h-[75px] px-6 flex justify-between items-center bg-white border border-zinc-900 border-opacity-20">
      <div className=" h-6 justify-start items-center gap-[17px] inline-flex">
        <div className="w-6 h-6">
          {" "}
          <ArrowLeftIcon className="h-5 w-5  text-black" aria-hidden="true" />
        </div>
        <p className="text-black text-base font-semibold">Voice Builder</p>
      </div>
      <div className="flex">
        <button
          className={
            " rounded-lg py-2.5 px-10  text-sm font-medium rounded-l-lg leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 bg-blue-800 shadow text-white"
          }
          onClick={() => toJSON(jsonElements)}
        >
          Extract JSON
        </button>
      </div>
      <div className="flex">
        <button
          className={
            " rounded-lg py-2.5 px-10  text-sm font-medium rounded-l-lg leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 bg-blue-800 shadow text-white"
          }
        >
          Execute
        </button>
      </div>
    </div>
  );
};

export default Navbar;
