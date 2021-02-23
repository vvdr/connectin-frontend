import httpService from './http-service'

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
}

const GET_USER = `
  query {
    users {
      first_name
      last_name
      email
      company_name
      phone_number
      user_id
      invite_code
    }
  }
`

const UPDATE_USER = `
  mutation ($user_id: uuid!, $first_name: String!, $last_name: String!,  $company_name: String!,$phone_number: String!) {
    update_users_by_pk(pk_columns: {user_id: $user_id}, _set: { first_name: $first_name, last_name: $last_name, company_name: $company_name, phone_number: $phone_number}) {
      user_id,
      first_name,
      last_name,
      email,
      company_name,
      phone_number,
      invite_code
    }
  }
`

export const getUser = () => {
  const body = JSON.stringify({
    query: GET_USER,
  })

  return httpService.post('/graphql', body, axiosConfig)
}

export const updateUser = (variables : any) => {
  const body = JSON.stringify({
    query: UPDATE_USER,
    variables,
  })

  return httpService.post('/graphql', body, axiosConfig)
}
