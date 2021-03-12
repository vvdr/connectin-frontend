import {
  Row, Col, Spin, message,
} from 'antd'
import { User } from 'types/user'
import { registerUser } from 'services/auth'
import { useState } from 'react'
import Router from 'next/router'
import Form from './form'

const initialValues : User = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  phone_number: '',
  company_name: '',
  confirm_password: '',
  invite_code: '',
  gender: '',
  birth_year: undefined,
  race: '',
  city: '',
  state: '',
  country: '',
}

const RegisterComp: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const handleSubmit = async (values: User) => {
    setLoading(true)
    try {
      const { data } = await registerUser({ ...values })
      console.log('Data: ', data)
      message.success(data.message)

      setLoading(false)
      Router.replace('/login')
    } catch (error) {
      console.log('SOMETHING WENT WRONG:', error && error.response)
      console.log('teststs', error.message)
      console.log('teststs---', error.response.message)
      console.log('teststs--- rest', error.response)
      console.log('teststs--- rest')

      message.error(error.response.data.message || 'Something went wrong. - ')
      setLoading(false)
    }
    console.log('Formik Values,', JSON.stringify(values, null, 2))
  }

  return (
    <>
      <Row>
        <Col xs={24} sm={{ span: 16, offset: 4 }}>
          <h2>Register</h2>
          <Spin spinning={loading}>
            <Form initialValues={initialValues} handleSubmit={handleSubmit} />
          </Spin>
        </Col>
      </Row>
    </>
  )
}

export default RegisterComp
