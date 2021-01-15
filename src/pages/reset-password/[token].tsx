import ResetPasswordComp from 'components/reset-password'
import Head from 'next/head'
import MainLayout from 'components/common/layout'
import { GetServerSideProps } from 'next'
import PageWithLayoutType from 'types/page-with-layout'
import { Row, Col, Alert } from 'antd'

import jwt from 'jsonwebtoken'

const jwtKey = process.env.CI_JWT_SECRET_KEY || ''

const ForgotPasswordPage: React.FC = ({ token, verified }:any) => {
  console.log('verirfied ', verified, token)

  return (
    <div>
      <Head>
        <title>Update Password | ConnectIn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {verified ? <ResetPasswordComp token={token} /> : (
        <Row justify="center">
          <Col span={4}>
            <Alert message="Invalid token." type="error" />
          </Col>
        </Row>
      )}
    </div>
  )
};

(ForgotPasswordPage as PageWithLayoutType).layout = MainLayout

export const getServerSideProps:GetServerSideProps = async (context: any) => {
  console.log('CONTEXT +++', context)
  const { params: { token } } = context

  // Verify Token

  try {
    const tokenVerified = jwt.verify(token, jwtKey)

    console.log('TOKEN VERIFIED', tokenVerified)
    return {
      props: { token, verified: true },
    }
  } catch (error) {
    return {
      props: { token, verified: false },
    }
  }
}

export default ForgotPasswordPage
