import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SwiperComponent from '../components/Swiper';
import Button from '../../../../UI/Button';
import { LuFolderSearch } from 'react-icons/lu';
import './../styles/clientLogos.css';

function ClientsLogos() {
  return (
    <div className="client-logos-section">
      <div className="container ">
        <div className="px-20 py-5 ">
          <div className="intro pb-10 ">
            <p>
              <Button
                varients="secondary"
                className="flex  items-center gap-3 text-[2.4rem]"
              >
                زيارة معرض الأعمال
                <LuFolderSearch className="text-[#FAFAFA] text-[2.4rem] ml-2 font-thin" />
              </Button>
            </p>
          </div>
          <SwiperComponent />
        </div>
      </div>
    </div>
  );
}

export default ClientsLogos;
