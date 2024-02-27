import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {
  Autoplay,
  EffectCoverflow,
  Pagination,
  Navigation,
} from 'swiper/modules';
import ClientCard from './ClientCard';
// Logos
import LogoOne from '/images/logos/moc.png';
import LogoTwo from '/images/logos/mot.svg';
import LogoThree from '/images/logos/othaim.svg';
import LogoFour from '/images/logos/tbc.svg';
import LogoFive from '/images/logos/qarshi.svg';
import LogoSix from '/images/logos/dalta.png';
import LogoSeven from '/images/logos/bawani.png';
import LogoEight from '/images/logos/wasail.png';
import LogoNine from '/images/logos/ahli.png';
import LogoTen from '/images/logos/ajal.png';
import LogoEleven from '/images/logos/abas.png';
import LogoTwelve from '/images/logos/sedra.svg';
import LogoThirteen from '/images/logos/samako.jpg';
import LogoFourteen from '/images/logos/mhc.jpg';
import LogoFifteen from '/images/logos/shaza.jpeg';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { MdKeyboardArrowRight } from 'react-icons/md';
// Styles
import './../styles/clientLogos.css';

function SwiperComponent() {
  return (
    <div className="container px-10">
      {/* Swiper settings */}
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
      autoplay={{
        delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
          clickable: true,
        }}
        modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
        className="swiper_container "
      >
        <SwiperSlide>
          <ClientCard logo={LogoOne} name="وزارة الثقافة السعودية" />
        </SwiperSlide>
        <SwiperSlide>
          <ClientCard logo={LogoTwo} name="وزارة السياحة السعودية" />
        </SwiperSlide>
        <SwiperSlide>
          <ClientCard logo={LogoThree} name="أسواق عبد الله العثيم" />
        </SwiperSlide>
        <SwiperSlide>
          <ClientCard logo={LogoFour} name="شركة تطوير للمباني" />
        </SwiperSlide>
        <SwiperSlide>
          <ClientCard logo={LogoFive} name="شركة عبد الصمد القرشي" />
        </SwiperSlide>
        <SwiperSlide>
          <ClientCard logo={LogoSix} name="شركة دلتا العربية" />
        </SwiperSlide>
        <SwiperSlide>
          <ClientCard logo={LogoSeven} name="شركة بواني للمقاولات" />
        </SwiperSlide>
        <SwiperSlide>
          <ClientCard logo={LogoEight} name="شركة وسائل التعمير للمقاولات" />
        </SwiperSlide>
        <SwiperSlide>
          <ClientCard logo={LogoNine} name="المصنع الأهلي للكرتون" />
        </SwiperSlide>
        <SwiperSlide>
          <ClientCard logo={LogoTen} name="اجال للخدمات الصحية  " />
        </SwiperSlide>
        <SwiperSlide>
          <ClientCard logo={LogoEleven} name="مراكز اباس الطبية" />
        </SwiperSlide>
        <SwiperSlide>
          <ClientCard logo={LogoTwelve} name="شركة سدرا للبنيان" />
        </SwiperSlide>
        <SwiperSlide>
          <ClientCard
            logo={LogoThirteen}
            name=" الشركة السعودية العربية للتسويق  و التوكيلات  "
          />
        </SwiperSlide>
        <SwiperSlide>
          <ClientCard
            logo={LogoFourteen}
            name="مركز الملك عبد العزيز للخيول العربية"
          />
        </SwiperSlide>
        <SwiperSlide>
          <ClientCard logo={LogoFifteen} name="مجمع شذا الطبي" />
        </SwiperSlide>

        <div className="slide-controler">
          <div className="swiper-button-prev slide-arrow">
            <MdKeyboardArrowLeft className="arrow" />
          </div>
          <div className="swiper-button-next slide-arrow">
            <MdKeyboardArrowRight className="arrow " />
          </div>
          <div className="swiper-pagination "></div>
        </div>
      </Swiper>
    </div>
  );
}

export default SwiperComponent;
