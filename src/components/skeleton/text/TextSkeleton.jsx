function TextSkeleton() {
  return (
    <div
      role="status"
      className="max-w-sm  animate-pulse lg:h-[43rem] pt-12 mx-auto"
    >
      <div className="h-[1.5rem] lg:h-[3.5rem] bg-gray-200 rounded-full  w-1/2 mb-3"></div>
      <div className="h-[1rem] lg:h-[3rem] bg-gray-200 rounded-full  max-w-full mb-3.5"></div>
      <div className="h-[1rem] lg:h-[3rem] bg-gray-200 rounded-full  mb-3.5"></div>
      <div className="h-[1rem] lg:h-[3rem] bg-gray-200 rounded-full  max-w-full mb-3.5"></div>
      <div className=" h-[1rem] lg:h-[3rem] bg-gray-200 rounded-full  max-w-full mb-3.5"></div>
      <div className=" h-[1rem] lg:h-[3rem] bg-gray-200 rounded-full  max-w-full mb-3.5"></div>
      <div className=" h-[1rem] lg:h-[3rem] bg-gray-200 rounded-full  max-w-full mb-3.5"></div>
      <div className="h-[1rem] lg:h-[3rem] bg-gray-200 rounded-full  max-w-full mb-3.5"></div>
      <div className="h-[1rem] lg:h-[3rem] bg-gray-200 rounded-full  max-w-full mb-3.5"></div>
      <div className="h-[1.5rem] lg:h-[3.5rem] bg-gray-200 rounded-full  w-1/2 mt-3"></div>
      <span className="sr-only">تحميل...</span>
    </div>
  );
}

export default TextSkeleton;
