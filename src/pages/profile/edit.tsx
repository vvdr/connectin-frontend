import EditProfileComp from 'components/profile/edit-profile'
import Head from 'next/head'
import MainLayout from 'components/common/layout'
import PageWithLayoutType from 'types/page-with-layout'
import ProtectedPage from 'components/common/protected-route'

const EditProfilePage: React.FC = () => (
  <ProtectedPage>
    <Head>
      <title>Edit Profile | ConnectIn</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <EditProfileComp />
  </ProtectedPage>
);

(EditProfilePage as PageWithLayoutType).layout = MainLayout

export default EditProfilePage
