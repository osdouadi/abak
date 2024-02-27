function SmallerTextSkeleton() {
    return (
      <div
        role="status"
        className="max-w-sm  animate-pulse  "
      >
        <div className="h-[0.8rem] lg:h-[0.8rem] bg-gray-200 rounded-full  max-w-full mb-2.5"></div>
        <div className="h-[0.8rem] lg:h-[0.8rem] bg-gray-200 rounded-full  mb-3.5"></div>
        <div className="h-[0.8rem] lg:h-[0.8rem] bg-gray-200 rounded-full  max-w-full mb-2.5"></div>
      </div>
    );
  }
  
  export default SmallerTextSkeleton;
  