import { Handle, Position } from "reactflow";
import Flowlayout from "./Flowlayout";

export default function StepNode(props) {
  return (
    <>
      <Handle
        type="target"
        // style={{ visibility: "hidden" }}
        position={Position.Top}
      />
      <Flowlayout nodeData={props} type="stepNode" />
      <Handle
        type="source"
        // style={{ visibility: "hidden" }}
        position={Position.Bottom}
      />
    </>
  );
}
