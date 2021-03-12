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
