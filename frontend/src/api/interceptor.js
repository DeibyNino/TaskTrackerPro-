import axios from "axios";

const url = import.meta.env.VITE_BASE_URL;
//post
export const postData = async (endpoint, data) => {
  try {
    const resp = await axios.post(url + endpoint, data);
    console.log(resp);
    return resp;
  } catch (error) {
    console.log(error.response.data);
    return error.response;
  }
};
//get
export const getData = async (endpoint, data) => {
  console.log(endpoint);
  console.log(data);
  try {
    const resp = await axios.get(url + endpoint, data);
    console.log(resp);
    return resp;
  } catch (error) {
    console.log(error.response.data);
    return error.response;
  }
};
//put
//delete
