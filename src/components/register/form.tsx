/* eslint-disable no-unused-vars */
import { useState } from 'react'
import {
  Form, Input, Button, Row, Col, Select,
} from 'antd'
import { User } from 'types/user'

import * as yup from 'yup'
import { useFormik } from 'formik'
import styled from 'styled-components'
import { getUserWithInviteCode } from 'services/api/user'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector'
import countriesData from 'country-region-data'

const { Option } = Select

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
  gender: yup
    .string()
    .required(requiredField('Gender')),
  birth_year: yup
    .number()
    .required(requiredField('Birth Year')),
  race: yup
    .string()
    .max(255)
    .required(requiredField('Race')),
  invite_code: yup
    .string()
    .max(12)
    .required(requiredField('Invite Code')),
  phone_number: yup
    .string()
    .max(255)
    .required(requiredField('Phone Number')),

  city: yup.string().required(requiredField('City')),
  state: yup.string().required(requiredField('State')),
  country: yup.string().required(requiredField('Country')),

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

type Props = {
  handleSubmit: (values: User)=> void
  initialValues: User
}

const RegisterForm: React.FC<Props> = ({ handleSubmit, initialValues }: Props) => {
  const [debounceT, setDebounceT] = useState<any>(null)

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  })

  const validateInviteCode = async (inviteCode: string) => {
    console.log('get inviter')
    try {
      const { data: { data: { users } } } = await getUserWithInviteCode(inviteCode)

      console.log('USERS ----', users)
      if (users.length) {
        const invitedBy = users[0].user_id
        console.log('INVIDED BY: ', invitedBy)
      }
    } catch (error) {
      console.log('SOMETHING WENT WRONG - REGISTER PAGE ')
    }
  }

  const handleInviteCodeChange = (event: any) => {
    const { value } = event.target
    console.log('HANLDE INVITE CODE', value)
    formik.setFieldValue('invite_code', value)

    if (debounceT) clearTimeout(debounceT)
    setDebounceT(setTimeout(() => (validateInviteCode(value)), 1000))
  }

  console.log('SDFSADFDSF', countriesData)
  // console.log('RAW DATA - ', CountryRegionData)
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
                value={formik.values.email}
                onChange={(event) => {
                  const formattedEmail = event.target.value.toLowerCase()
                  formik.setFieldValue('email', formattedEmail)
                }}
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
              help={formik.touched.gender && formik.errors.gender ? formik.errors.gender : ''}
              validateStatus={formik.touched.gender && formik.errors.gender ? 'error' : undefined}
              label="Gender"
            >
              <Select
                placeholder="Gender"
                style={{ width: 120 }}
                value={formik.values.gender}
                onChange={(value) => formik.setFieldValue('gender', value)}
                onBlur={formik.handleBlur}
                onSelect={formik.handleChange}
              >
                <Option value="">Select Gender</Option>
                <Option value="m">Male</Option>
                <Option value="f">Female</Option>
                <Option value="o">Other</Option>
              </Select>
            </FormItem>
          </Col>
          <Col xs={24} sm={12}>
            <FormItem
              help={formik.touched.race && formik.errors.race ? formik.errors.race : ''}
              validateStatus={formik.touched.race && formik.errors.race ? 'error' : undefined}
              label="Race"
            >
              <Select
                placeholder="Race"
                value={formik.values.race}
                onChange={(value) => formik.setFieldValue('race', value)}
                onBlur={formik.handleBlur}
                onSelect={formik.handleChange}
              >
                <Option value="">Select Race</Option>
                <Option value="american_indian_alaska_native">American Indian or Alaska Native</Option>
                <Option value="asian">Asian</Option>
                <Option value="black_african_american">Black or African American</Option>
                <Option value="hispanic_latino">Hispanic or Latino</Option>
                <Option value="native_hawaiian_other_pacific_islander">
                  Native Hawaiian or Other Pacific Islander
                </Option>
                <Option value="white">White</Option>
                <Option value="other">Other</Option>

              </Select>
            </FormItem>
          </Col>
          <Col xs={24} sm={12}>
            <FormItem
              help={formik.touched.birth_year && formik.errors.birth_year ? formik.errors.birth_year : ''}
              validateStatus={formik.touched.birth_year && formik.errors.birth_year ? 'error' : undefined}
              label="Birth Year"
            >
              <Input
                name="birth_year"
                type="number"
                placeholder="Birth Year"
                value={formik.values.birth_year}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormItem>
          </Col>
          <Col xs={24} sm={12}>
            <FormItem
              help={formik.touched.invite_code && formik.errors.invite_code ? formik.errors.invite_code : ''}
              validateStatus={formik.touched.invite_code && formik.errors.invite_code ? 'error' : undefined}
              label="Invitation Code"
            >
              <Input
                name="invite_code"
                placeholder="Invitation Code"
                value={formik.values.invite_code}
                onChange={formik.handleChange}
                onChangeCapture={handleInviteCodeChange}
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
              help={formik.touched.city && formik.errors.city ? formik.errors.city : ''}
              validateStatus={formik.touched.city && formik.errors.city ? 'error' : undefined}
              label="City"
            >
              <Input
                name="City"
                placeholder="City"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormItem>
          </Col>
          <Col xs={24} sm={12}>
            <FormItem
              label="State & Country"
              help={
                (formik.touched.country && formik.errors.country ? formik.errors.country : '')
                || (formik.touched.state && formik.errors.state ? formik.errors.state : '')
              }
              validateStatus={
                ((formik.touched.country && formik.errors.country)
                || (formik.touched.state && formik.errors.state)) ? 'error' : undefined
            }
            >
              <Row gutter={4}>
                <Col xs={24} sm={12}>
                  <Select
                    showSearch
                    placeholder="Country"
                    value={formik.values.country}
                    onChange={(value) => {
                      formik.setFieldValue('country', value)
                      formik.setFieldValue('state', '')
                    }}
                    onBlur={formik.handleBlur}
                    onSelect={formik.handleChange}
                    filterOption={
                      (input, option) => option.children
                        .toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="">Select Country</Option>
                    {
                  CountryRegionData.map((country) => (
                    <Option key={country[1]} value={country[1]}>{country[0]}</Option>
                  ))
                }

                  </Select>
                </Col>
                <Col xs={24} sm={12}>
                  <Select
                    placeholder="State"
                    showSearch
                    value={formik.values.state}
                    onChange={(value) => formik.setFieldValue('state', value)}
                    onBlur={formik.handleBlur}
                    onSelect={formik.handleChange}
                    filterOption={
                      (input, option) => option.children
                        .toLowerCase().indexOf(input.toLowerCase()) >= 0
}
                  >
                    <Option value="">Select State</Option>
                    {
                  formik.values.country && CountryRegionData
                    .filter((country) => country[1] === formik.values.country)[0][2].split('|').map((state) => {
                      const stateArr = state.split('~')
                      return (
                        <Option key={stateArr[1]} value={stateArr[1]}>{stateArr[0]}</Option>
                      )
                    })
                }
                  </Select>
                </Col>
              </Row>

              {/* <CountryDropdown
                value={formik.values.country || ''}
                onChange={(val) => {
                  formik.setFieldValue('country', val)
                  formik.setFieldValue('state', '')
                }}
              />
              <RegionDropdown
                country={formik.values.country || ''}
                value={formik.values.state || ''}
                onChange={(val) => formik.setFieldValue('state', val)}
              /> */}
            </FormItem>
          </Col>

          <Col xs={24} sm={12}>
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
          </Col>
          <Col xs={24} sm={12}>
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

export default RegisterForm
