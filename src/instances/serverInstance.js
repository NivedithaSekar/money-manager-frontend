import axios from "axios";

const backendInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    timeout: 5000
})

// Request Interceptor
backendInstance.interceptors.request.use(function (config) {
    const { accessToken } = JSON.parse(localStorage.getItem('user') || '{}');
    const newConfig = {
      ...config,
      headers: {
        ...config.headers,
        'accesstoken': accessToken
      }
    }
    return newConfig;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  
  // Add a response interceptor
  backendInstance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

export default backendInstance;
