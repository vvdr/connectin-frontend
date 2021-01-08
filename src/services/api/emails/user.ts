/* eslint-disable prefer-const */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SENDGRID_SENDER_EMAIL } from 'utils/constants'
import emailHttpService from './email-http.service'

// import { MainLayout } from './templates/layout';
// import {
//   VERIFY_USER_CONTENT,
// } from './templates/user';

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

export const sendResetPasswordEmail = (email:string): Promise<any> => {
//   console.log('RESET PASSWORD EMAIL', email);
//   const content = RESET_USER_PASSWORD_CONTENT({ token: 'sometoken', fullName: 'full Name' });

  // console.log('CONENT: ++++++++++++++', content);
  const body = {
    personalizations: [
      {
        to: [
          {
            email,
          },
        ],
        subject: 'Reset Password - Connectin :)',
      },
    ],
    from: {
      email: SENDGRID_SENDER_EMAIL,
      name: 'ConnectinApp',
    },
    content: [
      {
        type: 'text/html',
        value: `Rest passowrd:  <b>${'Click Here'}</b>, you just sent an email.`,
      },
    ],
  }
  return emailHttpService.post('/send', JSON.stringify(body))
}
