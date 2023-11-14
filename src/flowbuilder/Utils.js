import { v4 as uuidv4 } from "uuid";
import { flowIcons } from "./flowIcons";
import _ from "lodash";

export const NodeTypes = {
  StepNode: "StepNode",
  Condition: "Condition",
  startNode: "startNode",
  FloatNode: "FloatNode",
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
export const noErrorToNode = Object.values(ActionTitles).slice(0, 2);
export const nodeTypeStage = [
  {
    id: 1,
    label: "Input",
    Icon: flowIcons.AcceptLinkedInvite,
    type: "StepNode",
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
    position: { x: 0, y: -150 },
    data: {
      description: "Begin the process",
      stepType: "start",
    },
  },
  {
    id: "node-4",
    type: "FloatNode",
    position: { x: 0, y: 600 },
    data: {
      description: "",
      stepType: "email",
    },
  },
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
  },
];
const addNewNode = (data) => {
  let newFlowId = uuidv4();
  let newNode = {
    id: newFlowId,
    type: data.type,
    position: { x: 100, y: 200 },
    data: {
      description: data.label,

      stepType: data.stepType,

      actionTitle: data.actionTitle,
    },
  };
  return newNode;
};
const addNewFloatNode = () => {
  let newFlowId = uuidv4();
  let newNode = {
    id: newFlowId,
    type: NodeTypes.FloatNode,
    position: { x: 0, y: 0 },
    data: {
      description: "",
      stepType: "",
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
    type: EdgeTypes.custom,
    data: {
      condition,
      icon,
    },
  };
  return newEdge;
};
const addNewEdge = (sourceId, targetId, type) => {
  let newEdgeId = uuidv4();
  let newEdge = {
    id: newEdgeId,
    source: sourceId,
    target: targetId,
    type: type,
    data: {
      icon: false,
      condition: "",
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
  // Concatenate the two arrays into a single array
  const combinedArray = [...array1, ...array2];

  // Remove duplicates based on the 'id' property
  const uniqueArray = _.uniqBy(combinedArray, "id");

  return uniqueArray;
}
function removeSimilarById(array1, array2) {
  // Remove items from array1 that have the same 'id' as items in array2
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
  initialNodes,
  initialEdges,
};