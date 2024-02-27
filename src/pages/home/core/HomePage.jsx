//import NavPage from '../../components/NavPage';
import Hero from '../../../components/home/hero/core/Hero';
import Pricing from './../pricing/core/Pricing';
import Services from '../services/core/Services';
import Portfolio from '../portfolio/core/Portfolio';
import Contact from '../../home/contact/core/Contact';
import Features from '../features/core/Features';
import MyModal from './../../../components/header/components/login/MyModal';

import { useEffect, useState } from 'react';
import Consulting from '../consulting/core/Consulting';
import ClientsLogos from '../clientLogos/core/ClientsLogos';
import SectionTitle from '../../../components/ui/SectionTitle';
import Footer from './../../../components/footer/core/Footer';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import Gallery from '../../../components/gallery/Gallery';

function HomePage() {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <>
      <div className="sections">
        {/* Hero */}
        <div className="">
          <Hero />
        </div>
        <Gallery />
        {/* Services */}

        <div className="section min-h-[100vh]" id="services-section">
          <SectionTitle title={t('services_section_title')} />

          <Services />
        </div>
        {/* Consulting */}
        <div className="section min-h-[100vh] ">
          <SectionTitle title={t('consulting_section_title')} />
          <Consulting />
        </div>
        {/* Pricing */}
        <div className="section min-h-[100vh] ">
          <SectionTitle title={t('pricing_section_title')} />

          <Pricing />
        </div>
        <div className="section min-h-[100vh] " id="portfolio-section">
          <Portfolio />
        </div>
        {/*Clients Logos */}

        {/* Features */}
        <div className="section ">
          <Features />
        </div>
        {/* Contact */}
        <div className="section" id="contact-section">
          <Contact />
        </div>
      </div>
    </>
  );
}

export default HomePage;
