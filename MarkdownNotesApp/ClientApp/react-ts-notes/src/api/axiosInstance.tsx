import axios from 'axios';

const getBaseUrl = () => {
  let url;
  switch (process.env.NODE_ENV) {
    case 'production':
      url = 'https://noteappapi.azurewebsites.net';
      break;
    case 'development':
    default:
      url = 'https://localhost:7218';
  }
  return url;
}

const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default axiosInstance;