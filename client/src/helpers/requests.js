import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_HOST;

export const tokenlessRequest = async (
  endpoint = "/",
  data,
  method = "GET"
) => {
  const url = `${BASE_URL}${endpoint}`;

  try {
    const res = await axios({
      method,
      url,
      data,
    });
    return res;
  } catch (err) {
    console.error(err);
    return err?.response;
  }
};
