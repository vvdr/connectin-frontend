/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import { updateReminderDate } from 'services/api/connects'

type Data = {
  message: string
  code?: string | number,
 }

export default async function updateReminderDateAPI(
  req: NextApiRequest, res : NextApiResponse<Data>,
) {
  if (req.method === 'POST') {
    console.log('BODY: ', req.body)
    try {
      const {
        connectId,
      } = req.body

      if (!connectId) {
        return res.status(400).json({
          message: 'Connect Id not found.',
          code: 400,
        })
      }

      const { data: resData } = await updateReminderDate(connectId)
      const { data, errors } = resData

      console.log('RESPONSE DATA:::', resData)

      if (errors) {
        return res.status(400).json({
          message: errors[0].message,
          code: 400,
        })
      }

      if (data.update_connects_by_pk) {
        return res.json({
          message: 'Next reminder date updated successfully.',
        })
      }

      return res.status(400).json({
        message: 'Something went wrong.',
      })
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
