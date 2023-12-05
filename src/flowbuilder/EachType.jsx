const EachType = (props) => {
  const { item, actionHandle } = props;
  const { label } = item;
  return (
    <div
      className="w-[350px] h-[80] p-[16px] bg-white rounded-lg border border-gray-300 flex items-center gap-4 cursor-pointer"
      onClick={() => actionHandle(item)}
    >
      <div className="w-[151px] text-black text-center text-base font-inter font-normal break-words">
        {label}
      </div>
    </div>
  );
};

export default EachType;
