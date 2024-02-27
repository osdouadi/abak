import './../styles/clientLogos.css';

function ClientCard({ logo, name }) {
  return (
    <div className="client-card bg-[#FFF]  h-auto border border-slate-300 rounded-md flex flex-col justify-between items-center ">
      <div className="logo w-full h-[20rem] mb-14  ">
        <img src={logo} alt="logo" className=" w-full h-full object-contain " />
      </div>
      <div className="name pb-6 h-2/5 flex flex-col justify-end">
        <h3 className="text-2xl font-bold text-blue-600 text-center">{name}</h3>
      </div>
    </div>
  );
}

export default ClientCard;
