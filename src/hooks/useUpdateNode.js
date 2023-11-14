import { useReactFlow } from "reactflow";

function useUpdateNode() {
  const { setNodes } = useReactFlow();
  const handleSubmitNode = (data, currentNode) => {
    setNodes((nodes) => {
      const clonedNodes = [...nodes];
      const maped = clonedNodes.map((item) => {
        if (currentNode.id === item.id) {
          item.data.description = data?.description ?? "";
          item.data.gotoStep = data?.gotoStep ?? "";
          return item;
        }
        return item;
      });
      return maped;
    });
  };
  return { handleSubmitNode };
}

export default useUpdateNode;
