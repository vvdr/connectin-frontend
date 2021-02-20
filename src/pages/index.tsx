import Head from 'next/head'
import MainLayout from 'components/common/layout'
import PageWithLayoutType from 'types/page-with-layout'
import ProtectedPage from 'components/common/protected-route'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const HomePage: React.FC = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/connects')
  }, [])
  return (
    <ProtectedPage>
      <Head>
        <title>Home | ConnectIn</title>
      </Head>

    </ProtectedPage>
  )
}
(HomePage as PageWithLayoutType).layout = MainLayout

export default HomePage
