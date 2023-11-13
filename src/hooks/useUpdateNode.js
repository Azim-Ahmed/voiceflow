import { useReactFlow } from "reactflow";

function useUpdateNode() {
  const { setNodes } = useReactFlow();
  const handleSubmitNode = (data, currentNode) => {
    setNodes((nodes) => {
      const clonedNodes = [...nodes];
      const maped = clonedNodes.map((item) => {
        if (currentNode.id === item.id) {
          item.data.editorData = data?.editorData ?? "";
          item.data.humanText = data?.humanText ?? "";
          item.data.email = data?.email?.email ?? "";
          item.data.isAiMsg = data?.isAiMsg;
          item.data.email_subject = data?.email_subject ?? "";
          item.data.always_send_msg = data?.always_send_msg ?? false;
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
