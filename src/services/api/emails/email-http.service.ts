import axios from 'axios';

const SENDGRID_API = process.env.CI_SENDGRID_API_ENDPOINT;
const SENDGRID_API_KEY = process.env.CI_SENDGRID_API_KEY;

const instance = axios.create({
  baseURL: SENDGRID_API,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${SENDGRID_API_KEY}`,
  },
});

export default {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
};
