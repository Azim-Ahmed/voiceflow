import { useReactFlow } from "reactflow";

function useUpdateNode() {
  const { setNodes } = useReactFlow();
  const handleSubmitNode = (data, currentNode) => {
    setNodes((nodes) => {
      const clonedNodes = [...nodes];
      const maped = clonedNodes.map((item) => {
        if (currentNode.id === item.id) {
          item.data.email = data?.email?.email ?? "";
          item.data.isAiMsg = data?.isAiMsg;
          item.data.email_subject = data?.email_subject ?? "";
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
