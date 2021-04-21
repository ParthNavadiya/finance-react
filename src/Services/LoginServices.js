import API from "../API/API";
import { API_VERSION } from "../Utils/config";
import { LoginAPI } from './seviceRoutes'

const api = new API();

export const loginService = async info => {
  return new Promise(async (resolve, reject) => {
    try {
      const { username, password } = info
      const Data = { Username: username, Password: password }
      const result = await api.post(`${API_VERSION}${LoginAPI}`, {
        data: Data
      });
      if (result && result.isSuccess) {
        resolve({ result });
      } else {
        resolve({ errormsg: true, message: result.message || "Something went wrong!!" })
      }
    } catch (err) {
      reject(err);
    }
  });
};
