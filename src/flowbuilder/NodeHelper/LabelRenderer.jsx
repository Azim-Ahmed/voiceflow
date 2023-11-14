import {
  ActionTitles,
  NodeTypes,
  isSideBarWithoutEditor,
  noErrorToNode,
} from "../Utils";

const LabelRenderer = ({ props, data }) => {
  const nodeErrorCheck =
    props.type === NodeTypes.FloatNode || props.type === NodeTypes.startNode;
  const checkedWithoutEditor = isSideBarWithoutEditor.some(
    (item) => item === data?.actionTitle
  );
  const noErrorCheck = noErrorToNode.some((item) => item === data?.actionTitle);
  const checkedWithEmailSubject = data?.actionTitle === ActionTitles.send_email;
  const senderRequired = checkedWithoutEditor
    ? data.email === ""
    : checkedWithEmailSubject
    ? data.email === "" || data.email_subject === ""
    : noErrorCheck
    ? false
    : data.email === "";
  return (
    <div
      className={
        nodeErrorCheck
          ? "flex  flex-col justify-center"
          : senderRequired
          ? "flex justify-between flex-col"
          : "flex"
      }
    >
      <p className="font-semibold text-gray-900 text-sm">{data?.label}</p>

      {nodeErrorCheck ? (
        <>
          {NodeTypes.startNode ? (
            <p className="font-semibold text-gray-900 text-sm text-center mt-[2px]">
              {data?.contacts}
            </p>
          ) : (
            <p></p>
          )}
        </>
      ) : senderRequired ? (
        <p className="text-[red] font-semibold text-sm mt-[2px]">{`Action required`}</p>
      ) : (
        <p></p>
      )}
    </div>
  );
};
export default LabelRenderer;
