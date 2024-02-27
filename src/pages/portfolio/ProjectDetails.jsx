import { IoTimerOutline } from 'react-icons/io5';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaImages } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';
import { getSingleProject } from '../../services/portfolio';
import { useQuery } from '@tanstack/react-query';
import { uploadsBaseURL } from '../../../config/uploadsConfig';
import cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';



function ProjectDetails() {
  const currentLanguageCode = cookies.get('i18next');
  const { id } = useParams();
  const [t, i18n] = useTranslation('global');


  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSingleProject({ id }),
    queryKey: ['project', id],
    refetchOnWindowFocus: false,
  });
  return (
    <div className="details-page pb-36 lg:pb-56">
      <div className="banner">
        <img src={` ${uploadsBaseURL}${data?.image}`} alt="project" />
      </div>
      <div className="project-details">
        <div className="top">
          <div className="title gap-5 flex flex-col items-center">
            <h3>{currentLanguageCode === 'ar' ? data?.name : data?.name_en}</h3>
          </div>
        </div>
        <div className="middle">
          <div className="description">
            <div
              dangerouslySetInnerHTML={{
                __html:
                  currentLanguageCode === 'ar'
                    ? data?.description
                    : data?.description_en,
              }}
            />
          </div>
        </div>
      </div>
      {data?.images.length > 0 && (
        <div className="project-images mt-14">
          <div className="more-images flex items-center gap-3">
            <FaImages className="more-images-icon" />
            <h3>{t('more_images')}</h3>
          </div>
          <div className="flex flex-col items-center ">
            <Swiper
              direction={'vertical'}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
              autoplay
              loop
            >
              {data?.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`${uploadsBaseURL}${image}`}
                    alt={`project-image-${index}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectDetails;
