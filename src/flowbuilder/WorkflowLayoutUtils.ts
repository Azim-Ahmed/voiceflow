import dagre from "dagre";
import _ from "lodash";
import { getConnectedEdges, isNode } from "reactflow";
import { EdgeTypes, NodeTypes } from "./Utils";

const nodeWidth = 367;
const nodeHeight = 90;

const getLayoutedElements = (_elements:any) => {
  const elements = _.cloneDeep(_elements);
  const dagreGraph = new dagre.graphlib.Graph();

  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: "TB" });

  const getEdges = elements.filter((item:any) => item.source);

  elements.forEach((el:any) => {
    if (isNode(el)) {
      const connectedEdge: any = getConnectedEdges(new Array(el), getEdges);
      dagreGraph.setNode(el.id, {
        width: el.width || nodeWidth,
        // height: el.height || nodeHeight,
        height: (connectedEdge[0].type === EdgeTypes.custom && el.type === NodeTypes.StepNode) ? 140 : el.height || nodeHeight,
      });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  dagre.layout(dagreGraph);

  return elements.map((el:any) => {
    if (isNode(el as any)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      el.targetPosition = "top";
      el.sourcePosition = "bottom";
      el.position = {
        x:
          nodeWithPosition.x -
          (el.width || nodeWidth) / 2 +
          Math.random() / 1000,
        y: (nodeWithPosition.y - (el.height || nodeHeight) / 2 ) ,
      };
    }
    return el;
  });
};

export { getLayoutedElements };
