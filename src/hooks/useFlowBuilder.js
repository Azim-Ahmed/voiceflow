import _ from "lodash";
import { useMemo, useState } from "react";
import { getConnectedEdges, getIncomers, useReactFlow } from "reactflow";
import {
  EdgeTypes,
  NodeTypes,
  addNewConditionEdge,
  addNewEdge,
  addNewFloatNode,
  addNewNode,
} from "../flowbuilder/Utils";
import StepNode from "../flowbuilder/StepNode";
import ConditionNode from "../flowbuilder/ConditionNode";
import StartNode from "../flowbuilder/StartNode";
import EndNode from "../flowbuilder/EndNode";
import FloatNode from "../flowbuilder/FloatNode";
import BridgeEdge from "../flowbuilder/BridgeEdge";
import CustomEdge from "../flowbuilder/CustomEdge";

function useFlowBuilder() {
  const { setNodes, setEdges, getNodes, getNode, getEdges, fitView } =
    useReactFlow();
  const nodes = getNodes();
  const edges = getEdges();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentEdge, setCurrentEdge] = useState({});
  const [currentNode, setCurrentNode] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentSideData, setCurrentSideData] = useState({});

  const nodeTypes = useMemo(
    () => ({
      StepNode: StepNode,
      Condition: ConditionNode,
      startNode: StartNode,
      FloatNode: FloatNode,
      EndNode: EndNode,
    }),
    []
  );
  const edgeTypes = useMemo(
    () => ({
      bridge: BridgeEdge,
      custom: CustomEdge,
    }),
    []
  );

  const stepActionHandle = (item) => {
    // Nodes actions or update
    const getNewNode = addNewNode(item);
    // const getNewTimerNode = addTimerNode();
    const currentClickedNode = new Array(currentNode);
    const connectedEdge = getConnectedEdges(currentClickedNode, edges);
    const getIcomingNodes = getIncomers(currentNode, nodes, edges);
    if (connectedEdge.length) {
      if (
        getIcomingNodes[0].type === NodeTypes.Condition ||
        getIcomingNodes[0].type === NodeTypes.startNode ||
        getIcomingNodes[0].type === NodeTypes.StepNode
      ) {
        // if (getIcomingNodes[0].type === NodeTypes.Condition) {
        //   getNewNode.data.condition = getIcomingNodes[0]?.data?.actionTitle;
        // }
        const getNewFloatNode = addNewFloatNode();
        setNodes((nodes) => {
          const newCopy = [...nodes];
          const nodesCopy = newCopy.filter(
            (item) => item.id !== currentNode.id
          );
          const newNodes = [...nodesCopy, getNewNode, getNewFloatNode];
          return newNodes;
        });
        const prevNode = getNode(connectedEdge[0]?.source);
        // Edges actions or update
        const standAloneEdge = _.cloneDeep(connectedEdge[0]);
        standAloneEdge.target = getNewNode.id;
        standAloneEdge.source = prevNode.id;
        standAloneEdge.type = connectedEdge[0]?.data?.condition
          ? EdgeTypes.custom
          : EdgeTypes.bridge;
        standAloneEdge.data.condition = connectedEdge[0]?.data?.condition ?? "";
        standAloneEdge.data.icon = connectedEdge[0]?.data?.condition
          ? true
          : false;
        setEdges((edges) => {
          const edgesCopy = edges.filter(
            (item) => item.id !== connectedEdge[0].id
          );
          const newlyFloatEdge = addNewEdge(
            getNewNode.id,
            getNewFloatNode.id,
            "default"
          );
          edgesCopy.push(newlyFloatEdge);
          edgesCopy.push(standAloneEdge);
          // edgesCopy.push(newlyBindedTimerEdge);
          return edgesCopy;
        });
        fitView({ maxZoom: 1, duration: 300 });
      } else {
        const getNewFloatNode = addNewFloatNode();
        setNodes((nodes) => {
          const newCopy = [...nodes];
          const nodesCopy = newCopy.filter(
            (item) => item.id !== currentNode.id
          );
          const newNodes = [...nodesCopy, getNewNode, getNewFloatNode];
          return newNodes;
        });
        const prevNode = getNode(connectedEdge[0]?.source);
        // Edges actions or update
        const standAloneEdge = _.cloneDeep(connectedEdge[0]);
        standAloneEdge.target = getNewTimerNode.id;
        standAloneEdge.source = prevNode.id;
        standAloneEdge.type = connectedEdge[0]?.data?.condition
          ? EdgeTypes.custom
          : EdgeTypes.bridge;
        standAloneEdge.data.condition = connectedEdge[0]?.data?.condition ?? "";
        standAloneEdge.data.icon = connectedEdge[0]?.data?.condition
          ? true
          : false;
        setEdges((edges) => {
          const edgesCopy = edges.filter(
            (item) => item.id !== connectedEdge[0].id
          );
          const newlyBindedTimerEdge = addNewEdge(
            getNewTimerNode.id,
            getNewNode.id,
            "default"
          );
          const newlyFloatEdge = addNewEdge(
            getNewNode.id,
            getNewFloatNode.id,
            "default"
          );
          edgesCopy.push(newlyFloatEdge);
          edgesCopy.push(standAloneEdge);
          edgesCopy.push(newlyBindedTimerEdge);
          return edgesCopy;
        });
        fitView({ duration: 300 });
      }
    } else {
      setNodes((nodes) => {
        const nodesCopy = [...nodes];
        const newNodes = [
          ...nodesCopy,
          getNewNode,
          // getNewTimerNode
        ];
        return newNodes;
      });
      const prevNode = getNode(currentEdge?.source);
      const nextNode = getNode(currentEdge?.target);

      // Edges actions or update
      const standAloneEdge = _.cloneDeep(currentEdge);
      standAloneEdge.target = getNewTimerNode.id;
      standAloneEdge.source = prevNode.id;
      standAloneEdge.type = currentEdge?.data?.condition ? "custom" : "bridge";
      standAloneEdge.data.condition = currentEdge?.data?.condition
        ? currentEdge.data.condition
        : "";
      setEdges((edges) => {
        const edgesCopy = edges.filter((item) => item.id !== currentEdge.id);
        const newlyBindedTimerEdge = addNewEdge(
          getNewTimerNode.id,
          getNewNode.id,
          "default"
        );
        const newlyBridgeEdge = addNewEdge(
          getNewNode.id,
          nextNode.id,
          "bridge"
        );
        edgesCopy.push(standAloneEdge, newlyBridgeEdge, newlyBindedTimerEdge);
        return edgesCopy;
      });
    }
    fitView({ maxZoom: 1, duration: 300 });
    setIsModalOpen(false);
    setCurrentEdge({});
    setCurrentNode({});
  };

  const conditionActionHandle = (item) => {
    // Nodes actions or update
    const getNewNode = addNewNode(item);
    const getNewFloatNode1 = addNewFloatNode();
    const getNewFloatNode2 = addNewFloatNode();
    const currentClickedNode = new Array(currentNode);
    const connectedEdge = getConnectedEdges(currentClickedNode, edges);
    const prevNode = getNode(connectedEdge[0]?.source);
    const nextNode = getNode(connectedEdge[0]?.target);

    setNodes((nodes) => {
      const nodesCopy = nodes.filter((item) => item.id !== currentNode.id);
      const newNodes = [
        ...nodesCopy,
        getNewNode,
        getNewFloatNode1,
        getNewFloatNode2,
      ];
      return newNodes;
    });
    fitView({ maxZoom: 1, duration: 300 });
    if (prevNode.type === NodeTypes.Condition) {
      const standAloneEdge = _.cloneDeep(connectedEdge[0]);
      standAloneEdge.target = getNewNode.id;
      standAloneEdge.source = prevNode.id;
      standAloneEdge.type = EdgeTypes.custom;
      standAloneEdge.data.condition = connectedEdge[0]?.data.condition;
      standAloneEdge.data.icon = true;
      setEdges((edges) => {
        const edgesCopy = edges.filter(
          (item) => item.id !== connectedEdge[0].id
        );
        const newlyBindedNoFloatEdge = addNewConditionEdge(
          getNewNode.id,
          getNewFloatNode2.id,
          "No",
          false
        );
        const newlyBindedYesFloatEdge = addNewConditionEdge(
          getNewNode.id,
          getNewFloatNode1.id,
          "Yes",
          false
        );
        edgesCopy.push(standAloneEdge);
        edgesCopy.push(newlyBindedYesFloatEdge);
        edgesCopy.push(newlyBindedNoFloatEdge);
        return edgesCopy;
      });
    } else {
      const standAloneEdge = _.cloneDeep(connectedEdge[0]);
      standAloneEdge.target = getNewNode.id;
      standAloneEdge.source = prevNode.id;
      standAloneEdge.type = "bridge";
      setEdges((edges) => {
        const edgesCopy = edges.filter(
          (item) => item.id !== connectedEdge[0].id
        );
        const newlyBindedNoFloatEdge = addNewConditionEdge(
          getNewNode.id,
          getNewFloatNode2.id,
          "No",
          false
        );
        const newlyBindedYesFloatEdge = addNewConditionEdge(
          getNewNode.id,
          getNewFloatNode1.id,
          "Yes",
          false
        );
        edgesCopy.push(standAloneEdge);
        edgesCopy.push(newlyBindedYesFloatEdge);
        edgesCopy.push(newlyBindedNoFloatEdge);
        return edgesCopy;
      });
      fitView({ maxZoom: 1, duration: 300 });
    }
    // // Edges actions or update
    fitView({ maxZoom: 1, duration: 300 });
    setCurrentEdge({});
    setCurrentNode({});
    setIsModalOpen(false);
    setSelectedIndex(0);
  };
  return {
    isModalOpen,
    currentEdge,
    currentNode,
    currentSideData,
    selectedIndex,
    nodeTypes,
    edgeTypes,
    stepActionHandle,
    setCurrentNode,
    setCurrentEdge,
    setIsModalOpen,
    setCurrentSideData,
    setSelectedIndex,
    conditionActionHandle,
  };
}

export default useFlowBuilder;
