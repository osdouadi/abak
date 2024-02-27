import { useForm } from 'react-hook-form';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

// Components
import Button from '../../../../components/ui/Button';
import Map from '../../../../components/ui/Map';
import Input from '../../../../components/ui/Input';
import TextArea from '../../../../components/ui/TextArea';
import SectionTitle from '../../../../components/ui/SectionTitle';

// Assists
import { MdShareLocation } from 'react-icons/md';
import { MdOutlineMail } from 'react-icons/md';
import { LuPhoneCall } from 'react-icons/lu';
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineSort } from 'react-icons/md';
import { IoSend } from 'react-icons/io5';
import Logo from '/images/logos/abak.png';

// Styles
import './../styles/contact.css';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { sendContact } from '../../../../services/forms';

import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import doneSound from './../../../../../public/sounds/success_four.mp3';
import errorSound from './../../../../../public/sounds/error.mp3';
import { IoArrowRedoOutline } from 'react-icons/io5';

const Img = styled.img`
  width: 7.5rem;
  height: auto;
  position: fixed;
  top: 15px;
`;

const iconStyle = {
  fontSize: '27',
  opacity: '0.95',
  color: '#216281',
};
const iconSend = {
  fontSize: '20',
  color: '#FAFAFA',
};

function Contact() {
  const { t } = useTranslation();
  const ref = useRef();
  const [messageSent, setMessageSent] = useState(false);
  const [resend, setResend] = useState(false);
  const {
    mutate: mutateNew,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (formData) => {
      return sendContact(formData);
    },
    onSuccess: (data) => {
      toast.success(t('toast_success'), {
        className: 'toast-notification',
      });
      const audio = new Audio(doneSound);
      audio.play();
      setMessageSent(true);
    },

    onError: (error) => {
      toast.error(t('toast_fail'), {
        className: 'toast-notification',
      });
      const audio = new Audio(errorSound);
      audio.play();
      setMessageSent(false);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const submitHandler = async (data, e) => {
    e.preventDefault();
    try {
      mutateNew(data);
    } catch (error) {
      toast.error(t('toast_fail'), {
        className: 'toast-notification',
      });
      const audio = new Audio(errorSound);
      audio.play();
    }
  };

  const isInView = useInView(ref, { margin: '-100px' });

  const clearForm = () => {
    setMessageSent(false);
    setResend(true);
  };

  return (
    <div
      className="contact-section  relative min-h-[100vh] pb-10"
      style={{ direction: 'rtl' }}
    >
      <div className="mobile-section-title mb-[7.5rem]">
        <SectionTitle title={t('contact_section_title')} />
      </div>
      <div
        className={
          !messageSent
            ? 'pb-[25rem] text-center lg:pb-0 mb-10 '
            : 'pb-[16rem] lg:pb-0 text-center mb-10  '
        }
      ></div>
      {!messageSent && (
        <motion.div
          ref={ref}
          className="phoneSvg"
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 0 }}
          transition={{ delay: 5, duration: 2 }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {' '}
              <motion.path
                animate={
                  isInView && !messageSent
                    ? { pathLength: 1, strokeWidth: 1 }
                    : { pathLength: 0, strokeWidth: 0 }
                }
                transition={{ delay: 0, duration: 3 }}
                d="M14.05 6C15.0268 6.19057 15.9244 6.66826 16.6281 7.37194C17.3318 8.07561 17.8095 8.97326 18 9.95M14.05 2C16.0793 2.22544 17.9716 3.13417 19.4163 4.57701C20.8609 6.01984 21.7721 7.91101 22 9.94M18.5 21C9.93959 21 3 14.0604 3 5.5C3 5.11378 3.01413 4.73086 3.04189 4.35173C3.07375 3.91662 3.08968 3.69907 3.2037 3.50103C3.29814 3.33701 3.4655 3.18146 3.63598 3.09925C3.84181 3 4.08188 3 4.56201 3H7.37932C7.78308 3 7.98496 3 8.15802 3.06645C8.31089 3.12515 8.44701 3.22049 8.55442 3.3441C8.67601 3.48403 8.745 3.67376 8.88299 4.05321L10.0491 7.26005C10.2096 7.70153 10.2899 7.92227 10.2763 8.1317C10.2643 8.31637 10.2012 8.49408 10.0942 8.64506C9.97286 8.81628 9.77145 8.93713 9.36863 9.17882L8 10C9.2019 12.6489 11.3501 14.7999 14 16L14.8212 14.6314C15.0629 14.2285 15.1837 14.0271 15.3549 13.9058C15.5059 13.7988 15.6836 13.7357 15.8683 13.7237C16.0777 13.7101 16.2985 13.7904 16.74 13.9509L19.9468 15.117C20.3262 15.255 20.516 15.324 20.6559 15.4456C20.7795 15.553 20.8749 15.6891 20.9335 15.842C21 16.015 21 16.2169 21 16.6207V19.438C21 19.9181 21 20.1582 20.9007 20.364C20.8185 20.5345 20.663 20.7019 20.499 20.7963C20.3009 20.9103 20.0834 20.9262 19.6483 20.9581C19.2691 20.9859 18.8862 21 18.5 21Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></motion.path>{' '}
            </g>
          </svg>
        </motion.div>
      )}
      {messageSent && (
        <motion.div
          ref={ref}
          className="letterSvg "
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {' '}
              <motion.path
                animate={{
                  pathLength: messageSent && isInView ? 0 : 1,
                  strokeWidth: messageSent && isInView ? 0.74 : 0,
                  fill: messageSent && isInView ? '#A4883F' : '#A4883F',
                }}
                transition={{ delay: 0.4, duration: 1.5 }}
                d="M22 6C22 7.65685 20.6569 9 19 9C17.3431 9 16 7.65685 16 6C16 4.34315 17.3431 3 19 3C20.6569 3 22 4.34315 22 6Z"
                fill="#216281"
              ></motion.path>{' '}
              <motion.path
                animate={{
                  pathLength: messageSent && isInView ? 0 : 1,
                  strokeWidth: messageSent && isInView ? 0.74 : 0,
                }}
                transition={{ delay: 0.4, duration: 1.5 }}
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14 5H10C6.22876 5 4.34315 5 3.17157 6.17157C2 7.34315 2 9.22876 2 13C2 16.7712 2 18.6569 3.17157 19.8284C4.34315 21 6.22876 21 10 21H14C17.7712 21 19.6569 21 20.8284 19.8284C22 18.6569 22 16.7712 22 13C22 11.5466 22 10.3733 21.9329 9.413C21.1453 10.0905 20.1205 10.5 19 10.5C18.5213 10.5 18.0601 10.4253 17.6274 10.2868L16.2837 11.4066C15.3973 12.1452 14.6789 12.7439 14.0448 13.1517C13.3843 13.5765 12.7411 13.8449 12 13.8449C11.2589 13.8449 10.6157 13.5765 9.95518 13.1517C9.32112 12.7439 8.60271 12.1452 7.71636 11.4066L5.51986 9.57617C5.20165 9.31099 5.15866 8.83807 5.42383 8.51986C5.68901 8.20165 6.16193 8.15866 6.48014 8.42383L8.63903 10.2229C9.57199 11.0004 10.2197 11.5384 10.7666 11.8901C11.2959 12.2306 11.6549 12.3449 12 12.3449C12.3451 12.3449 12.7041 12.2306 13.2334 11.8901C13.7803 11.5384 14.428 11.0004 15.361 10.2229L16.2004 9.52335C15.1643 8.69893 14.5 7.42704 14.5 6C14.5 5.65638 14.5385 5.32175 14.6115 5.0002C14.4133 5 14.2096 5 14 5Z"
                fill="#216281"
              ></motion.path>{' '}
            </g>
          </svg>
          <p className="text-center text-3xl mt-[-1.1rem] font-semibold text-blue-600 opacity-95 ">
            {t('message_sent')}
          </p>
        </motion.div>
      )}

      <div className=" lg:container max-w-screen-2xl mx-auto xl:px-24 lg:py-10  ">
        <div className=" mx-auto contact-container  flex flex-col-reverse  lg:grid md:grid-cols-2 grid-cols-1 items-center gap-10   lg:content-center ">
          <div className="  contact-info flex flex-col gap-5 justify-center items-center w-full max-w-[86%] lg:max-w-full">
            <SectionTitle
              title={t('contact_section_title')}
              className="desktop-section-title"
            />

            <div className="holder relative w-full lg:w-full">
              <span className="top-left"></span>
              <span className="top-right"></span>
              <span className="bottom-left"></span>
              <span className="bottom-right"></span>
              <div className="map-container h-auto  ">
                <Map />
              </div>
            </div>
            <div className="flex flex-col gap-[17px] text-center lg:flex-row flex-wrap justify-center ">
              <div
                className={`${
                  i18next.language === 'en'
                    ? 'flex flex-col justify-center  lg:flex-row-reverse items-center gap-3 pt-4'
                    : 'flex flex-col justify-center  items-center gap-3 pt-4'
                }`}
              >
                <LuPhoneCall style={iconStyle} />
                <span
                  className="footer-contact text-[1.55rem] md:text-[1.6rem] lg:text-[1.8rem]"
                  style={{ direction: 'ltr' }}
                >
                  +966 53 122 2169
                </span>
              </div>
              <div
                className={`${
                  i18next.language === 'en'
                    ? 'flex flex-col justify-center  lg:flex-row-reverse items-center gap-3 pt-4'
                    : 'flex flex-col justify-center  items-center gap-3 pt-4'
                }`}
              >
                <MdOutlineMail style={iconStyle} />
                <span className="footer-contact text-[1.55rem] md:text-[1.6rem] lg:text-[1.8rem] leading-relaxed">
                  info@abak.com.sa
                </span>
              </div>
              <div
                className={`${
                  i18next.language === 'en'
                    ? 'flex flex-col justify-center  lg:flex-row-reverse items-center gap-3 pt-4'
                    : 'flex flex-col justify-center items-center gap-3 pt-4'
                }`}
              >
                <MdShareLocation style={iconStyle} />
                <span className="footer-contact text-[1.55rem] md:text-[1.6rem] lg:text-[1.8rem] leading-relaxed">
                  {t('companey_address')}
                </span>
              </div>
            </div>
          </div>
          <div className="   envelope relative  flex justify-center pb-3 mx-auto w-full lg:w-auto lg:-mb-[295px]  ">
            <motion.div
              className="cover "
              initial={!messageSent && { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.4 }}
            >
              {/* letter drop-shadow-xl p-6*/}
              <div
                className={`${
                  messageSent
                    ? ` messageSent drop-shadow-xl p-[0.6rem] lg:p-6`
                    : ` letter drop-shadow-xl p-[0.6rem] lg:p-6`
                }`}
              >
                <Img
                  src={Logo}
                  alt="abak"
                  className="contact-form-logo"
                  style={{
                    position: 'absolute',
                    [i18next.language === 'en' ? 'right' : 'left']: '10px',
                  }}
                />
                <div className="w-[100%] p-[0px] lg:p-6 pt-[2rem] lg:pt-6 ">
                  <form
                    onSubmit={handleSubmit((data, e) => submitHandler(data, e))}
                    id="contactForm"
                  >
                    <div
                      className="form-control my-4 lg:mb-4 flex flex-row gap-3"
                      dir={i18next.language === 'en' ? 'ltr' : 'rtl'}
                    >
                      <label
                        className="label flex items-center h-[40px]"
                        htmlFor="name"
                      >
                        <span className="label-text text-xl  font-medium text-black-500  py-2 lg:text-2xl lg:font-semibold  lg:py-5">
                          <FaRegUser
                            style={iconStyle}
                            className="contact-form-icon"
                          />
                        </span>
                      </label>
                      <Input
                        type="text"
                        placeholder={t('input_full_name')}
                        className=" contact-form-input input-bordered   input-text-color h-14 relative w-full lg:w-[75%]"
                        required
                        id="name"
                        {...register('name', {
                          required: {
                            value: false,
                          },
                        })}
                      />
                    </div>
                    <div
                      className="form-control my-4 lg:mb-4 flex flex-row gap-3"
                      dir={i18next.language === 'en' ? 'ltr' : 'rtl'}
                    >
                      <label
                        className="label flex items-center h-[40px]"
                        htmlFor="email"
                      >
                        <span className="label-text text-xl font-medium text-black-500  py-2 lg:text-2xl lg:font-semibold  lg:py-5">
                          <MdOutlineMail
                            style={iconStyle}
                            className="contact-form-icon"
                          />
                        </span>
                      </label>
                      <Input
                        type="text"
                        placeholder={t('input_email')}
                        className=" contact-form-input  input-bordered text-xl  input-text-color h-14 relative w-full lg:w-[75%]"
                        required
                        id="email"
                        {...register('email', {
                          required: {
                            value: false,
                          },
                        })}
                      />
                    </div>
                    <div
                      className="form-control  my-4 lg:mb-4 flex flex-row gap-3"
                      dir={i18next.language === 'en' ? 'ltr' : 'rtl'}
                    >
                      <label
                        className="label flex items-center h-[40px]"
                        htmlFor="phone"
                      >
                        <span className="label-text text-xl font-medium text-black-500  py-2 lg:text-2xl lg:font-semibold  lg:py-5">
                          <LuPhoneCall
                            style={iconStyle}
                            className="contact-form-icon"
                          />
                        </span>
                      </label>
                      <Input
                        type="text"
                        placeholder={t('input_phone')}
                        className=" contact-form-input input-bordered text-xl  input-text-color h-14 relative w-full lg:w-[75%]"
                        required
                        id="phone"
                        {...register('phone', {
                          required: {
                            value: false,
                          },
                        })}
                      />
                    </div>
                    <div
                      className="form-control  my-4 lg:mb-4 flex flex-row gap-3"
                      dir={i18next.language === 'en' ? 'ltr' : 'rtl'}
                    >
                      <label
                        className="label flex items-center h-[40px]"
                        htmlFor="message"
                      >
                        <span className="label-text text-xl font-medium text-black-500  py-2 lg:text-2xl lg:font-semibold  lg:py-5">
                          <MdOutlineSort
                            style={iconStyle}
                            className="contact-form-icon"
                          />
                        </span>
                      </label>
                      <TextArea
                        type="text"
                        placeholder={t('input_letter_content')}
                        className=" contact-form-input input-bordered text-xl  input-text-color h-14 relative w-full lg:w-[75%]"
                        required
                        id="message"
                        {...register('message', {
                          required: {
                            value: false,
                          },
                        })}
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div className="left"></div>
              <div className="middle flex justify-center items-center">
                <div className="content flex flex-col justify-center  text-center">
                  {!messageSent ? (
                    <>
                      <Button
                        form="contactForm"
                        type="submit"
                        variation="secondary"
                        className="contactForm-btn self-center mb-1 md:mb-2 lg:mb-5"
                      >
                        {!isPending ? (
                          <IoSend style={iconSend} />
                        ) : (
                          <svg
                            aria-hidden="true"
                            role="status"
                            className="inline w-[2rem] h-[2rem]  text-white animate-spin   lg:w-[2.3rem] lg:h-[2.3rem]"
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
                        )}
                      </Button>

                      <p className="text-[#FAFAFA] font-semibold opacity-95 mb-3 text-center text-[1.35rem] md:text-[1.6rem]  lg:text-[1.7rem]  leading-loose">
                        {t('send_letter')}
                      </p>
                    </>
                  ) : (
                    <>
                      <div
                        onClick={clearForm}
                        className="reset-message-btn cursor-pointer self-center mb-1 md:mb-2 lg:mb-5"
                      >
                        <IoArrowRedoOutline style={iconSend} />
                      </div>
                      <p className="text-[#FAFAFA] font-semibold opacity-95 mb-3 text-center text-[1.35rem] md:text-[1.6rem]  lg:text-[1.7rem]  leading-loose">
                        {t('send_new_letter')}
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div className="right"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
