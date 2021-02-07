import type { NextApiRequest, NextApiResponse } from 'next'

export default async function sendGridWebhook(req: NextApiRequest, res : NextApiResponse<any>) {
  console.log('REQ METHOD:', req.method)
  console.log('REQ BODY: ', req.body)

  return res.status(200).json({ message: 'SEND GRID WEBHOOK' })
}
