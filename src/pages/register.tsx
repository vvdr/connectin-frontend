/* eslint-disable prefer-destructuring */
import RegisterComp from 'components/register'
import Head from 'next/head'
import MainLayout from 'components/common/layout'
// import Error from 'components/common/error'
import PageWithLayoutType from 'types/page-with-layout'
// import { getUserWithInviteCode } from 'services/api/user'

const RegisterPage:React.FC = () => (
  <div>
    <Head>
      <title>Register | ConnectIn</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <RegisterComp />

  </div>
);

(RegisterPage as PageWithLayoutType).layout = MainLayout

export default RegisterPage

// export async function getServerSideProps({ query }: any) {
//   console.log('PAGE QUERY: ', query)
//   const { inviteCode } = query

//   let isValidInvite = false
//   let invitedBy = {}

//   try {
//     if (inviteCode) {
//       const { data: { data: { users } } } = await getUserWithInviteCode(inviteCode)

//       if (users.length) {
//         isValidInvite = true
//         invitedBy = users[0].user_id
//       }
//     } else {
//       console.log('NO INVITATION CODE FOUND')
//     }
//   } catch (error) {
//     console.log('SOMETHING WENT WRONG - REGISTER PAGE ')
//   }

//   return { props: { isValidInvite, invitedBy } }
// }
