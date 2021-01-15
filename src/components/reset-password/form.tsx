import {
  Form, Input, Button, Spin, message,
} from 'antd'

import * as yup from 'yup'
import { useFormik } from 'formik'
import styled from 'styled-components'
import { useState } from 'react'

import { updateUserPassword } from 'services/emails'
import { useRouter } from 'next/router'
import Link from 'next/link'

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

const passwordNotLongEnough = (length = 3) => `password must be at least ${length} characters`
const requiredField = (fieldName: string) => `${fieldName} is required.`

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, passwordNotLongEnough(8))
    .max(255)
    .required(requiredField('Password')),
  confirm_password: yup
    .string()
    .min(8, passwordNotLongEnough(8))
    .max(255)
    .required(requiredField('Confirm Password'))
    .oneOf([yup.ref('password'), ''], 'Passwords must match'),
})

const FormItem = Form.Item

type Props ={
  token: string;
}

const ForgotPasswordForm: React.FC<Props> = ({ token }: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleSubmit = async (values: any) => {
    console.log('handle submit ++++', values)
    setLoading(true)
    try {
      const { data } = await updateUserPassword(token, values.password)
      message.success(data.message)
      router.push('/login')

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
      confirm_password: '',
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
            label="Password"
            help={formik.touched.password && formik.errors.password ? formik.errors.password : ''}
            validateStatus={formik.touched.password && formik.errors.password ? 'error' : undefined}
          >
            <Input.Password
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </FormItem>

          <FormItem
            label="Confirm Password"
            help={(formik.touched.confirm_password || formik.touched.password) && formik.errors.confirm_password ? formik.errors.confirm_password : ''}
            validateStatus={(formik.touched.confirm_password || formik.touched.password) && formik.errors.confirm_password ? 'error' : undefined}
          >
            <Input.Password
              name="confirm_password"
              placeholder="Confirm Password"
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
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
