/* eslint-disable max-len */
/* eslint-disable consistent-return */
import { NextApiRequest, NextApiResponse } from 'next'
import { sendResetPasswordEmail } from 'services/api/emails/user'
import { getUserWithEmail } from 'services/api/user'
import jwt from 'jsonwebtoken'

const jwtKey = process.env.CI_JWT_SECRET_KEY || ''
type Data = {
  message: string
  code?: string | number,
 }

export default async function sendResetPasswordEmailAPI(req: NextApiRequest, res : NextApiResponse<Data>) {
  if (req.method === 'POST') {
    try {
      console.log('Req body, ', req.body)
      const {
        email,
      } = req.body

      if (!email) return res.status(400).json({ message: 'Email is required' })

      const { data: userData } = await getUserWithEmail(email)

      const { data, errors } = userData
      console.log('USER DATA +', data, errors)
      if (data.users.length) {
        console.log('USER EXITS: ')

        // Generate Token;

        const tokenContents = {
          email,
          iat: Date.now() / 1000,
        }
        const token = jwt.sign(tokenContents, jwtKey, { expiresIn: '1h' })

        await sendResetPasswordEmail(email, token) // send email
      } else {
        console.log('USER DOESNOT  EXITS: ')
      }

      res.send({ message: 'Email sent successfully if your account exits.' })
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
