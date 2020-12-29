import httpService from './http-service';

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
};

export const sendResetPasswordEmail = (email: string) => {
  const body = JSON.stringify(email);
  return httpService.post('/api/emails/reset-password', body, axiosConfig);
};
