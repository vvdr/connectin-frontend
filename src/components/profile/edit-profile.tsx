/* eslint-disable max-len */
import { useEffect, useState } from 'react'
import {
  Row, Col, message, Spin,
} from 'antd'
import styled from 'styled-components'
import { getUser, updateUser } from 'services/user'
import Router from 'next/router'
import Form from './form'

const StyledProfile = styled.div`
  & p{
    font-size: 18px;
  }
`

const StyledHeading = styled.div`
  margin: 20px 0;
  font-size: 24px;
`

const initialValues: any = {
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  company_name: '',
}

const EditProfileComp: React.FC = () => {
  const [user, setUser] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getUser()
        if (data.errors) {
          console.log('SOMETHING WENT WRONG: - GETTING USER DATA ', data.errors)
        } else {
          setUser(data.data?.users[0])
        }
      } catch (error) {
        console.log('SOMETHING WENT WRONG,', error)
      }
    }

    // Temporary hack to fix axios default header on nextjs direct call to server page
    setTimeout(() => fetchData(), 100)
  }, [])

  const handleSubmit = async ({ email, ...rest }: any) => {
    console.log('HANDLE SUBMIT - ', rest, email)
    setLoading(true)
    try {
      const { data } = await updateUser({ ...rest, user_id: user.user_id })
      console.log('Data: ', data)

      // check for errors
      if (data.errors) {
        message.error(data.errors[0].message)
      } else {
        message.success('Profile updated successfully.')
        Router.push('/profile')
      }
      setLoading(false)
    } catch (error) {
      console.log('SOMETHING WENT WRONG:', (error && error.response) || error)
      message.error('Something went wrong.')
      setLoading(false)
    }
  }

  return (
    <StyledProfile>
      <Row>
        <Col xs={24} sm={{ span: 16, offset: 4 }}>
          <StyledHeading>
            <h3>Edit Profile</h3>
          </StyledHeading>
          <Spin spinning={loading}>
            <Form initialValues={user || initialValues} handleSubmit={handleSubmit} />
          </Spin>
        </Col>
      </Row>
    </StyledProfile>
  )
}

export default EditProfileComp
