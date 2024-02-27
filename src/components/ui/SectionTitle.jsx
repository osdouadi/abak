import React from 'react';
import { BsThreeDots } from 'react-icons/bs';

const SectionTitle = ({title}) => {
  return (
    <div className="section-title relative  ">
          <h1 className='text-blue-600 leading-snug font-semibold'>{ title}</h1>
        <BsThreeDots className="dots text-blue-600" />
    </div>
  );
};

export default SectionTitle