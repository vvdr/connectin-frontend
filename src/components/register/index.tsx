import {
  Row, Col, Spin, message,
} from 'antd'
import { User } from 'types/user'
import { registerUser } from 'services/auth'
import { useState } from 'react'
import Router from 'next/router'
import Form from './form'

type Props ={
  invitedBy : string;
}

const initialValues : User = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  phone_number: '',
  company_name: '',
  confirm_password: '',
}

const RegisterComp: React.FC<Props> = ({ invitedBy }: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const handleSubmit = async (values: User) => {
    setLoading(true)
    try {
      const { data } = await registerUser({ ...values, invited_by: invitedBy })
      console.log('Data: ', data)
      message.success(data.message)

      setLoading(false)
      Router.replace('/login')
    } catch (error) {
      console.log('SOMETHING WENT WRONG:', error && error.response)
      message.error('Something went wrong.')
      setLoading(false)
    }
    console.log('Formik Values,', JSON.stringify(values, null, 2))
  }

  return (
    <>
      <Row>
        <Col xs={24} sm={{ span: 16, offset: 4 }}>
          <h2>Register</h2>
          {invitedBy}
          <Spin spinning={loading}>
            <Form initialValues={initialValues} handleSubmit={handleSubmit} />
          </Spin>
        </Col>
      </Row>
    </>
  )
}

export default RegisterComp
