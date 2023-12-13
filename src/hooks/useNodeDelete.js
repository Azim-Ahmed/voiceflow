import _ from "lodash";
import { getOutgoers, useReactFlow } from "reactflow";
import {
  NodeTypes,
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
      setNodes((nodes) => {
        const nodesCopy = [...nodes];
        const combinedArray = removeSimilarById(nodesCopy, checkDuplic);
        const newNodes = [...combinedArray];
        return newNodes;
      });
      setEdges((edges) => {
        const clonedEdges = [...edges];
        const incomingEdges = edges.filter((x) => x.target === deleteId);
        const outgoingEdges = edges.filter((x) => x.source === deleteId);
        const filteredEdges = clonedEdges.filter(
          (x) =>
            x.target !== incomingEdges[0]?.target &&
            x.source !== outgoingEdges[0]?.source
        );
        return filteredEdges;
      });
    } else {
      setNodes((nodes) => {
        const clonedNodes = [...nodes];
        const maped = clonedNodes.filter((item) => item.id !== deleteId);
        return maped;
      });

      setEdges((edges) => {
        const clonedEdges = [...edges];
        const incomingEdges = edges.filter((x) => x.target === deleteId);
        const outgoingEdges = edges.filter((x) => x.source === deleteId);
        const filteredEdges = clonedEdges.filter(
          (x) =>
            x.target !== incomingEdges[0]?.target &&
            x.source !== outgoingEdges[0]?.source
        );
        return filteredEdges;
      });
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
