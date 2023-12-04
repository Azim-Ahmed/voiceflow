import { NodeTypes, addNewEdge, addNewNode } from "@/flowbuilder/Utils";
import _ from "lodash";
import { useReactFlow } from "reactflow";

function useUpdateEdge() {
  const { setNodes, setEdges } = useReactFlow();
  const handleSubmitEdge = (data, currentNode) => {
    console.log({ currentNode });
    // setNodes((nodes) => {
    //   const clonedNodes = [...nodes];
    //   const maped = clonedNodes.map((item) => {
    //     if (currentNode.id === item.id) {
    //       item.data.description = data?.description ?? "";
    //       item.data.gotoStep = data?.gotoStep ?? "";
    //       item.data.conditions = data?.conditions ?? [];
    //       return item;
    //     }
    //     return item;
    //   });
    //   return maped;
    // });

    setEdges((edges) => {
      const clonededges = [...edges];
      const maped = clonededges.map((item) => {
        if (currentNode.id === item.id) {
          console.log({ item });
          item.data.condition = data.description ?? "";
          return item;
        }
        return item;
      });
      return maped;
    });
  };
  return { handleSubmitEdge };
}

export default useUpdateEdge;
