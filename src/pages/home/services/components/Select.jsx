import React, { useState, useEffect } from 'react';
import { getCategoryServices } from './../../../../services/order';
import { useTranslation } from 'react-i18next';

const ServiceSelect = ({ options, onServiceSelect }) => {
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceChange = (e) => {
    const selectedOption = e.target.value;
    const selectedServiceObject = options.find(
      (service) => service.name === selectedOption
    );

    onServiceSelect({
      id: selectedServiceObject ? selectedServiceObject.id : null,
    });
  };

  return (
    <div className=' flex flex-col w-full lg:flex lg:flex-col lg:justify-right lg:items-right lg:gap-5 pt-16 lg:pt-24'>

      <select
        value={selectedService}
        onChange={handleServiceChange}
        className=" select-options select-styled font-semibold text-[#fafafa] cursor-pointer shadow-sm rounded-md bg-blue-600 py-3 px-2 "
      >
        <option
          className=" font-semibold text-[#fafafa] "
          value=""
        >
          {t('services')}
        </option>
        {options.map((option) => (
          <option
            className=" font-semibold text-[#fafafa]  "
            key={option.id}
            value={option.name}
          >
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ServiceSelect;
