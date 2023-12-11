import { NodeTypes, addNewEdge, addNewNode } from "@/flowbuilder/Utils";
import _ from "lodash";
import { useReactFlow } from "reactflow";

function useUpdateNode() {
  const { setNodes, setEdges } = useReactFlow();

  const handleSubmitNode = (data, currentNode) => {
    if (currentNode.type === NodeTypes.Condition) {
      const { conditions } = data;

      const creatableNew = conditions.filter(
        (condition) => condition.target === undefined
      );

      const newNode = [];

      creatableNew.forEach((node) => {
        newNode.push(
          addNewNode({ type: NodeTypes.StepNode, label: "Input" }, currentNode)
        );
      });

      setNodes((nodes) => {
        const clonedNodes = [...nodes];
        const maped = clonedNodes.map((item) => {
          if (currentNode.id === item.id) {
            item.data.description = data?.description ?? "";
            item.data.gotoStep = data?.gotoStep ?? "";
            item.data.conditions = data?.conditions ?? [];
            return item;
          }
          return item;
        });

        const newEmbeddedNode = [...maped, ...newNode];
        return newEmbeddedNode;
      });

      setEdges((edges) => {
        const clonededges = [...edges];

        const newEdge = creatableNew?.map((item, index) =>
          addNewEdge(currentNode.id, newNode[index].id, "custom", item.value)
        );

        const newUpdatedEdges = [...clonededges, ...newEdge];
        let uniqueArray = _.uniqBy(newUpdatedEdges, "id");

        conditions.forEach((item) => {
          const index = uniqueArray.findIndex((edge) => edge.id === item.id);
          if (index !== -1) {
            uniqueArray[index] = {
              ...uniqueArray[index],
              data: {
                id: item.id,
                condition: item.value,
                step: item.step,
              },
            };
          }
        });

        return uniqueArray;
      });
    } else {
      setNodes((nodes) => {
        const clonedNodes = [...nodes];
        const maped = clonedNodes.map((item) => {
          if (currentNode.id === item.id) {
            item.data.description = data?.description ?? "";
            item.data.gotoStep = data?.gotoStep ?? "";
            item.data.conditions = data?.conditions ?? [];
            return item;
          }
          return item;
        });
        return maped;
      });
    }
  };
  return { handleSubmitNode };
}

export default useUpdateNode;
