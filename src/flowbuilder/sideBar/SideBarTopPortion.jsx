import React from "react";
import { Imaged } from "../flowIcons";

const SideBarTopPortion = ({ item }) => {
  return (
    <div className="flex justify-between items-center pr-8 pl-2 pb-4 border-b mb-4">
      <div className=" h-[80] bg-white flex items-center gap-4 cursor-pointer">
        <div className="w-[58px] h-[48px] relative">
          <div className="w-8 h-8 left-0 absolute">
            {
              <Imaged
                stepType={
                  item?.data?.actionTitle
                    ? item?.data?.actionTitle
                    : item?.data?.stepType
                }
              />
            }
          </div>
        </div>
        <div className="pt-[3px] pb-[3px] justify-start items-center gap-12 flex">
          <div>
            <div className="text-gray-900 text-[16px]  font-semibold">
              {item?.data?.label}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarTopPortion;
