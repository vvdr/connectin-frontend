import { ContactFormMessage } from 'types/general'
import httpService from './http-service'

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
}

export const sendResetPasswordEmail = (email: string) => {
  const body = JSON.stringify({ email })
  return httpService.post('/api/emails/reset-password', body, axiosConfig)
}

export const updateUserPassword = (token: string, password: string) => {
  const body = JSON.stringify({ token, password })
  return httpService.post('/api/auth/reset-password', body, axiosConfig)
}

export const sendContactFormEmail = (data: ContactFormMessage) => {
  const body = JSON.stringify(data)
  return httpService.post('/api/emails/contact-form', body, axiosConfig)
}
