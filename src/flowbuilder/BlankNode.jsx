import { Handle, Position } from "reactflow";
import Flowlayout from "./Flowlayout";

export default function BlankNode(props) {
  console.log({ props });
  return (
    <>
      {/* <Handle type="target" position={Position.Top} /> */}
      <Flowlayout nodeData={props} type="stepNode" />
      {/* <Handle type="source" position={Position.Bottom} /> */}
    </>
  );
}
