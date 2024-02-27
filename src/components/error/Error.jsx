import './error.scss';
import { MdErrorOutline } from 'react-icons/md';

function Error({ message }) {
  return (
    <div className="error">
      <p className=" bg-red-500 flex items-center justify-center w-fit self-center gap-3 p-4 text-white text-[1.3rem] font-normal rounded-md">
        <MdErrorOutline className="errorIcon" />
        {message}
      </p>
    </div>
  );
}

export default Error;
