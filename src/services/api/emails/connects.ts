import { SENDGRID_SENDER_EMAIL } from 'utils/constants'
import emailHttpService from './email-http.service'

export const sendConnectReminderEmail = (data:any): Promise<any> => {
  const body = {
    personalizations: [
      {
        to: [
          {
            email: data.user.email,
          },
        ],
        subject: 'Contact Reminder - Connectin App',
        custom_args: {
          connect_id: data.connect_id,
        },
      },
    ],
    from: {
      email: SENDGRID_SENDER_EMAIL,
      name: 'ConnectinApp',
    },
    content: [
      {
        type: 'text/html',
        value: `<h3> Hi ${data.user.first_name}, You have a meeting with ${data.first_name}.</h3> <br/>
            <b>First Name: </b>  ${data.first_name}<br/>
            <b>Last Name: </b>  ${data.last_name}<br/>
            <b>Email Name: </b>  ${data.email}<br/>
            <b>Company: </b>  ${data.company_name}<br/>
            <b>Phone: </b>  ${data.phone_number}<br/>
            
        `,
      },
    ],
  }

  return emailHttpService.post('/send', JSON.stringify(body))
}
