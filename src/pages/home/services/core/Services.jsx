import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
// Components
import Card from './../components/Card';
import ServiceSelect from '../components/Select';
import Input from '../../../../components/ui/Input';
// Icons
import { FaCircleArrowLeft } from 'react-icons/fa6';
import { FaFileUpload } from 'react-icons/fa';
import { MdExpandCircleDown } from 'react-icons/md';
import { MdVideoCall } from 'react-icons/md';
// Styling
import styled from 'styled-components';
import './../styles/services.scss';

// Animation
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getAllCategories } from '../../../../services/categories';

// Data fetching
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import cookies from 'js-cookie';


// Auth
import { AuthContext } from '../../../../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, getCategoryServices } from '../../../../services/order';
import toast from 'react-hot-toast';
import { TiArrowSortedUp } from 'react-icons/ti';
import { TiArrowSortedDown } from 'react-icons/ti';
import CardSkeleton from '../../../../components/skeleton/card/CardSkeleton';
import NoData from '../../../../components/404/NoData';
import TextSkeleton from '../../../../components/skeleton/text/TextSkeleton';
import Login from '../../../authPages/Login';
import { TbArrowBackUpDouble } from 'react-icons/tb';
import { TfiControlBackward } from 'react-icons/tfi';
import SuccessfullOrder from '../../../../components/modals/SuccessfullOrder';
import doneSound from './../../../../../public/sounds/success_four.mp3';
import errorSound from './../../../../../public/sounds/error.mp3';
// Styled components
const Intro = styled.div`
  //width: 300px;
  // position: absolute;
  //  right: 10%;
`;

const Banner = styled.div`
  background-image: url('images/general/img_01.png');
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
  position: relative;

  @media screen and (max-width: 1023px) {
    background-image: url('images/general/img_02.png');
    background-size: 100%;
    background-position: top;
  }
  &::after {
    position: absolute;
    content: '';
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
  }
`;

const Content = styled.div`
  position: absolute;
  content: ' ';
  width: 80%;
  height: auto;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 1;
`;

const ConsultingService = styled(Link)`
  color: #fafafa;
  background-color: var(--color-blue-600);
  padding: 1.26rem 2.464rem;
  border-radius: 100px;
  font-size: var(--fontsize-simi-md);
  letter-spacing: 0.05234rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ServiceContainer = styled.div`
  gap: 25px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
