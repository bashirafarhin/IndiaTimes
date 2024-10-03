import axios from "axios";

const config = {
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
};

export const getKey = async () => {
  try {
    return await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/getkey`,
      config
    );
  } catch (err) {
    console.log(err, "Error during fetching key");
    return null;
  }
};

export const checkout = async (amount, type) => {
  try {
    return await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/checkout`,
      { amount, type },
      config
    );
  } catch (err) {
    console.log(err, "Error creating order");
    return null;
  }
};
