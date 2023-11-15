const LabelRenderer = ({ data }) => {
  return (
    <div className={"flex"}>
      <p className="font-semibold text-gray-900 text-sm">{data?.description}</p>
    </div>
  );
};
export default LabelRenderer;
