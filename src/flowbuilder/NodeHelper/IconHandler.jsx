import { NodeTypes } from "../Utils";
import { Imaged } from "../flowIcons";

const IconHandler = ({ props, data }) => {
  return (
    <>
      {props?.nodeData?.type === NodeTypes.startNode ? (
        <p></p>
      ) : (
        <button className="py-2 px-2 nodrag  bg-white text-black font-semibold hover:border-none rounded hover:outline-none focus:outline-none focus:none focus:none focus:none">
          <Imaged
            stepType={data?.actionTitle ? data?.actionTitle : data?.stepType}
          />
        </button>
      )}
    </>
  );
};
export default IconHandler;
