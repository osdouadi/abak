import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useQuery } from '@tanstack/react-query';
import { getAllGallery } from '../../services/gallery';
import { uploadsBaseURL } from '../../../config/uploadsConfig';

export default function Gallery() {
  const { data: images } = useQuery({
    queryFn: () => getAllGallery(),
    queryKey: ['images'],
  });
  console.log(images);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 8000,
    autoplaySpeed: 0,
    autoplayPauseOnHover: false,
    cssEase: 'linear',
    pauseOnDotsHover: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 2, 
        },
      },
    ],
  };
  return (
    <div className="overflow-hidden">
      <Slider {...settings}>
        {images?.data?.map((image) => (
          <img
            key={image.id}
            src={uploadsBaseURL + image.image}
            alt="img"
            className="image-gallery cursor-grab"
          />
        ))}
      </Slider>
    </div>
  );
}
