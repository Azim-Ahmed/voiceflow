import _ from "lodash";
import { useMemo, useState } from "react";
import { getConnectedEdges, getIncomers, useReactFlow } from "reactflow";
import {
  EdgeTypes,
  NodeTypes,
  addEmptyNode,
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
    const currentClickedNode = new Array(currentNode);
    const getNewNode = addNewNode(item, currentNode);
    const getNewEmptyNode = addEmptyNode(item, currentNode);
    const connectedEdge = getConnectedEdges(currentClickedNode, edges);
    const getIcomingNodes = getIncomers(currentNode, nodes, edges);
    if (connectedEdge.length > 1) {
      if (
        getIcomingNodes[0].type === NodeTypes.Condition ||
        getIcomingNodes[0].type === NodeTypes.startNode ||
        getIcomingNodes[0].type === NodeTypes.StepNode
      ) {
        const getNewFloatNode = addNewFloatNode(currentNode);
        setNodes((nodes) => {
          const newCopy = [...nodes];
          const nodesCopy = newCopy.filter(
            (item) => item.id !== currentNode.id
          );
          const newNodes =
            getNewNode.type === NodeTypes.End
              ? [...nodesCopy, getNewNode]
              : [...nodesCopy, getNewNode, getNewFloatNode];
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
          return edgesCopy;
        });
      } else {
        const getNewFloatNode = addNewFloatNode();
        setNodes((nodes) => {
          const newCopy = [...nodes];
          const nodesCopy = newCopy.filter(
            (item) => item.id !== currentNode.id
          );
          const newNodes = [
            ...nodesCopy,
            getNewNode,
          ];
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
        // fitView({ duration: 300 });
      }
    } else {
      setNodes((nodes) => {
        const newCopy = [...nodes];
        const newNodes = [...newCopy, getNewEmptyNode];
        return newNodes;
      });
    }
    setIsModalOpen(false);
    setCurrentEdge({});
    setCurrentNode({});
  };

  return {
    isModalOpen,
    currentEdge,
    currentNode,
    currentSideData,
    nodeTypes,
    edgeTypes,
    stepActionHandle,
    setCurrentNode,
    setCurrentEdge,
    setIsModalOpen,
    setCurrentSideData,
  };
}

export default useFlowBuilder;