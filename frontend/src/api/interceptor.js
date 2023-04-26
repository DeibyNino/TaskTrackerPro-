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
//put
//delete
