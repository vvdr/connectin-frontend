// Post CJ commissions to bemob via sid or shopperid sub id.
// import { getTodayConnects } from 'src/services/api/connects'

import moment from 'moment'
import { sendConnectReminderEmail } from '../services/api/emails/connects'

import { getConnectById, getTodayConnects, updateReminderDate } from '../services/api/connects'

const sendConnectReminderEmails = async () => {
  // GET Latest commission from last job
  console.log('test -----')

  try {
    const connectIds = await getTodayConnects()
    console.log('HELLO TO SEND POST REMINDER EMAILS', connectIds)

    console.log(`Current Date Time UTC ${moment.utc().format('LLLL')}`)

    Promise.all(
      connectIds.map(async (connectId: any) => {
        console.log('CONNECT ID - ', connectId)
        const { data: { data: { connects_by_pk } } } = await getConnectById(connectId)

        // send email
        await sendConnectReminderEmail(connects_by_pk) // send email

        const { data: { data: updateData, errors } } = await updateReminderDate(connectId)

        console.log('UPDATE  DATA:::', updateData)

        if (errors) {
          console.log('ERROR UDPATING', errors)
        }

        if (updateData.update_connects_by_pk) {
          console.log('Next reminder date updated successfully FOR -- ', connectId)
        }
      }),
    )
  } catch (err) {
    console.error(`Something went wrong: sendConnectReminderEmails${err}` && err.response)
  }
}

sendConnectReminderEmails()
