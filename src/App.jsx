import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useLocation,
} from 'react-router-dom';
import './App.css';
import AppLayout from './components/layout/AppLayout';
import HomePage from './pages/home/core/HomePage';
import PricingPage from './pages/pricing/PricingPage';
import ConsultingPage from './pages/consulting/ConsultingPage';
import HiringPage from './pages/main/HiringPage';
import AboutPage from './pages/main/AboutPage';
import PageNotFound from './pages/main/PageNotFound';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { Toaster } from 'react-hot-toast';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import UserPanel from './pages/user/core/UserPanel';
import Orders from './pages/user/orders/Order';
import OrderDetails from './pages/user/orders/orderDetails';
import Support from './pages/user/support/Support';
import Privacy from './pages/privacy/Privacy';
import Aim from './pages/aim/Aim';
import ProjectDetails from './pages/portfolio/ProjectDetails';
import { useEffect, useState } from 'react';
import PageLoader from './components/pageLoader/PageLoader';
import SupportClient from './pages/support/Support';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
{/*
  useEffect(() => {
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [location]); */}
  return (
    <div className={isLoading ? 'App h-[100vh]' : 'h-auto'}>
      {isLoading ? (
        <PageLoader />
      ) : (
        <>
          <Routes>
            <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
                <Route path="/*" element={<HomePage />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="portfolio/:id" element={<ProjectDetails />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="recruitment" element={<HiringPage />} />
              <Route path="consulting" element={<ConsultingPage />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="/client-support" element={<SupportClient />} />
              <Route path="our-goal" element={<Aim />} />
              <Route path="user-panel" element={<UserPanel />} />
              <Route path="user-panel/support" element={<Support />} />
              <Route path="user-panel/orders" element={<Orders />} />
              <Route path="/user-panel/orders/:id" element={<OrderDetails />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Toaster />
        </>
      )}
    </div>
  );
}

export default App;
library.add(fab, fas, far);
