import ProfileComp from 'components/profile'
import Head from 'next/head'
import MainLayout from 'components/common/layout'
import PageWithLayoutType from 'types/page-with-layout'
import ProtectedPage from 'components/common/protected-route'

const ProfilePage: React.FC = () => (
  <ProtectedPage>
    <Head>
      <title>Profile | ConnectIn</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <ProfileComp />
  </ProtectedPage>
);

(ProfilePage as PageWithLayoutType).layout = MainLayout

export default ProfilePage
