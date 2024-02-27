import axios from './axios';

// Get services of a specific category
export const getCategoryServices = async ({ selectedCategoryById, token }) => {
  
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `orders/services/${selectedCategoryById}`,
      config
    );

    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

// Create order

export const createOrder = async ({service, name, email, phone, city, address, token }) => {

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      };
      const orderData = { service_id: service , name, email, phone, city, address };
    const { data } = await axios.post(`orders`,orderData, config);
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

// Download Report

export const downloadReport = async () => {
  
  try {
   
    const { data } = await axios.get(
      `orders/download-report`
    );

    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
