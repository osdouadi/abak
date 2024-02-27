import axios from './axios';

// Get all categories
export const getAllCategories = async() => {
  try {
    const { data } = await axios.get(`web-categories`);
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

// Get Single
export const getSingleCategory = async ({ id }) => {
  try {
    const { data } = await axios.get(`/categories/${id}`);

    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};


