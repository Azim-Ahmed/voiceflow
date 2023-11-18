const LabelRenderer = ({ data }) => {
  return (
    <div className={"flex justify-center flex-1"}>
      <p className="font-semibold text-gray-900 text-sm">{data?.description}</p>
    </div>
  );
};
export default LabelRenderer;
