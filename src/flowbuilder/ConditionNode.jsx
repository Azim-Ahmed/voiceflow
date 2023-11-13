import { Handle, Position } from "reactflow";
import Flowlayout from "./Flowlayout";

const ConditionNode = (props) => {
  return (
    <>
      <Handle
        type="target"
        style={{ visibility: "hidden" }}
        position={Position.Top}
      />
      <Flowlayout nodeData={props} type="condition" />
      <Handle
        type="source"
        style={{ visibility: "hidden" }}
        position={Position.Bottom}
      />
    </>
  );
};
export default ConditionNode;
