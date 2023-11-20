import { NodeTypes, addNewEdge, addNewNode } from "@/flowbuilder/Utils";
import { useReactFlow } from "reactflow";

function useUpdateNode() {
  const { setNodes, setEdges } = useReactFlow();
  const handleSubmitNode = (data, currentNode) => {
    if (currentNode.type === NodeTypes.Condition) {
      // TODO
      // const getNewNode = addNewNode(item);
      const { conditions } = data;
      console.log({ conditions, currentNode });
      // const getNewFloatNode1 = addNewFloatNode();
      // const getNewFloatNode2 = addNewFloatNode();
      const newNode =
        conditions &&
        conditions.map((item) =>
          item.step.id ? "" : addNewNode({ type: NodeTypes.FloatNode })
        );
      console.log({ newNode });
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

        // const newEmbeddedNode = [...maped, ...newNode];
        // return newEmbeddedNode;
        return maped;
      });

      setEdges((edges) => {
        const clonededges = [...edges];
        const newEdge =
          conditions &&
          conditions.map(
            (item, index) =>
              addNewEdge(currentNode.id, item.step.id, "custom", item.value)
            // addNewEdge(currentNode.id, newNode[index].id, "custom", item.value)
          );

        console.log({ newEdge });
        const newUpdatedEdges = [...clonededges, ...newEdge];
        // const newStage = newUpdatedEdges.filter(item => item.source )
        console.log({ newUpdatedEdges });
        return newUpdatedEdges;
        // const maped = clonededges.map((item) => {
        //   if (currentNode.id === item.id) {
        //     item.data.description = data?.description ?? "";
        //     item.data.gotoStep = data?.gotoStep ?? "";
        //     item.data.conditions = data?.conditions ?? [];
        //     return item;
        //   }
        //   return item;
        // });
        // return maped;
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
