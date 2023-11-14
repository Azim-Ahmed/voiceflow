const EachType = (props) => {
  const { item, actionHandle } = props;
  const { label, Icon, subLabel } = item;
  return (
    <div
      className="w-[350px] h-[80] p-[16px] bg-white rounded-lg border border-gray-300 flex items-center gap-4 cursor-pointer"
      onClick={() => actionHandle(item)}
    >
      <div className="w-[58px] h-[48px] relative">
        <div className="w-8 h-8 left-0 absolute">
          <Icon />
        </div>
      </div>
      <div className="pt-[3px] pb-[3px] justify-start items-center gap-12 flex">
        <div>
          <div className="w-[151px] text-black text-base font-inter font-normal break-words">
            {label}
          </div>
          <div className="w-[151px] text-[#495568] text-xs font-inter font-normal break-words">
            {subLabel}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EachType;
