import axios from 'axios'
import { nanoid } from 'nanoid'
import bcrypt from 'bcrypt'

const hasuraEndpoint = `${process.env.CI_HASURA_GRAPQHL_ENDPOINT}/graphql`

const axiosConfig = {
  headers: {
    'x-hasura-admin-secret': process.env.CI_HASURA_ADMIN_SECRET,
  },
}

const SIGNUP_HASURA_OPERATION = `
  mutation ($email: String!, $first_name: String!, $last_name: String!, $password: String!, $company_name: String!,$phone_number: String!, $invite_code: String!) {
    insert_users_one(object: {email: $email, first_name: $first_name, last_name: $last_name, password: $password, company_name: $company_name, phone_number: $phone_number, invite_code: $invite_code}) {
      user_id,
      first_name,
      last_name,
      email,
      invite_code
    }
  }
`

export const registerUser = async (data: any) => {
  const {
    first_name, last_name, email, password, company_name, phone_number,
  } = data

  const hashedPassword = await bcrypt.hash(password, 10)

  const invite_code = `CI${nanoid(7)}`
  const variables = {
    first_name,
    last_name,
    email,
    password: hashedPassword,
    company_name,
    phone_number,
    invite_code,
  }

  const body = JSON.stringify({
    query: SIGNUP_HASURA_OPERATION,
    variables,
  })

  return axios.post(hasuraEndpoint, body, axiosConfig)
}
