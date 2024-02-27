import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import './../styles/user.css';
import { PiShoppingCartDuotone } from 'react-icons/pi';
import { AiTwotoneFileText } from 'react-icons/ai';
import { HiOutlineSupport } from 'react-icons/hi';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { HiOutlineHome } from 'react-icons/hi2';
import { AiTwotoneHome } from 'react-icons/ai';
import { useEffect, useRef, useState } from 'react';
import Pagination from '../../../components/pagination/Pagination';
import { RiExternalLinkLine } from 'react-icons/ri';
import { IoCloudDownloadOutline } from 'react-icons/io5';
import { TbCloudDownload } from 'react-icons/tb';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import doneSound from './../../../../public/sounds/success_four.mp3';
import errorSound from './../../../../public/sounds/error.mp3';
import './../styles/user.css';
import { logout, orderDetails } from '../../../services/users';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import ReportImg from './../../../../public/images/general/report.jpg';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';
import { MdDownloadForOffline } from 'react-icons/md';
import SmallerTextSkeleton from '../../../components/skeleton/text/SmallerTextSkeleton';
import LoadingAnimation from '../../../components/loaders/LoadingAnimation';
import FileSkeleton from '../../../components/skeleton/file/FileSkeleton';
import NoData from '../../../components/404/NoData';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { uploadsBaseURL } from '../../../../config/uploadsConfig';
import { userActions } from '../../../store/reducers/userReducers';
import { downloadReport } from '../../../services/order';
import Logo from './../../../../public/images/logos/abak.png';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

