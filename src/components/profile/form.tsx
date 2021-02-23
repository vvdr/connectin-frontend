import {
  Form, Input, Button, Row, Col,
} from 'antd'
/* eslint-disable no-unused-vars */

import * as yup from 'yup'
import { useFormik } from 'formik'
import styled from 'styled-components'

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
const passwordNotLongEnough = (length = 3) => `password must be at least ${length} characters`
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
  company_name: yup
    .string()
    .max(255)
    .required(requiredField('Company Name')),
  phone_number: yup
    .string()
    .max(255)
    .required(requiredField('Phone Number')),

})

const FormItem = Form.Item

type Props = {
  handleSubmit: (values: any)=> void
  initialValues: any
}

const EditProfileForm: React.FC<Props> = ({ handleSubmit, initialValues }: Props) => {
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema,
    enableReinitialize: true,
  })

  return (
    <StyledForm>
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
              label="Email / Username"
            >
              <Input
                name="email"
                placeholder="Email / Username"
                disabled
                value={formik.values.email}
                // onChange={(event) => {
                //   const formattedEmail = event.target.value.toLowerCase()
                //   formik.setFieldValue('email', formattedEmail)
                // }}
                onBlur={formik.handleBlur}
              />
            </FormItem>
          </Col>
          <Col xs={24} sm={12}>
            <FormItem
              help={formik.touched.company_name && formik.errors.company_name ? formik.errors.company_name : ''}
              validateStatus={formik.touched.company_name && formik.errors.company_name ? 'error' : undefined}
              label="Company Name"
            >
              <Input
                name="company_name"
                placeholder="Company Name"
                value={formik.values.company_name}
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

        </Row>
        <FormItem>

          <Button type="primary" key="submit" htmlType="submit">
            Submit
          </Button>
        </FormItem>
      </Form>

    </StyledForm>
  )
}

export default EditProfileForm