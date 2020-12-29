/* eslint-disable max-len */
/* eslint-disable consistent-return */
import { NextApiRequest, NextApiResponse } from 'next';
import { sendResetPasswordEmail } from 'services/api/emails/user';
import { getUserWithEmail } from 'services/api/user';

type Data = {
  message: string
  code?: string | number,
 }

export default async function sendResetPasswordEmailAPI(req: NextApiRequest, res : NextApiResponse<Data>) {
  if (req.method === 'POST') {
    try {
      const {
        email,
      } = req.body;

      if (!email) res.status(400).json({ message: 'Email is required' });

      const { data: userData } = await getUserWithEmail(email);

      const { data, errors } = userData;
      console.log('USER DATA +', data, errors);
      if (data.users.length) {
        console.log('USER EXITS: ');
        await sendResetPasswordEmail(email); // send email
      } else {
        console.log('USER DOESNOT  EXITS: ');
      }

      res.send({ message: 'Email sent successfully if your account exits.' });
    } catch (err) {
      console.log('eeeeerrr+n    +++++++_', err && err.response);

      return res.status(400).json({
        message: err.message,
      });
    }
  } else {
    return res.status(405).json({ message: 'We only support POST' });
  }
}
