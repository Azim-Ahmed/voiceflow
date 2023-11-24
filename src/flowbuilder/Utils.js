import { v4 as uuidv4 } from "uuid";
import { flowIcons } from "./flowIcons";
import _ from "lodash";
import { MarkerType } from "reactflow";

export const NodeTypes = {
  StepNode: "StepNode",
  Condition: "Condition",
  startNode: "startNode",
  FloatNode: "FloatNode",
  End: "EndNode",
};
export const EdgeTypes = {
  bridge: "bridge", //only icon
  custom: "custom", //with label and icon
  default: "default",
  smoothstep: "smoothstep",
};
export const ActionTitles = {
  has_email: "has_email",
  has_linkedin_url: "has_linkedin_url",
  is_invite_accepted: "is_invite_accepted",
  is_msg_opened: "is_msg_opened",
  has_msg_replied: "has_msg_replied",
  is_email_opened: "is_email_opened",
  has_email_replied: "has_email_replied",
  is_clicked_link_email: "is_clicked_link_email",
  //steps
  send_connection: "send_connection",
  like_last_post: "like_last_post",
  send_msg: "send_msg",
  send_email: "send_email",
  send_voice: "send_voice",
  comment_last_post: "comment_last_post",
};

export const isSideBarOpen = Object.values(ActionTitles).slice(2, 8);
export const isSideBarWithoutEditor = Object.values(ActionTitles).slice(2, 10);
export const nodeTypeStage = [
  {
    id: 1,
    label: "Input",
    Icon: flowIcons.AcceptLinkedInvite,
    type: "StepNode",
    stepType: "email",
    actionTitle: ActionTitles.send_connection,
  },
  {
    id: 2,
    label: "Condition",
    Icon: flowIcons.HasEmail,
    type: "Condition",
    stepType: "email",
    actionTitle: ActionTitles.has_email,
  },
  {
    id: 3,
    label: "End the process",
    Icon: flowIcons.Warning,
    type: "EndNode",
    stepType: "email",
    actionTitle: ActionTitles.send_connection,
  },
];
export const nodeTypeCondtion = [
  {
    id: 1,
    label: "Condition",
    Icon: flowIcons.HasEmail,
    type: "Condition",
    stepType: "email",
    actionTitle: ActionTitles.has_email,
  },
];
const initialNodes = [
  {
    id: "start-node",
    type: "startNode",
    position: { x: 0, y: 0 },
    data: {
      description: "Begin the process",
      stepType: "start",
      conditions: [],
    },
  },
  // {
  //   id: "node-4",
  //   type: "FloatNode",
  //   position: { x: 0, y: 150 },
  //   data: {
  //     description: "",
  //     stepType: "email",
  //     conditions: [],
  //   },
  // },
];
const initialEdges = [
  {
    id: "edge-button2",
    source: "start-node",
    target: "node-4",
    type: "default",
    data: {
      condition: "",
      icon: false,
    },
    markerEnd: {
      type: MarkerType.Arrow,
      width: 24,
      height: 24,
      color: "#335CCB",
    },
  },
];
const addNewNode = (data, currentNode) => {
  console.log({ data, currentNode });
  let newFlowId = uuidv4();
  let newNode = {
    id: newFlowId,
    type: data.type,
    position: { x: currentNode?.position?.x, y: currentNode?.position?.y - 20 },
    data: {
      description: data.label,
      stepType: data.stepType,
      conditions: [],
    },
  };
  return newNode;
};
const addEmptyNode = (data) => {
  let newFlowId = uuidv4();
  let newNode = {
    id: newFlowId,
    type: data.type,
    position: {
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 400),
    },
    data: {
      description: data.label,
      stepType: data.stepType,
      conditions: [],
    },
  };
  return newNode;
};
const addNewFloatNode = (currentNode) => {
  let newFlowId = uuidv4();
  let newNode = {
    id: newFlowId,
    type: NodeTypes.FloatNode,
    position: { x: currentNode.position.x, y: currentNode.position.y + 100 },
    data: {
      description: "",
      stepType: "",
      conditions: [],
    },
  };
  return newNode;
};
const addNewConditionEdge = (sourceId, targetId, condition, icon) => {
  let newEdgeId = uuidv4();
  let newEdge = {
    id: newEdgeId,
    source: sourceId,
    target: targetId,
    labelBgBorderRadius: 4,
    type: EdgeTypes.custom,
    data: {
      condition,
      icon,
    },
    style: { stroke: "black", strokeWidth: "1.3" },
    markerEnd: {
      type: MarkerType.Arrow,
      width: 24,
      height: 24,
      color: "#335CCB",
    },
  };
  return newEdge;
};
const addNewEdge = (sourceId, targetId, type, condition) => {
  let newEdgeId = `${sourceId + ">" + targetId}`;
  let newEdge = {
    id: newEdgeId,
    source: sourceId,
    target: targetId,
    type: type,
    style: { stroke: "black", strokeWidth: "1.3" },
    labelBgBorderRadius: 4,
    markerEnd: {
      type: MarkerType.Arrow,
      width: 24,
      height: 24,
      color: "#335CCB",
    },
    data: {
      icon: false,
      condition: condition ?? "",
    },
  };
  return newEdge;
};
function toJSON(elements) {
  const downloadLink = document.createElement("a");
  const fileBlob = new Blob([JSON.stringify(elements, null, 2)], {
    type: "application/json",
  });
  downloadLink.href = URL.createObjectURL(fileBlob);
  downloadLink.download = `voiceBuilder.json`;
  downloadLink.click();
}
const checkduplicity = (arrayData) => {
  const itemsData = arrayData.filter((value, index) => {
    const _value = JSON.stringify(value);
    return (
      index ===
      arrayData.findIndex((obj) => {
        return JSON.stringify(obj) === _value;
      })
    );
  });
  return itemsData;
};
const removeDuplicates = (array1, array2) =>
  array1.filter((item) => array2.includes(item));

function removeDuplicatesById(array1, array2) {
  const combinedArray = [...array1, ...array2];
  const uniqueArray = _.uniqBy(combinedArray, "id");
  return uniqueArray;
}
function removeSimilarById(array1, array2) {
  const uniqueArray1 = _.differenceBy(array1, array2, "id");
  return uniqueArray1;
}
export {
  addNewNode,
  addNewFloatNode,
  addNewConditionEdge,
  addNewEdge,
  toJSON,
  checkduplicity,
  removeDuplicates,
  removeDuplicatesById,
  removeSimilarById,
  addEmptyNode,
  initialNodes,
  initialEdges,
};
