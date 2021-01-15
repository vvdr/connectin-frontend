import {
  Form, Input, Button, Spin, message,
} from 'antd'

import * as yup from 'yup'
import { useFormik } from 'formik'
import styled from 'styled-components'
import { useState } from 'react'

import { sendResetPasswordEmail } from 'services/emails'
// import Router from 'next/router'
import Link from 'next/link'

// import { authContext, ContextProps } from 'utils/auth-provider';

const StyledForm = styled.div(
  ({
    theme: {
      down, breakpoints,
    },
  }) => `
  
  & .ant-form-item {
    margin-bottom: 0;
  }

  & .link {
    float: right;
  }

  ${down(breakpoints.sm)} {
    padding: 0 15px;
  } 
`,
)

const emailNotLongEnough = 'Email must be at least 3 characters'
const invalidEmail = 'Email must be a valid email'

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, emailNotLongEnough)
    .max(255)
    .email(invalidEmail)
    .required(),
})

const FormItem = Form.Item

const ForgotPasswordForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (values: any) => {
    console.log('handle submit ++++', values)
    setLoading(true)
    try {
      const { data } = await sendResetPasswordEmail(values.email)
      message.success(data.message)
      setLoading(false)
    } catch (error) {
      console.log('SOMETHING WENT WRONG:', error && error.response)
      message.error(error?.response?.data?.message)
      setLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      password: '',

    },
    validationSchema,
    onSubmit: handleSubmit,
  })

  return (
    <StyledForm>
      <Spin spinning={loading}>
        <Form
          layout="vertical"
          name="forgot-password-form"
          onFinish={formik.handleSubmit}
        >
          <FormItem
            help={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
            validateStatus={formik.touched.email && formik.errors.email ? 'error' : undefined}
            label="Email / Username"
          >
            <Input
              name="email"
              placeholder="Email / Username"
              value={formik.values.email}
              onChange={(event) => {
                const formattedEmail = event.target.value.toLowerCase()
                formik.setFieldValue('email', formattedEmail)
              }}
              onBlur={formik.handleBlur}
            />
          </FormItem>
          <FormItem>
            <Button type="primary" key="submit" htmlType="submit">
              Reset
            </Button>

            <Link href="/login">
              <a className="link"> Login</a>
            </Link>
          </FormItem>
        </Form>
      </Spin>
    </StyledForm>
  )
}

export default ForgotPasswordForm
