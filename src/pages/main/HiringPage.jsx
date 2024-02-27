import Input from '../../components/ui/Input';
import styled from 'styled-components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Controller, useForm } from 'react-hook-form';
import { sendApplication } from '../../services/forms';
import doneSound from './../../../public/sounds/success_four.mp3';
import errorSound from './../../../public/sounds/error.mp3';
import { FcApproval } from 'react-icons/fc';
import TextArea from '../../components/ui/TextArea';
import { useTranslation } from 'react-i18next';

const Banner = styled.div`
  background-image: url('images/general/consulting.jpg');
  background-size: 100% 100%;
  width: 100%;
`;
function HiringPage() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [experience, setExperience] = useState('');
  const [certificates, setCertificates] = useState('');
  const [fileAdded, setFileAdded] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: ({ newData }) => {
      return sendApplication({ newData });
    },
    onSuccess: (data) => {
      toast.success(t('toast_success'), {
        className: 'toast-notification',
      });
      queryClient.invalidateQueries('application');
      const audio = new Audio(doneSound);
      audio.play();
      // Reset form state
      setName('');
      setEmail('');
      setPhone('');
      setCity('');
      setAddress('');
      setExperience('');
      setCertificates('');
      setFileAdded(false);
    },
    onError: (error) => {
      toast.error(t('toast_fail'), {
        className: 'toast-notification',
      });
      const audio = new Audio(errorSound);
      audio.play();
      console.log(error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('cv', data.cv);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('city', data.city);
    formData.append('address', data.address);
    formData.append('experience', data.experience);
    formData.append('certificates', data.certificates);

    const newData = { newData: data };
    mutate(newData);
  };

  return (
    <div>
      <Banner className="page-banner h-[200px] md:h-[400px] mb-1 md:mb-6 lg:mb-8"></Banner>

      {/* Content */}

      <div className="content pb-10 md:pb-20 lg:pb-40">
        <div className="container flex flex-col justify-center mx-auto">
          <h1 className="page-title text-center  font-semibold  mb-6  md:mb-7 lg:mb-10">
            {t('recruitment')}
          </h1>
          <div className="flex flex-col items-center pb-10 lg:pb-16 ">
            <p className="page-description   text-center  leading-relaxed mb-5  lg:max-w-[80%] lg:mb-10">
              {t('recruitment_description')}
            </p>
            <div className="form mx-auto  w-full md:w-3/5 lg:w-[44%]">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control pb-5 my-4 lg:mb-6">
                  <label className="label input-label h-[40px]" htmlFor="name">
                    <span>{t('input_full_name')}</span>
                  </label>
                  <Input
                    type="text"
                    placeholder={t('input_full_name')}
                    className=" input-bordered text-xl  input-text-color h-14 relative"
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
                    type="email"
                    placeholder={t('input_email')}
                    className=" input-bordered text-xl  input-text-color h-14 relative"
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
                    type="text"
                    placeholder={t('input_phone')}
                    className=" input-bordered text-xl  input-text-color h-14 relative"
                    required
                    id="phone"
                    {...register('phone', {
                      required: {
                        value: true,
                        message:t('phone_validation_enter'),
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
                    className=" input-bordered text-xl  input-text-color h-14 relative"
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
                    className=" input-bordered text-xl  input-text-color h-14 relative"
                    required
                    id="address"
                    {...register('address', {
                      required: {
                        value: true,
                        message:t('address_validation_enter'),
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
                  <label
                    className="label input-label h-[40px]"
                    htmlFor="certificates"
                  >
                    <span>{t('experience')}</span>
                  </label>
                  <Input
                    type="text"
                    placeholder={t('experience')}
                    className=" input-bordered   input-text-color h-14 relative"
                    required
                    id="certificates"
                    {...register('certificates', {
                      required: {
                        value: true,
                        message: t('experience_validation'),
                      },
                    })}
                  />
                  {errors.certificates?.message && (
                    <span className="error-form ">
                      {errors.certificates?.message}
                    </span>
                  )}
                </div>
                <div className="form-control pb-5 my-4 lg:mb-6">
                  <label
                    className="label input-label h-[40px]"
                    htmlFor="experience"
                  >
                    <span>{t('prev_work') }</span>
                  </label>
                  <TextArea
                    type="text"
                    placeholder={t('prev_work_placeholder') }
                    className=" input-bordered   input-text-color h-14 relative"
                    required
                    id="experience"
                    {...register('experience', {
                      required: {
                        value: true,
                        message: t('prev_work_validation'),
                      },
                    })}
                  />
                </div>
                {errors.experience?.message && (
                  <span className="error-form ">
                    {errors.experience?.message}
                  </span>
                )}
                <div>
                  <label className="label input-label h-[40px]">
                    <span>{t('cv')} </span>
                  </label>
                </div>

                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="cv"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 "
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 draggable-icon"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="text-center mb-2 add-file-draggable  text-gray-500 ">
                        <span className="font-semibold ">
                          {' '}
                          {t('click_here_to_add_cv')}
                        </span>{' '}
                        {t('or_drag')}
                      </p>
                      <p className="add-file-draggable text-gray-500 ">
                        PDF (MAX. 1MB)
                      </p>
                    </div>

                    <Controller
                      control={control}
                      name={'cv'}
                      render={({ field: { value, onChange, ...field } }) => {
                        return (
                          <input
                            {...field}
                            value={value?.fileName}
                            onChange={(event) => {
                              setFileAdded(true);
                              onChange(event.target.files[0]);
                            }}
                            type="file"
                            className="hidden"
                            id="cv"
                            name="cv"
                          />
                        );
                      }}
                    />
                  </label>
                </div>

                {fileAdded && (
                  <span className="file-add">
                    {t('file_added')}
                    <FcApproval className="approve" />
                  </span>
                )}
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

export default HiringPage;
