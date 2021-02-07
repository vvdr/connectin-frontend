import { NextApiRequest, NextApiResponse } from 'next'
import { getConnectById } from 'services/api/connects'
import { sendConnectReminderEmail } from 'services/api/emails/connects'

type Data = {
  message: string
  code?: string | number,
 }

export default async function sendReminderEmailAPI(
  req: NextApiRequest, res : NextApiResponse<Data>,
) {
  if (req.method === 'POST') {
    try {
      console.log('Req body, ', req.body)
      const {
        connectId,
      } = req.body

      if (!connectId) return res.status(400).json({ message: 'Connect id is required' })
      const { data: { data: { connects_by_pk } } } = await getConnectById(connectId)

      console.log('PRIMARY KEY: ', connects_by_pk)
      await sendConnectReminderEmail(connects_by_pk) // send email

      return res.send({ message: 'Email sent successfully to contact' })
    } catch (err) {
      console.log('eeeeerrr+n    +++++++_', err && err.response)

      return res.status(400).json({
        message: err.message,
      })
    }
  } else {
    return res.status(405).json({ message: 'We only support POST' })
  }
}
