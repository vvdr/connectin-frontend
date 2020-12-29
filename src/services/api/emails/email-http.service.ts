import axios from 'axios';

const SENDGRID_API = process.env.CI_SENDGRID_API_ENDPOINT;

const instance = axios.create({
  baseURL: SENDGRID_API,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${SENDGRID_API}`,
  },
});

export default {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
};
