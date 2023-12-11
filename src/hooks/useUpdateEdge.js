import { NodeTypes, addNewEdge, addNewNode } from "@/flowbuilder/Utils";
import _ from "lodash";
import { useReactFlow } from "reactflow";

function useUpdateEdge() {
  const { setEdges } = useReactFlow();

  const handleSubmitEdge = (data, currentNode) => {
    setEdges((edges) => {
      const clonededges = [...edges];
      const maped = clonededges.map((item) => {
        if (currentNode.id === item.id) {
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
