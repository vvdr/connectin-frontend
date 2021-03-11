/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import { sendRegisterUserEmail } from 'services/api/emails/user'
import { registerUser } from 'services/api/auth'
import { getUserWithInviteCode } from 'services/api/user'

type Data = {
  message: string
  code?: string
  user?: object
}

export default async function register(req: NextApiRequest, res : NextApiResponse<Data>) {
  if (req.method === 'POST') {
    console.log('REGISTER BODY:', req.body)
    try {
      // verify invitation

      const { data: { data: { users } } } = await getUserWithInviteCode(req.body.invite_code)

      if (!users.length) {
        return res.status(400).json({
          message: 'Invalid invitation code',
        })
      }

      console.log('INVITER DETAILS: ', users)
      const { data: resData } = await registerUser({ ...req.body, invited_by: users[0].user_id })
      const { data, errors } = resData

      console.log('errors: ', errors)
      if (errors) {
        return res.status(400).json({
          message: errors[0].message,
          code: '400',
        })
      }

      // send email

      await sendRegisterUserEmail(req.body.email)

      // success
      return res.status(201).json({
        message: 'Account created successfully.',
        user: { ...data.insert_users_one },
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
