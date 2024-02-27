function GuideCards({ icon, title, description }) {
  return (
    <div className="guideCards-container w-full ">
      <div className="card flex flex-col items-center justify-center bg-[#C4DBE6] p-4">
        <div className="icon mb-5">
          <img src={icon} alt={title} className="w-24 h-auto" />
        </div>
        <div className="card-title text-center leading-relaxed text-black-500 opacity-95 font-bold mb-3">
          {title}
        </div>
        <p className="description description_text text-black-500 from-semibold text-center  w-[97%]">
          {description}
        </p>
      </div>
    </div>
  );
}

export default GuideCards;
