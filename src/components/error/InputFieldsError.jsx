import './error.scss';

function InputFieldsError({ message }) {
  return (
      <p className="  inputError text-red-500 text-right text-[1.4rem] leading-6 p-2 rounded-md  bottom-[-17px]">
        {message}
      </p>
  );
}

export default InputFieldsError;