`;

function Services() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState(null);
  const [showBackBtn, setShowBackBtn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [selectedCategoryById, setSelectedCategoryById] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [service, setService] = useState(null);
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const [loginModal, setLoginModal] = useState(false);
  const [successfullOrderCong, setSuccessfullOrderCong] = useState(false);
  // create order
  const token = userState.userInfo ? userState.userInfo.access_token : null;
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const {
    mutate: mutateOrder,
    isPending: orderPending,
    isError: orderError,
  } = useMutation({
    mutationFn: () => {
      return createOrder({ service, name, email, phone, city, address, token });
    },
    onSuccess: () => {
      setSuccessfullOrderCong(true);
      const audio = new Audio(doneSound);
      audio.play();
      queryClient.invalidateQueries(['order', token]);
    },
    onError: (error) => {
      const audio = new Audio(errorSound);
      audio.play();
      toast.error(error.message);
      console.log(error.message);
    },
  });
  useEffect(() => {}, [successfullOrderCong]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      toast.error(t('please_provide_service_name'));
      return;
    }

    const newData = {
      service_id: service,
      name,
      email,
      phone,
      city,
      address,
    };

    mutateOrder({
      newData,
    });
  };

  // Fetch all categories from server

  const {
    data: categories,
    isPending: categoriesLoading,
    isError: categoriesError,
  } = useQuery({
    queryFn: () => getAllCategories(),
    queryKey: ['categories'],
  });

  // Get services of a specific category
  const {
    data: servicesData,
    isFetching: serviceFetching,
    isPending: serviceLoading,
    refetch,
  } = useQuery({
    queryFn: () =>
      getCategoryServices({
        selectedCategoryById: selectedCategoryById,
        token,
      }),
    queryKey: ['services', selectedCategoryById, token],
  });

  const handleCategoryClick = (id) => {
    if (userState.userInfo) {
      setActiveCategory(id);
      setShowBackBtn(true);
      setSelectedCategoryById(id);
    } else {
      setLoginModal(true);
    }
  };

  const handleBackButtonClick = () => {
    setShowBackBtn(false);
    setActiveCategory(null);
  };

  const handleServiceSelect = (selectedService) => {
    setService(selectedService.id);
  };

  const handleOrderClose = () => {
    setSuccessfullOrderCong(false);
  };

  const servicesDataOptions = servicesData?.data;
  // Client side pagination logic
  const allCategories = categories?.data ?? [];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allCategories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(allCategories.length / itemsPerPage);
  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  const currentLanguageCode = cookies.get('i18next') || 'ar';

  return (
    <>
      {categoriesLoading ? (
        <div className="flex flex-col lg:flex-row items-center justify-center">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : categoriesError || categories?.data?.length < 1 ? (
        <div className="mx-auto flex justify-center w-full py-4">
          <NoData missingDataName={t('categories')} />
        </div>
      ) : (
        <div
          className="services-section-container relative  flex flex-col    mx-auto my-auto lg:flex lg:flex-row  lg:justify-center lg:pl-3"
          dir="rtl"
        >
          <>
            <div
              className={
                !activeCategory
                  ? `h-full lg:w-[56%] lg:self-stretch lg:h-auto lg:mx-auto relative `
                  : `h-full lg:w-[46%] lg:self-stretch lg:h-auto relative `
              }
            >
              <Intro className="w-full h-[200px] mb-10 lg:h-full lg:w-[73%] lg:mx-auto lg:absolute lg:right-[10%] lg:top-0 ">
                <Banner className="banner">
                  <Content className="content-service">
                    <h3 className="heading tracking-wide text-[#FAFAFA] mb-5 md:mb-4 lg:mb-6">
                      {t('services_section_banner_heading')}
                    </h3>
                    <p className=" sub-heading tracking-wide font-light leading-relaxed text-[#FAFAFA]">
                      {t('services_section_banner_description')}
                    </p>
                  </Content>
                </Banner>
              </Intro>
            </div>

            <ServiceContainer
              className={
                !activeCategory
                  ? ' flex flex-row flex-wrap justify-evenly items-center mb-10 px-6 md:px-0 lg:px-0  lg:grid lg:w-[86%] lg:m-0 lg:pl-6 '
                  : ' w-full flex-col items-center justify-center  relative px-5  md:px-0 lg:px-0 lg:w-2/5 lg:pl-6 '
              }
            >
              {activeCategory ? (
                // Render services based on this category
                <div className="orderForm w-full px-6 ">
                  {showBackBtn && (
                    <button
                      className=" goback-to-categories absolute top-[-5px]  left-[50px]  flex items-center"
                      onClick={handleBackButtonClick}
                    >
                      {t('back_to_categories')}
                      <TfiControlBackward
                        className="goBack"
                        style={{
                          fontSize: '24px',
                          marginTop: '3px',
                        }}
                      />
                    </button>
                  )}
                  {serviceLoading || serviceFetching ? (
                    <TextSkeleton />
                  ) : (
                    <form onSubmit={onSubmit} dir={currentLanguageCode === 'ar' ? 'rtl' : 'ltr'}>
                      {servicesDataOptions ? (
                        <ServiceSelect
                          options={servicesDataOptions}
                          onServiceSelect={handleServiceSelect}
                        />
                      ) : (
                        <p>{t('leading_categories')}</p>
                      )}
                      <div className="">
                        <div className="right flex flex-col gap-1">
                          <div className="form-control  my-4 lg:mb-6">
                            <label className="label input-label" htmlFor="name">
                                    <span>{t('input_full_name')}</span>
                            </label>
                            <Input
                              type="text"
                              placeholder={t('input_full_name')}
                              className=" input-bordered   input-text-color h-14 relative"
                              required
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          <div className="form-control my-4 lg:mb-6">
                            <label
                              className="label input-label"
                              htmlFor="email"
                            >
                              <span>{t('input_email')}</span>
                            </label>
                            <Input
                              type="text"
                              placeholder={t('input_email')}
                              className=" input-bordered  input-text-color h-14 relative"
                              required
                              id="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <div className="form-control  my-4 lg:mb-6">
                            <label
                              className="label input-label"
                              htmlFor="phone"
                            >
                              <span>{t('input_phone')}</span>
                            </label>
                            <Input
                              type="text"
                              placeholder={t('input_phone')}
                              className=" input-bordered   input-text-color h-14 relative"
                              required
                              id="phone"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="left">
                          <div className="form-control  my-4 lg:mb-6">
                            <label className="label input-label" htmlFor="city">
                              <span>{t('input_city')}</span>
                            </label>
                            <Input
                              type="text"
                              placeholder={t('input_city')}
                              className=" input-bordered   input-text-color h-14 relative"
                              required
                              id="city"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                            />
                          </div>
                          <div className="form-control my-4 lg:mb-6">
                            <label
                              className="label input-label"
                              htmlFor="address"
                            >
                              <span>{t('input_address')}</span>
                            </label>
                            <Input
                              type="text"
                              placeholder={t('input_address')}
                              className=" input-bordered text-xl  input-text-color  relative"
                              required
                              id="address"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-control mt-14">
                        <button
                          type="submit"
                          disabled={orderPending || !service}
                          className={
                            !orderPending
                              ? 'submit-btn '
                              : 'submit-btn  cursor-not-allowed opacity-95'
                          }
                        >
                          {orderPending ? (
                            <>
                              <svg
                                aria-hidden="true"
                                role="status"
                                className="inline w-[2rem] h-[2rem] me-3 text-white animate-spin   lg:w-[2.3rem] lg:h-[2.3rem]"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                  fill="#E5E7EB"
                                />
                                <path
                                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                  fill="currentColor"
                                />
                              </svg>
                             {t('sending_order_loading')}
                            </>
                          ) : (
                            t('order_service')
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              ) : categoriesLoading ? (
                // Render skeleton loaders if categories are loading
                currentItems.map((_, index) => <CardSkeleton key={index} />)
              ) : (
                // Render categories if they exist
                currentItems.map((category) => (
                  <Card
                    key={category.id}
                    icon={category.image}
                    category={currentLanguageCode === 'ar' ? category.name : category.name_en}
                    descripton={currentLanguageCode === 'ar' ? category.description : category.description_en }
                    number={category.services_count}
                    onClick={() => handleCategoryClick(category.id)}
                    className="w-full"
                  />
                ))
              )}
            </ServiceContainer>
          </>
          {/* Pagination section*/}
          {!activeCategory &&
            totalPages >= 1 &&
            categories?.data &&
            categoriesLoading === false &&
            categories?.data?.length > 4 && (
              <div className=" service-cards-pagination flex flex-col items-center justify-center gap-5  ">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  className={`mx-1 h-14 w-14 rounded-full text-2xl font-semibold text-black-500 ${
                    currentPage === 1
                      ? 'bg-gray-200 text-blue-600 cursor-not-allowed flex justify-center items-center'
                      : 'bg-blue-600 text-white  flex justify-center items-center'
                  }`}
                  disabled={currentPage === 1}
                >
                  <TiArrowSortedUp
                    style={{ fontSize: '2.3rem' }}
                    className="prev-btn-services"
                  />{' '}
                  {/* Previous Arrow */}
                </button>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  className={`mx-1 h-14 w-14 rounded-full text-2xl font-semibold text-black-500 ${
                    currentPage === totalPages
                      ? 'bg-gray-200 cursor-not-allowed text-blue-600 flex justify-center items-center'
                      : 'bg-blue-600 text-white  flex justify-center items-center'
                  }`}
                  disabled={currentPage === totalPages}
                >
                  <TiArrowSortedDown
                    style={{ fontSize: '2.3rem' }}
                    className="next-btn-services"
                  />{' '}
                  {/* Next Arrow */}
                </button>
              </div>
            )}
          <Login loginModal={loginModal} close={() => setLoginModal(false)} />
        </div>
      )}
      {successfullOrderCong && <SuccessfullOrder onClose={handleOrderClose} />}
    </>
  );
}

export default Services;
