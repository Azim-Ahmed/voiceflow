// "use client";
import useNodeDelete from "@/hooks/useNodeDelete";
import LabelRenderer from "./NodeHelper/LabelRenderer";
import { TrashIcon } from "@heroicons/react/24/outline";
import { NodeTypes } from "./Utils";

const Flowlayout = (props) => {
  const { handleDelete } = useNodeDelete();
  const { data, selected } = props.nodeData;

  const PopoverHandler = () => {
    return (
      <>
        <>
          {props.nodeData.type !== NodeTypes.startNode ? (
            <span
              className="nopan nodrag"
              onClick={() => handleDelete(props.nodeData.id)}
            >
              <TrashIcon className="w-4 h-4 mr-4" />
            </span>
          ) : (
            <span className="nopan nodrag" style={{ visibility: "hidden" }}>
              a
            </span>
          )}
        </>
      </>
    );
  };
  return (
    <div
      className={` flex justify-between items-center shadow-md min-h-[70px] w-[360px] relative bg-white text-black rounded-[10px] border-solid border border-[rgba(17, 24, 39, 0.10)] ${
        selected && "border border-[#6039DB] z-50"
      }`}
    >
      <LabelRenderer props={props} data={data} />
      <PopoverHandler />
    </div>
  );
};
export default Flowlayout;
