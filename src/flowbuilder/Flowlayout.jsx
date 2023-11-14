// "use client";
import useNodeDelete from "@/hooks/useNodeDelete";
// import TailPopover from "../ui/Popover";
import LabelRenderer from "./NodeHelper/LabelRenderer";
import IconHandler from "./NodeHelper/IconHandler";

const Flowlayout = (props) => {
  const { handleDelete } = useNodeDelete();
  const { data, selected } = props.nodeData;

  const PopoverHandler = () => {
    return (
      <>
        <>
          <span style={{ visibility: "hidden" }}>del</span>
          {/* <h1>Azim</h1> */}
          {/* <TailPopover
              handleDelete={handleDelete}
              nodeData={props.nodeData}
            /> */}
        </>
      </>
    );
  };
  return (
    <div
      className={` flex justify-around items-center shadow-md min-h-[70px] w-[360px] relative bg-white text-black rounded-[10px] border-solid border border-[rgba(17, 24, 39, 0.10)] ${
        selected && "border border-[#6039DB] z-50"
      }`}
    >
      <IconHandler props={props} data={data} />
      <LabelRenderer props={props} data={data} />
      <PopoverHandler />
    </div>
  );
};
export default Flowlayout;
