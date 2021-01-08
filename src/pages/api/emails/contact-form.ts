/* eslint-disable max-len */
/* eslint-disable consistent-return */
import { NextApiRequest, NextApiResponse } from 'next'
import { sendContactFormEmail } from 'services/api/emails/general'

type Data = {
  message: string
  code?: string | number,
 }

export default async function sendContactFormEmailAPI(req: NextApiRequest, res : NextApiResponse<Data>) {
  if (req.method === 'POST') {
    try {
      const {
        email,
      } = req.body

      if (!email) res.status(400).json({ message: 'Emails is required.' })

      await sendContactFormEmail(req.body) // send email

      res.send({ message: 'Message have been received.' })
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
