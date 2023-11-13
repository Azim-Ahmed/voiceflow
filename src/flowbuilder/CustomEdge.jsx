import { PlusIcon } from "@heroicons/react/24/outline";
import React, { FC } from "react";
import {
  EdgeProps,
  getBezierPath,
  EdgeLabelRenderer,
  BaseEdge,
  getSmoothStepPath,
} from "reactflow";

// this is a little helper component to render the actual edge label
function EdgeLabel({ transform, label }) {
  return (
    <div
      style={{
        fontSize: 12,
        transform,
      }}
      className={`nodrag nopan absolute items-center flex justify-center font-bold rounded-[14px] w-9 h-4 ${
        label === "Yes"
          ? "text-green-500 bg-[#96D9AA]"
          : "text-[#C73131] bg-[#F1CCCC]"
      }`}
    >
      {label}
    </div>
  );
}

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        {data.condition && (
          <EdgeLabel
            transform={`translate(-50%, -50%) translate(${labelX}px,${labelY}px)`}
            label={data.condition}
          />
        )}
        {data.icon && (
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${targetX}px,${
                targetY - 20
              }px)`,
              fontSize: 12,
              zIndex: 10,
              pointerEvents: "all",
            }}
            className="nodrag nopan"
          >
            <button className="edgebutton shadow-lg">
              <PlusIcon className="h-4 w-4 flex-shrink-0 text-[#6039DB]" />
            </button>
          </div>
        )}
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
