// Post CJ commissions to bemob via sid or shopperid sub id.
// import { getTodayConnects } from 'src/services/api/connects'

import moment from 'moment'

import { getTodayConnects } from '../services/api/connects'

const sendConnectReminderEmails = async () => {
  // GET Latest commission from last job
  console.log('test ')
  const data = await getTodayConnects()
  console.log('HELLO TO SEND POST REMINDER EMAILS', data)

  try {
    // const { data: { data } = {} } = await getTodayConnects()
    // const { publisherCommissions: { count, records } = {} } = data || {}

    // console.log(`Total Count: ${count}`)
    console.log(`Current Date Time UTC ${moment.utc().format('LLLL')}`)

    // Promise.all(
    //   records.map(async (record) => {
    //     const { shopperId, pubCommissionAmountUsd: payout, commissionId } = record

    //     const { data } = await sendBemobPostback(shopperId, payout, commissionId)

    //     if (!data.startsWith('<html>')) {
    //       logger.info(`Postback Received for ID: ${shopperId} - Payout: ${payout}`)
    //     } else {
    //       logger.error(`Invalid Postback for ID:  ${shopperId} - Payout: ${payout}`)
    //     }
    //   }),
    // )
  } catch (err) {
    console.error(`Something went wrong: sendConnectReminderEmails${err}` && err.response)
  }
}

sendConnectReminderEmails()
