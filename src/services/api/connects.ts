import axios from 'axios'

const hasuraEndpoint = `${process.env.CI_HASURA_GRAPQHL_ENDPOINT}/graphql`

const axiosConfig = {
  headers: {
    'x-hasura-admin-secret': process.env.CI_HASURA_ADMIN_SECRET,
  },
}

const GET_CONNECT_BY_PK = `
  query SingleConnect {
    connects_by_pk(connect_id: "47a1ebd7-d410-47fa-affb-6a2710f7afc5"){
      connect_id
      frequency,
      next_reminder_date
    }  
  }
`

const UPDATE_CONNECT_FREQUENCY_OPERATION = `
  mutation updateConnectFrequency($connectId: String!, $next_reminder_date: String!){
    update_connects_by_pk(pk_columns: {connect_id: $connectId}, _set: {next_reminder_date: $next_reminder_date}) {
      connect_id
      frequency
    }
  }
`

export const updateReminderDate = async (connectId: string) => {
  const variables = {
    connectId,
  }

  const body = JSON.stringify({
    query: GET_CONNECT_BY_PK,
    variables,
  })

  const { data: { connects_by_pk } } = await axios.post(hasuraEndpoint, body, axiosConfig)
  const { frequency, next_reminder_date } = connects_by_pk

  console.log('FREQUENCY:__________ ', frequency)
  console.log('NEXT REMINDER DATE:__________ ', next_reminder_date)

  const updateBody = JSON.stringify({
    query: UPDATE_CONNECT_FREQUENCY_OPERATION,
    variables: {
      connectId,
      next_reminder_date,
    },
  })

  return axios.post(hasuraEndpoint, updateBody, axiosConfig)
}
