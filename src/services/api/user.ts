import axios from 'axios'

const hasuraEndpoint = `${process.env.CI_HASURA_GRAPQHL_ENDPOINT}/graphql`

const axiosConfig = {
  headers: {
    'x-hasura-admin-secret': process.env.CI_HASURA_ADMIN_SECRET,
  },
}

const GET_USER_WITH_EMAIL_OPERATION = `
  query($email: String!) {
    users(where: {email: {_eq: $email}}) {
      email
      first_name
      last_name
      user_id
      password
    }
  }
`

const UPDATE_USER_PASSWORD_OPERATION = `
  mutation ($email: String!, $password: String!) {
    update_users(where: {email: {_eq: $email}}, _set: {password: $password}){
      affected_rows
    }
  }
`

export const getUserWithEmail = async (email: string) => {
  const variables = {
    email,
  }

  const body = JSON.stringify({
    query: GET_USER_WITH_EMAIL_OPERATION,
    variables,
  })

  return axios.post(hasuraEndpoint, body, axiosConfig)
}

export const updateUserPassword = async (email: string, password: string) => {
  const variables = {
    email,
    password,
  }

  const body = JSON.stringify({
    query: UPDATE_USER_PASSWORD_OPERATION,
    variables,
  })

  return axios.post(hasuraEndpoint, body, axiosConfig)
}
