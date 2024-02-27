import axios from './axios';

// Get all categories
export const getAllProjectCategories = async() => {
  try {
    const { data } = await axios.get(`wep-portfolios/categories`);
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
// Get all projects

export const getAllProjects = async (page, limit, getCategoryId) => {
  try {
    const { data } = await axios.get(`wep-portfolios?page=${page}&page_size=${limit}&category_id=${getCategoryId}`);
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

// Get Single
export const getSingleProject = async ({ id }) => {
  try {
    const { data } = await axios.get(`/wep-portfolios/${id}`);

    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};