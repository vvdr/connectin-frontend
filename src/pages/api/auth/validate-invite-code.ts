/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'

import { getUserWithInviteCode } from 'services/api/user'

type Data = {
  message: string
 }

export default async function validateInviteCode(req: NextApiRequest, res : NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const {
      invite_code,
    } = req.body

    try {
      if (invite_code) {
        const { data: { data: { users }, errors } } = await getUserWithInviteCode(invite_code)

        if (errors) {
          return res.status(400).json({
            message: errors[0].message,

          })
        }

        if (users.length) {
          return res.status(200).json({
            message: 'Invite code is valid',
          })
        }
        return res.status(400).json({
          message: 'Invalid invite code',
        })
      }
      console.log('NO INVITATION CODE FOUND')
      return res.status(400).json({
        message: 'Invite Code not found',
      })
    } catch (error) {
      console.log('SOMETHING WENT WRONG - valide invite code ')
      return res.status(500).json({
        message: 'Something weird has happend.',
      })
    }
  } else {
    return res.status(405).json({ message: 'We only support POST' })
  }
}
