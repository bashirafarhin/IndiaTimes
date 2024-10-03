import axios from "axios";

const config = {
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
};

export const isUserAuthenticated = async () => {
  try {
    return await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/auth/login/success`,
      config
    );
  } catch (err) {
    if (err.response && err.response.status == 401) {
      return { data: { authenticated: false } };
    }
    console.log(err, "Error during authenticating user");
    return { data: { authenticated: false } };
  }
};
