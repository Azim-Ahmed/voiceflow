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
  // {
  //   id: 2,
  //   label: "Send linkedin message",
  //   Icon: flowIcons.SendLinkedinMessage,
  //   type: "StepNode",
  //   stepType: "email",
  //   actionTitle: ActionTitles.send_msg,
  // },
  // {
  //   id: 3,
  //   label: "Send personalized e-mail",
  //   Icon: flowIcons.Email,
  //   type: "StepNode",
  //   stepType: "email",
  //   actionTitle: ActionTitles.send_email,
  // },
  // {
  //   id: 4,
  //   label: "Send linkedin voice note",
  //   Icon: flowIcons.SendLinkedinVocie,
  //   type: "StepNode",
  //   stepType: "email",
  //   actionTitle: ActionTitles.send_voice,
  // },
  // {
  //   id: 5,
  //   label: "Comment last user linkedin post",
  //   Icon: flowIcons.LinkedinComment,
  //   type: "StepNode",
  //   stepType: "linkedin",
  //   actionTitle: ActionTitles.comment_last_post,
  // },
  // {
  //   id: 6,
  //   label: "Like last user linkedin post",
  //   Icon: flowIcons.LinkedIn,
  //   type: "StepNode",
  //   stepType: "linkedin",
  //   actionTitle: ActionTitles.like_last_post,
  // },
];
export const nodeTypeCondtion = [
  {
    id: 1,
    label: "Condition",
    // subLabel: "Description will come here",
    Icon: flowIcons.HasEmail,
    type: "Condition",
    stepType: "email",
    actionTitle: ActionTitles.has_email,
  },
  // {
  //   id: 2,
  //   label: "Has Linkedin URL",
  //   Icon: flowIcons.HasLinkedinUrl,
  //   // subLabel: "Description will come here",
  //   type: "Condition",
  //   stepType: "linkedin",
  //   actionTitle: ActionTitles.has_linkedin_url,
  // },
  // {
  //   id: 3,
  //   label: "Accepted invite",
  //   Icon: flowIcons.AcceptLinkedInvite,
  //   type: "Condition",
  //   stepType: "linkedin",
  //   // subLabel: "Description will come here",
  //   actionTitle: ActionTitles.is_invite_accepted,
  // },
  // {
  //   id: 4,
  //   label: "Open email",
  //   Icon: flowIcons.OpenEmail,
  //   // subLabel: "Description will come here",
  //   type: "Condition",
  //   stepType: "openEmail",
  //   actionTitle: ActionTitles.is_email_opened,
  // },
  // {
  //   id: 5,
  //   label: "Opened LinkedIn Message",
  //   // subLabel: "Description will come here",
  //   Icon: flowIcons.OpenLinkedMessage,
  //   type: "Condition",
  //   stepType: "openLinkedMessage",
  //   actionTitle: ActionTitles.is_msg_opened,
  // },
  // {
  //   id: 6,
  //   label: "Clicked link in email",
  //   Icon: flowIcons.ClickedLinkEmail,
  //   type: "Condition",
  //   stepType: "linkedin",
  //   // subLabel: "Description will come here",
  //   actionTitle: ActionTitles.is_clicked_link_email,
  // },
  // {
  //   id: 7,
  //   label: "Has email replied",
  //   Icon: flowIcons.ClickedLinkEmail,
  //   type: "Condition",
  //   stepType: "email",
  //   // subLabel: "Description will come here",
  //   actionTitle: ActionTitles.has_email_replied,
  // },
  // {
  //   id: 8,
  //   label: "Has Linkedin Message Replied",
  //   Icon: flowIcons.OpenLinkedMessage,
  //   type: "Condition",
  //   stepType: "linkedin",
  //   // subLabel: "Description will come here",
  //   actionTitle: ActionTitles.has_msg_replied,
  // },
];
const initialNodes = [
  {
    id: "start-node",
    type: "startNode",
    position: { x: 0, y: -150 },
    data: {
      label: "Begin the process",
      stepType: "start",
      subLabel: "",
      days: 1,
      actionTitle: "",
      condition: null,
      email_subject: "",
      branch: null,
      isAiMsg: true,
      email: "",
    },
  },
  {
    id: "node-4",
    type: "FloatNode",
    position: { x: 0, y: 600 },
    data: {
      label: "",
      stepType: "email",
      subLabel: "",
      days: 1,
      actionTitle: "",
      condition: null,
      email_subject: "",
      branch: null,
      isAiMsg: true,
      email: "",
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
      label: data.label,
      subLabel: "",
      isAiMsg: true,
      stepType: data.stepType,
      days: 1,
      actionTitle: data.actionTitle,
      condition: null,
      branch: null,
      email_subject: "",
      email: "",
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
      label: "",
      subLabel: "",
      stepType: "",
      days: 1,
      actionTitle: "",
      isAiMsg: true,
      condition: null,
      branch: null,
      email_subject: "",
      email: "",
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
