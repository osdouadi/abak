import axios from './axios';

// Get all gallery
export const getAllGallery = async() => {
    try {
      const { data } = await axios.get(`web-galleries`);
      return { data };
    } catch (error) {
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      throw new Error(error.message);
    }
  };