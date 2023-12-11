import React from "react";
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from "reactflow";

const BridgeEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{ stroke: "black", strokeWidth: "1" }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          {/* <button className="edgebutton shadow-lg ">
            <PlusIcon className="h-4 w-4 flex-shrink-0 text-[#6039DB]" />
          </button> */}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
export default BridgeEdge;
