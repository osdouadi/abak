import { useState } from 'react';
import Input from '../../components/ui/Input';
import styled from 'styled-components';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { sendConsultingRequest } from '../../services/forms';
import { useForm } from 'react-hook-form';

import doneSound from './../../../public/sounds/success_four.mp3';
import errorSound from './../../../public/sounds/error.mp3';
import { useTranslation } from 'react-i18next';

const Banner = styled.div`
  background-image: url('images/general/consulting.jpg');
  background-size: 100% 100%;
  width: 100%;
`;
function PricingPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [note, setNote] = useState('');
  const { t } = useTranslation();

  const { mutate: mutateNew, isPending } = useMutation({
    mutationFn: (formData) => {
      return sendConsultingRequest(formData);
    },
    onSuccess: (data) => {
      toast.success(t('toast_success'), {
        className: 'toast-notification',
      });
      const audio = new Audio(doneSound);
      audio.play();

      // Reset form state
      setName('');
      setEmail('');
      setPhone('');
      setCity('');
      setAddress('');
      setServiceName('');
      setNote('');
    },

    onError: (error) => {
      toast.error(t('toast_fail'), {
        className: 'toast-notification',
      });
      const audio = new Audio(errorSound);
      audio.play();
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
      toast.error(error.message);
      const audio = new Audio(errorSound);
      audio.play();
    }
  };

  return (
    <div>
      <Banner className="page-banner h-[200px] md:h-[400px] mb-3 md:mb-7 lg:mb-10"></Banner>

      {/* Content */}

      <div className="content ">
        <div className="container flex flex-col justify-center mx-auto pb-10 md:pb-20 lg:pb-40">
          <h1 className="page-title text-center  font-semibold  mb-6  md:mb-7 lg:mb-10">
            {t('consulting_service_title')}
          </h1>
          <div className="flex flex-col items-center pb-10 lg:pb-16 ">
            <p className="page-description   text-center  leading-relaxed mb-5  lg:max-w-[80%] lg:mb-10">
              {t('consulting_service_description')}
            </p>
            <div className="form mx-auto  w-full md:w-3/5 lg:w-[44%]">
              <form
                onSubmit={handleSubmit((data, e) => submitHandler(data, e))}
              >
                <div className="form-control pb-5 my-4 lg:mb-6">
                  <label className="label input-label h-[40px]" htmlFor="name">
                    <span> {t('input_full_name')}</span>
                  </label>
                  <Input
                    type="text"
                    placeholder={t('input_full_name')}
                    className=" input-bordered   input-text-color h-14 relative"
                    required
                    id="name"
                    {...register('name', {
                      required: {
                        value: true,
                        message: t('name_validation_enter'),
                      },
                    })}
                  />
                  {errors.name?.message && (
                    <span className="error-form ">{errors.name?.message}</span>
                  )}
                </div>
                <div className="form-control pb-5 my-4 lg:mb-6">
                  <label className="label input-label h-[40px]" htmlFor="email">
                    <span>{t('input_email')}</span>
                  </label>
                  <Input
                    type="text"
                    placeholder={t('input_email')}
                    className=" input-bordered   input-text-color h-14 relative"
                    required
                    id="email"
                    {...register('email', {
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: t('email_validation'),
                      },
                      required: {
                        value: true,
                        message: t('email_validation_enter'),
                      },
                    })}
                  />
                  {errors.email?.message && (
                    <span className="error-form ">{errors.email?.message}</span>
                  )}
                </div>
                <div className="form-control pb-5 my-4 lg:mb-6">
                  <label className="label input-label h-[40px]" htmlFor="phone">
                    <span>{t('input_phone')}</span>
                  </label>
                  <Input
                    type="phone"
                    placeholder={t('input_phone')}
                    className=" input-bordered   input-text-color h-14 relative"
                    required
                    id="phone"
                    {...register('phone', {
                      required: {
                        value: true,
                        message: t('phone_validation_enter'),
                      },
                    })}
                  />
                  {errors.phone?.message && (
                    <span className="error-form ">{errors.phone?.message}</span>
                  )}
                </div>
                <div className="form-control pb-5 my-4 lg:mb-6">
                  <label className="label input-label h-[40px]" htmlFor="city">
                    <span>{t('input_city')}</span>
                  </label>
                  <Input
                    type="text"
                    placeholder={t('input_city')}
                    className=" input-bordered   input-text-color h-14 relative"
                    required
                    id="city"
                    {...register('city', {
                      required: {
                        value: true,
                        message: t('city_validation_enter'),
                      },
                    })}
                  />
                  {errors.city?.message && (
                    <span className="error-form ">{errors.city?.message}</span>
                  )}
                </div>
                <div className="form-control pb-5 my-4 lg:mb-6">
                  <label
                    className="label input-label h-[40px]"
                    htmlFor="address"
                  >
                    <span>{t('input_address')}</span>
                  </label>
                  <Input
                    type="text"
                    placeholder={t('input_address')}
                    className=" input-bordered   input-text-color h-14 relative"
                    required
                    id="address"
                    {...register('address', {
                      required: {
                        value: true,
                        message: t('address_validation_enter'),
                      },
                    })}
                  />
                  {errors.address?.message && (
                    <span className="error-form ">
                      {errors.address?.message}
                    </span>
                  )}
                </div>
                <div className="form-control pb-5 my-4 lg:mb-6">
                  <label className="label input-label h-[40px]" htmlFor="date">
                    <span className="label-text text-xl font-medium text-black-500  py-2 lg:text-2xl lg:font-semibold  lg:py-5">
                      {t('form_date')}
                    </span>
                  </label>
                  <Input
                    type="text"
                    placeholder={t('form_date_placeholder')}
                    className=" date-picker input-bordered   input-text-color h-14 relative"
                    required
                    id="date"
                    {...register('date', {
                      required: {
                        value: false,
                      },
                    })}
                  />
                </div>

                <div className="form-control pb-5 my-4 lg:mb-6">
                  <label className="label input-label h-[40px]" htmlFor="note">
                    <span>{t('input_notes')}</span>
                  </label>
                  <Input
                    type="text"
                    placeholder={t('input_notes')}
                    className=" input-bordered   input-text-color h-14 relative"
                    required
                    id="note"
                    {...register('note', {
                      required: {
                        value: false,
                      },
                    })}
                  />
                </div>
                <div className="form-control  mt-14 md:mt-10 lg:mt-10">
                  <button
                    type="submit"
                    disabled={isPending}
                    className={
                      !isPending
                        ? 'submit-btn '
                        : 'submit-btn  cursor-not-allowed opacity-95'
                    }
                  >
                    {' '}
                    {isPending ? (
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
