import axios from "axios";

const config = {
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
};

export const updateUserdetails = async (id, user) => {
  try {
    return await axios.put(`${import.meta.env.VITE_BACKEND_URL}/${id}`, user);
  } catch (err) {
    console.log(err, "Error during Updatation of details of user");
    return null;
  }
};

export const submitFeedbackOrQuery = (id, feedback) => {
  try {
    return axios.post(`${import.meta.env.VITE_BACKEND_URL}/${id}/feedback`, {
      feedback,
    });
  } catch (err) {
    console.log(err, "Error during submitting feedback");
    return null;
  }
};

export const getNews = async (id, selectedChannel) => {
  try {
    return await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/${id}/${selectedChannel}`,
      config
    );
  } catch (err) {
    console.log(err, "Error during getting News Data");
    return null;
  }
};

export const getUserDetails = async (id) => {
  try {
    return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/${id}`, config);
  } catch (err) {
    console.log(err, "Error during getting user details ");
    return null;
  }
};

export const isUserSubscribed = async (id) => {
  try {
    return await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/${id}/subscription`,
      config
    );
  } catch (err) {
    console.log(err, "Error during checking user Subscription");
    return null;
  }
};
