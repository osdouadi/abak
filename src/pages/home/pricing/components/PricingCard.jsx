import './../styles/pricing.css';
function PricingCard({ icon, text }) {
  return (
    <div className=" pricing-card flex flex-col items-center justify-center bg-[#FAFAFA] h-[20rem] w-[20rem] rounded-md">
      <div className="icon mb-5">{icon}</div>
      <p className="card-title text-blue-600 text-center  leading-loose font-semibold ">
        {text}
      </p>
    </div>
  );
}

export default PricingCard;
