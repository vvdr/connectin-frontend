import {
  Form, Input, Button, Row, Col, Spin, message,
} from 'antd'

import * as yup from 'yup'
import { useFormik } from 'formik'
import styled from 'styled-components'
import { useState } from 'react'
import { sendContactFormEmail } from 'services/emails'

const { TextArea } = Input

const StyledForm = styled.div(
  ({
    theme: {
      down, breakpoints,
    },
  }) => `
  
  & .ant-form-item {
    margin-bottom: 0;
  }
  ${down(breakpoints.sm)} {
    padding: 0 15px;
  } 
`,
)

const emailNotLongEnough = 'email must be at least 3 characters'
const invalidEmail = 'email must be a valid email'
const requiredField = (fieldName: string) => `${fieldName} is required.`

const validationSchema = yup.object().shape({
  first_name: yup
    .string()
    .max(255)
    .required(requiredField('First Name')),
  last_name: yup
    .string()
    .max(255)
    .required(requiredField('Last Name')),
  email: yup
    .string()
    .min(3, emailNotLongEnough)
    .max(255)
    .email(invalidEmail)
    .required(requiredField('Email')),
  message: yup
    .string()
    .max(800)
    .required(requiredField('Message')),
  subject: yup
    .string()
    .max(255)
    .required(requiredField('Subject')),
  phone_number: yup
    .string()
    .max(255)
    .required(requiredField('Phone Number')),
})

const FormItem = Form.Item

const RegisterForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (values: any, onSubmitProps: any) => {
    setLoading(true)

    try {
      const { data } = await sendContactFormEmail(values)
      console.log('Data: ', data)
      message.success(data.message)
      setLoading(false)
      onSubmitProps.resetForm()
    } catch (error) {
      console.log('SOMETHING WENT WRONG:', error && error.response)
      message.error('Something went wrong.')
      setLoading(false)
    }
    console.log('Formik Values,', JSON.stringify(values))
  }

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      message: '',
      subject: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  })

  return (
    <StyledForm>
      <Spin spinning={loading}>
        <Form
          layout="vertical"
          name="register-form"
          onFinish={formik.handleSubmit}
        >
          <Row gutter={{ sm: 24 }}>
            <Col xs={24} sm={12}>
              <FormItem
                help={formik.touched.first_name && formik.errors.first_name ? formik.errors.first_name : ''}
                validateStatus={formik.touched.first_name && formik.errors.first_name ? 'error' : undefined}
                label="First Name"
              >
                <Input
                  name="first_name"
                  placeholder="First Name"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </FormItem>
            </Col>
            <Col xs={24} sm={12}>
              <FormItem
                help={formik.touched.last_name && formik.errors.last_name ? formik.errors.last_name : ''}
                validateStatus={formik.touched.last_name && formik.errors.last_name ? 'error' : undefined}
                label="Last Name"
              >
                <Input
                  name="last_name"
                  placeholder="Last Name"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </FormItem>
            </Col>
            <Col xs={24} sm={12}>
              <FormItem
                help={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                validateStatus={formik.touched.email && formik.errors.email ? 'error' : undefined}
                label="Email"
              >
                <Input
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </FormItem>
            </Col>
            <Col xs={24} sm={12}>
              <FormItem
                help={formik.touched.phone_number && formik.errors.phone_number ? formik.errors.phone_number : ''}
                validateStatus={formik.touched.phone_number && formik.errors.phone_number ? 'error' : undefined}
                label="Phone Number"
              >
                <Input
                  name="phone_number"
                  placeholder="Phone Number"
                  value={formik.values.phone_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </FormItem>
            </Col>
            <Col xs={24} sm={12}>
              <FormItem
                help={formik.touched.subject && formik.errors.subject ? formik.errors.subject : ''}
                validateStatus={formik.touched.subject && formik.errors.subject ? 'error' : undefined}
                label="Subject"
              >
                <Input
                  name="subject"
                  placeholder="Subject"
                  value={formik.values.subject}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </FormItem>
            </Col>
            <Col xs={24} sm={12}>
              <FormItem
                help={formik.touched.message && formik.errors.message ? formik.errors.message : ''}
                validateStatus={formik.touched.message && formik.errors.message ? 'error' : undefined}
                label="Message"
              >
                <TextArea
                  name="message"
                  placeholder="Message"
                  showCount
                  maxLength={800}
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </FormItem>
            </Col>
          </Row>
          <FormItem>
            <Button type="primary" key="submit" htmlType="submit">
              Submit
            </Button>
          </FormItem>
        </Form>
      </Spin>
    </StyledForm>
  )
}

export default RegisterForm
