import { PlusIcon } from "@heroicons/react/24/outline";
import { Handle, Position } from "reactflow";

const FloatNode = ({ data }) => {
  return (
    <div className=" flex justify-center min-h-[70px] w-[360px] cursor-grab">
      <Handle
        type="target"
        position={Position.Top}
        style={{ visibility: "hidden" }}
      />
      <div>
        <button className="edgebutton shadow-lg cursor-pointer">
          <PlusIcon className="h-4 w-4 flex-shrink-0 font-medium text-[#6039DB]" />
        </button>
      </div>
    </div>
  );
};
export default FloatNode;
