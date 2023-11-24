// import { PlusIcon } from "@heroicons/react/24/outline";
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
      className={`nodrag nopan absolute items-center flex justify-center font-bold rounded-[2px] w- h-4 text-black bg-white px-1`}
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
  style,
}) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    style,
  });
  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{ stroke: "black", strokeWidth: "1" }}
      />
      <EdgeLabelRenderer>
        {data.condition && (
          <EdgeLabel
            transform={`translate(-50%, -50%) translate(${labelX}px,${labelY}px)`}
            label={data.condition}
          />
        )}
        {/* {data.icon && (
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
        )} */}
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;

// import React from "react";
// import {
//   getBezierPath,
//   BaseEdge,
//   useStore,
//   EdgeLabelRenderer,
// } from "reactflow";

// export const getSpecialPath = (
//   { sourceX, sourceY, targetX, targetY },
//   offset
// ) => {
//   const centerX = (sourceX + targetX) / 2;
//   const centerY = (sourceY + targetY) / 2;

//   return `M ${sourceX} ${sourceY} Q ${centerX} ${
//     centerY + offset
//   } ${targetX} ${targetY}`;
// };

// function EdgeLabel({ transform, label }) {
//   return (
//     <div
//       style={{
//         fontSize: 12,
//         transform,
//       }}
//       className={`nodrag nopan absolute items-center flex justify-center font-bold rounded-[2px] w- h-4 text-black `}
//     >
//       {label}
//     </div>
//   );
// }
// export default function CustomEdge({
//   source,
//   target,
//   sourceX,
//   sourceY,
//   targetX,
//   targetY,
//   sourcePosition,
//   targetPosition,
//   markerEnd,
//   data,
// }) {
//   const isBiDirectionEdge = useStore((s) => {
//     const edgeExists = s.edges.some(
//       (e) =>
//         (e.source === target && e.target === source) ||
//         (e.target === source && e.source === target)
//     );

//     return edgeExists;
//   });

//   const edgePathParams = {
//     sourceX,
//     sourceY,
//     sourcePosition,
//     targetX,
//     targetY,
//     targetPosition,
//   };

//   let path = "";

//   if (isBiDirectionEdge) {
//     path = getSpecialPath(edgePathParams, sourceX < targetX ? 25 : -25);
//   } else {
//     [path] = getBezierPath(edgePathParams);
//   }
//   return (
//     <>
//       <BaseEdge path={path} markerEnd={markerEnd} />
//       <EdgeLabelRenderer>

//         {data.condition && (
//           <EdgeLabel
//             transform={`translate(-50%, -50%) translate(${labelX}px,${labelY}px)`}
//             label={data.condition}
//           />
//         )}
//       </EdgeLabelRenderer>
//     </>
//   );
// }
