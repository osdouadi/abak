// Create order

import axios from './axios';

export const sendApplication = async ({ newData }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const { data } = await axios.post(`reqruitments`, newData, config);

    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const sendpricingRequest = async (formData) => {
  try {
    const { data } = await axios.post(`price-services`, formData);

    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const sendContact = async (formData) => {
  try {
    const { data } = await axios.post(`contacts`, formData);

    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const sendConsultingRequest = async (formData) => {
  try {
    const { data } = await axios.post(`contact-experts`, formData);

    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
