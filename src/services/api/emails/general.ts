/* eslint-disable prefer-const */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ContactFormMessage } from 'types/general'
import { SENDGRID_SENDER_EMAIL } from 'utils/constants'
import emailHttpService from './email-http.service'

const CONTACT_EMAIL = process.env.CI_CONTACT_FORM

export const sendContactFormEmail = (data: ContactFormMessage): Promise<any> => {
  const {
    first_name, last_name, email, phone_number, message, subject,
  } = data

  const body = {
    personalizations: [
      {
        to: [
          {
            email: CONTACT_EMAIL,
          },
        ],
        subject: 'Contact Form - Connectin App',
      },
    ],
    from: {
      email: SENDGRID_SENDER_EMAIL,
      name: 'ConnectinApp',
    },
    reply_to: {
      email,
      name: first_name,
    },
    content: [
      {
        type: 'text/html',
        value: `<h3>There is new message from connectin app.</h3> <br/>
            <b>First Name: </b>  ${first_name}<br/>
            <b>Last Name: </b>  ${last_name}<br/>
            <b>Email Name: </b>  ${email}<br/>
            <b>Subject: </b>  ${subject}<br/>
            <b>Phone: </b>  ${phone_number}<br/>
            <b>Message: </b>  ${message}<br/>
        `,
      },
    ],
  }

  return emailHttpService.post('/send', JSON.stringify(body))
}
