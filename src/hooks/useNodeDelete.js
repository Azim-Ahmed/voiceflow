import _ from "lodash";
import { getConnectedEdges, getOutgoers, useReactFlow } from "reactflow";
import {
  EdgeTypes,
  NodeTypes,
  addNewFloatNode,
  checkduplicity,
  removeSimilarById,
} from "../flowbuilder/Utils";

function useNodeDelete() {
  const { setNodes, setEdges, getEdges, getNodes, fitView } = useReactFlow();
  const nodesOrigin = getNodes();
  const edges = getEdges();
  const handleDelete = (deleteId) => {
    const currentNode = nodesOrigin.find((item) => item.id === deleteId);
    if (currentNode?.type === NodeTypes.Condition) {
      const azimData = removeTreeOfOutgoers(currentNode);
      const checkDuplic = checkduplicity(azimData.flat());
      const floatNode = addNewFloatNode(currentNode);
      setNodes((nodes) => {
        const nodesCopy = [...nodes];
        const combinedArray = removeSimilarById(nodesCopy, checkDuplic);
        const newNodes = [...combinedArray, floatNode];
        return newNodes;
      });
      setEdges((edges) => {
        const clonedEdges = [...edges];
        const incomingEdges = edges.filter((x) => x.target === deleteId);
        const outgoingEdges = edges.filter((x) => x.source === deleteId);
        const updatedIncomingEdges = incomingEdges.map((x) => ({
          ...x,
          target: floatNode.id,
          data: { ...x.data, condition: x.data.condition, icon: x.data.icon },
          type: EdgeTypes.default,
        }));
        const filteredEdges = clonedEdges.filter(
          (x) =>
            x.target !== incomingEdges[0].target &&
            x.source !== outgoingEdges[0].source
        );
        filteredEdges.push(...updatedIncomingEdges);
        return filteredEdges;
      });
      fitView({ duration: 300 });
    } else {
      const connectedEdge = getConnectedEdges(new Array(currentNode), edges);
      setNodes((nodes) => {
        const clonedNodes = [...nodes];
        const maped = clonedNodes.filter((item) => item.id !== deleteId);
        return maped;
      });

      setEdges((edges) => {
        const clonedEdges = [...edges];
        const incomingEdges = edges.filter((x) => x.target === deleteId);
        const outgoingEdges = edges.filter((x) => x.source === deleteId);
        const isFloatNode = nodesOrigin.find(
          (item) => item.id === outgoingEdges[0].target
        );
        const isConditionEdge =
          isFloatNode.type === NodeTypes.FloatNode &&
          incomingEdges[0].type === "custom";
        const updatedIncomingEdges = incomingEdges.map((x) => ({
          ...x,
          target: outgoingEdges[0].target,
          type: isConditionEdge
            ? EdgeTypes.custom
            : isFloatNode.type === NodeTypes.FloatNode
            ? EdgeTypes.default
            : x.type,
          data: {
            ...x.data,
            condition: x.data.condition,
            icon: isConditionEdge ? "" : x.data.icon,
          },
        }));
        const filteredEdges = clonedEdges.filter(
          (x) =>
            x.target !== incomingEdges[0].target &&
            x.source !== outgoingEdges[0].source
        );
        filteredEdges.push(...updatedIncomingEdges);
        return filteredEdges;
      });
      fitView({ duration: 300 });
    }
  };

  let storedData = [];
  function removeTreeOfOutgoers(newNode) {
    const outgoers = getOutgoers(newNode, nodesOrigin, edges);
    storedData.push([...outgoers, newNode]);
    if (outgoers.length) {
      outgoers.forEach((outgoer) => removeTreeOfOutgoers(outgoer));
    }
    return storedData;
  }

  return { handleDelete };
}

export default useNodeDelete;
