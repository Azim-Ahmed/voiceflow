const SingleTab = ({ currItem }) => {
  return (
    <div className="w-[200px] h-[43] pt-3 pb-3 bg-blue-800 rounded-tl-2xl rounded-tr-2xl justify-center items-center inline-flex">
      <div className="w-[200px] text-center text-white text-xl font-inter font-medium break-words">
        {currItem}
      </div>
    </div>
  );
};

export default SingleTab;