function OrderDetails() {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const token = userState.userInfo.access_token;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [showBackBtn, setShowBackBtn] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { data, isPending, isFetching, isError } = useQuery({
    queryFn: () => orderDetails(id, token),
    queryKey: ['orderDetails', id],
    refetchOnWindowFocus: true,
  });

  const {
    mutate: logoutMutate,
    isPending: logoutPending,
    isError: logoutError,
  } = useMutation({
    mutationFn: () => {
      return logout({ token });
    },
    onSuccess: (data) => {
      const audio = new Audio(doneSound);
      audio.onended = () => {
        close();
      };
      audio.play();
      dispatch(userActions.resetUserInfo(data));
      localStorage.removeItem('account', JSON.stringify());
      navigate('/');
    },
    onError: (error) => {
      const audio = new Audio(errorSound);
      audio.play();
      console.log(error);
    },
  });

  // Client side pagination logic
  const allFiles = data?.files ?? [];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allFiles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(allFiles.length / itemsPerPage);
  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  const logoutHandler = (data) => {
    const { token } = data;
    logoutMutate({ token });
  };

  const handleDownload = async (fileName) => {
    try {
      const { data } = await downloadReport(fileName); // Call the API function with the file name
      const url = window.URL.createObjectURL(new Blob([data])); // Create a blob URL from the response data
      const link = document.createElement('a'); // Create a link element
      link.href = url; // Set the link's href attribute to the blob URL
      link.setAttribute('download', fileName); // Set the download attribute to the file name
      document.body.appendChild(link); // Append the link to the document body
      link.click(); // Programmatically click the link to trigger the download
      link.remove(); // Remove the link from the document body after download
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const languages = [
    {
      code: 'ar',
      name: 'العربية',
      country_code: 'sa',
      dir: 'rtl',
    },
    {
      code: 'en',
      name: 'English',
      country_code: 'us',
      dir: 'ltr',
    },
  ];

  const currentLanguageCode = Cookies.get('i18next') || 'ar';
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

  return (
    <div className="user-panel">
      <div className="banner">
        <h1 className=" page-title text-center p-20">
          {t('your_order_details')}
        </h1>
      </div>
      <div className="panel">
        <div className="sidebar">
          <ul className="sidebar-items">
            <li>
              <Link
                to="/user-panel"
                className={pathname === '/user-panel' ? 'active-link-user' : ''}
              >
                <AiTwotoneHome className="icon" />
                <span className="text-black">{t('main_panel')}</span>
              </Link>
            </li>
            <li>
              <Link
                to="/user-panel/orders"
                className={
                  pathname === '/user-panel/orders' ? 'active-link-user' : ''
                }
              >
                <PiShoppingCartDuotone className="icon" />
                <span className="text-black">{t('orders_panel')}</span>
              </Link>
            </li>

            <li>
              <Link
                to="/user-panel/support"
                className={
                  pathname === '/user-panel/support' ? 'active-link-user' : ''
                }
              >
                <HiOutlineSupport
                  className="icon"
                  activeClassName="active-link-user"
                />
                <span className="text-black">{t('technical_support')}</span>
              </Link>
            </li>
            <li>
              <a onClick={logoutHandler}>
                {logoutPending ? (
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-[2rem] h-[2rem] me-3 text-blue-600 animate-spin   lg:w-[2.3rem] lg:h-[2.3rem]"
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
                ) : (
                  <RiLogoutCircleRLine
                    className="icon"
                    activeClassName="active-link-user"
                  />
                )}
                <span className="text-black"> {t('logout_panel')} </span>
              </a>
            </li>
          </ul>
        </div>
        <div className="content">
          <h1 className="page-sub-title mb-14 flex items-center gap-2 text-black">
            {t('all_details_related')}
          </h1>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col justify-between px-5  lg:flex-row">
              <div className="flex items-start flex-wrap w-full">
                <div className="data-text flex flex-col items-start justify-center gap-8 mb-14 w-full md:w-[50%] lg:w-[70%]">
                  <div className="data-container">
                    <div className="data-name">
                      <h1 className="order-details-title text-black">
                        {t('order_name')}
                      </h1>
                    </div>
                    <div className="data-element">
                      <span>
                        {isPending || isFetching ? (
                          <SmallerTextSkeleton />
                        ) : (
                          data?.service?.name
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="data-container">
                    <div className="data-name">
                      <h1 className="order-details-title text-black">
                        {t('order_date')}
                      </h1>
                    </div>
                    <div className="data-element">
                      <span>
                        {isPending || isFetching ? (
                          <SmallerTextSkeleton />
                        ) : (
                          data?.created_at
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="data-container">
                    <div className="data-name">
                      <h1 className="order-details-title text-black">
                        {t('last_update')}
                      </h1>
                    </div>
                    <div className="data-element">
                      <span>
                        {isPending || isFetching ? (
                          <SmallerTextSkeleton />
                        ) : (
                          new Date(data?.updated_at).toLocaleDateString('en-US')
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="data-status w-full mb-14 md:w-[37%] lg:w-[50%]">
                  <div className="order-status-container">
                    <h1 className="order-details-title text-black">
                      {t('your_order_status')}
                    </h1>
                    {isPending || isFetching ? (
                      <SmallerTextSkeleton />
                    ) : (
                      <div className="status-lights-container flex flex-col justify-center gap-10">
                        <div className="status">
                          <span
                            className={
                              data?.status === '1' ? 'round current' : 'round '
                            }
                          ></span>
                          <span
                            className={
                              data?.status === '1'
                                ? 'status-name  status-active'
                                : 'status-name text-black'
                            }
                          >
                            {t('recieved')}
                          </span>
                        </div>
                        <div className="status">
                          <span
                            className={
                              data?.status === '2' ? 'round current' : 'round '
                            }
                          ></span>
                          <span
                            className={
                              data?.status === '2'
                                ? 'status-name status-active'
                                : 'status-name text-black'
                            }
                          >
                            {t('under_study')}
                          </span>
                        </div>
                        <div className="status">
                          <span
                            className={
                              data?.status === '3' ? 'round current' : 'round '
                            }
                          ></span>
                          <span
                            className={
                              data?.status === '3'
                                ? 'status-name status-active'
                                : 'status-name text-black'
                            }
                          >
                            {t('in_progress')}
                          </span>
                        </div>
                        <div className="status">
                          <span
                            className={
                              data?.status === '4' ? 'round current' : 'round '
                            }
                          ></span>
                          <span
                            className={
                              data?.status === '4'
                                ? 'status-name status-active'
                                : 'status-name text-black'
                            }
                          >
                            {t('complete')}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="order-notes w-full mb-6 lg:w-full">
                <div className="w-full">
                  <h1 className="order-details-title text-black">
                    {t('notes_from_team')}
                    <span style={{ color: 'var(--color-blue-600)' }}>
                      {' '}
                      {t('abak_brand')}
                    </span>
                  </h1>
                  {isPending || isFetching ? (
                    <SmallerTextSkeleton />
                  ) : (
                    <div className="notes-box">
                      <p>{data?.note || t('no_notes')}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <h1 className="page-sub-title w-fit flex items-center gap-3 mt-10 text-black">
              {t('reports_attached')}
              <AiTwotoneFileText className="icon" />
            </h1>
            {isPending || isFetching ? (
              <FileSkeleton />
            ) : isError || currentItems.length === 0 ? (
              <NoData missingDataName={t('reports')} />
            ) : (
              <div>
                <div className="reports-container">
                  <motion.div
                    className="reports"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    {currentItems.map((report) => (
                      <motion.div
                        className="item "
                        key={report.file}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.7 }}
                      >
                        <div className="  bg-white border border-gray-200 rounded-lg shadow  pb-3">
                          <img
                            src={Logo}
                            alt="logo"
                            className="logo-report absolute w-[60px] h-auto left-[5px] top-[15px] "
                          />
                          <div className="img-container mb-2 bg-white  ">
                            <img
                              className="rounded-t-lg"
                              src={ReportImg}
                              alt="report"
                            />
                          </div>
                          <div className="p-3 pb-1 bg-white">
                            <div className="file-title-container bg-white">
                              <h5 className=" file-title  mb-2 lg:mb-10 text-2xl text-center font-semibold tracking-tight text-gray-900 ">
                                {report.file_name}
                              </h5>
                            </div>
                            {/*<Link
                                to={uploadsBaseURL + report.file}
                              download
                              className="download-report inline-flex items-center justify-center  px-5 py-3 text-1xl font-medium text-center text-white bg-blue-600 rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              تحميل
                              <MdDownloadForOffline className="download-report-icon" />
                    </Link> */}
                            <a
                              onClick={() => handleDownload(report.file_name)}
                              download
                              className="download-report cursor-pointer inline-flex items-center justify-center  px-5 py-3 text-1xl font-medium text-center text-white bg-blue-600 rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              {t('download')}
                              <MdDownloadForOffline className="download-report-icon " />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                  {/* Pagination section*/}

                  {data.files.length > 3 && (
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => goToPage(currentPage - 1)}
                        className={`mx-1 h-14 w-14 rounded-full text-2xl font-semibold text-black-500  flex justify-center items-center ${
                          currentPage === 1
                            ? 'bg-gray-200 cursor-not-allowed'
                            : 'bg-blue-600 text-white'
                        }`}
                        disabled={currentPage === 1}
                      >
                        <FaAngleRight className="btn-controller" />
                        {/* Previous Arrow */}
                      </button>
                      <button
                        onClick={() => goToPage(currentPage + 1)}
                        className={`mx-1 h-14 w-14 rounded-full text-2xl font-semibold text-black-500 flex justify-center items-center ${
                          currentPage === totalPages
                            ? 'bg-gray-200 cursor-not-allowed'
                            : 'bg-blue-600 text-white'
                        }`}
                        disabled={currentPage === totalPages}
                      >
                        <FaAngleLeft className="btn-controller" />{' '}
                        {/* Next Arrow */}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
