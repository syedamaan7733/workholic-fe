import axios from "axios";
import { URL } from "./employeeService";

export const registerUser = async ({ payload }) => {
  const response = await axios.post(`${URL}/emp/create`, payload );
  return response.data;
};
