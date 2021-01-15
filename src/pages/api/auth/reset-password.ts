/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import { verify } from 'jsonwebtoken'
import { updateUserPassword } from 'services/api/user'

const jwtKey = process.env.CI_JWT_SECRET_KEY || ''

type Data = {
  message: string
  code?: string | number,
 }

export default async function resetPassword(req: NextApiRequest, res : NextApiResponse<Data>) {
  if (req.method === 'POST') {
    try {
      const {
        token, password,
      } = req.body

      // validate token

      if (!token || !password) {
        return res.status(400).json({
          message: 'Token or password is not found.',
          code: 400,
        })
      }

      const { email } = verify(token, jwtKey) as { email: string }

      console.log('EMAIL OUTPU', email)

      if (!email) {
        return res.status(400).json({
          message: 'Invalid token.',
          code: 400,
        })
      }

      const newHashedPassword = await bcrypt.hash(password, 10)
      const { data: resData } = await updateUserPassword(email, newHashedPassword)

      const { data, errors } = resData

      if (errors) {
        return res.status(400).json({
          message: errors[0].message,
          code: 400,
        })
      }

      console.log('USER +++++++++++', data.users)

      if (data.update_users.affected_rows === 1) {
        return res.json({
          message: 'Pass has been updated successfully.',
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
