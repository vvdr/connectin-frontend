import type { NextApiRequest, NextApiResponse } from 'next'
import { updateReminderDate } from 'services/api/connects'

export default async function sendGridWebhook(req: NextApiRequest, res : NextApiResponse<any>) {
  console.log('REQ METHOD:', req.method)
  console.log('REQ BODY: ', req.body)

  try {
    const { connect_id } = req.body[0]
    if (connect_id) {
      console.log('Connect Id _____', connect_id)

      const { data: resData } = await updateReminderDate(connect_id)
      const { data, errors } = resData

      if (errors) {
        return res.status(400).json({
          message: errors[0].message,
          code: 400,
        })
      }

      if (data.update_connects_by_pk) {
        console.log('Next reminder date updated successfully.')
        return res.json({
          message: 'Next reminder date updated successfully.',
        })
      }

      return res.status(400).json({
        message: 'Something went wrong.',
      })
    }
    return res.status(400).send({ message: 'Connect Id is required' })
  } catch (error) {
    return res.status(400).json({ message: 'Bad Request' })
  }
}
