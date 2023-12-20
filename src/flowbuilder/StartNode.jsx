import { Handle, Position } from "reactflow";
import Flowlayout from "./Flowlayout";
export default function StartNode(props) {
  return (
    <>
      <Flowlayout nodeData={props} type="startNode" />
      <Handle
        type="source"
        position={Position.Bottom}
      />
    </>
  );
}
