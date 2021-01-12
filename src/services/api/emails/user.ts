/* eslint-disable prefer-const */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SENDGRID_SENDER_EMAIL } from 'utils/constants'
import emailHttpService from './email-http.service'

// import { MainLayout } from './templates/layout';
// import {
//   VERIFY_USER_CONTENT,
// } from './templates/user';

const baseUrl = process.env.CI_BASE_URL

export const sendRegisterUserEmail = (email: string): Promise<any> => {
  const body = {
    personalizations: [
      {
        to: [
          {
            email,
          },
        ],
        subject: 'Account Created - Connectin :)',
      },
    ],
    from: {
      email: SENDGRID_SENDER_EMAIL,
      name: 'ConnectinApp',
    },
    content: [
      {
        type: 'text/html',
        value: `Account Created:  <b>${'Verify'}</b>, you just sent an email.`,
      },
    ],
  }
  return emailHttpService.post('/send', JSON.stringify(body))
}

export const sendResetPasswordEmail = (email:string, token: string): Promise<any> => {
  const url = `${baseUrl}/reset-password/${token}`
  const body = {
    personalizations: [
      {
        to: [
          {
            email,
          },
        ],
        subject: 'Reset Password - Connectin App',
      },
    ],
    from: {
      email: SENDGRID_SENDER_EMAIL,
      name: 'ConnectinApp',
    },
    content: [
      {
        type: 'text/html',
        value: `You requested to reset the password:  <b><a  href="${url}">Reset Password</a</b>.`,
      },
    ],
  }
  return emailHttpService.post('/send', JSON.stringify(body))
}
