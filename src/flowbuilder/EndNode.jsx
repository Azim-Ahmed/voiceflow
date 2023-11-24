import { Handle, Position } from "reactflow";
import Flowlayout from "./Flowlayout";
export default function EndNode(props) {
  return (
    <>
      <Flowlayout nodeData={props} type="EndNode" />
      <Handle
        // style={{ visibility: "hidden" }}
        type="target"
        position={Position.Top}
      />
    </>
  );
}
