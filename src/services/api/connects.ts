import axios from 'axios'
import moment from 'moment-timezone'

const hasuraEndpoint = `${process.env.CI_HASURA_GRAPQHL_ENDPOINT}/graphql`

const axiosConfig = {
  headers: {
    'x-hasura-admin-secret': process.env.CI_HASURA_ADMIN_SECRET,
  },
}

const GET_CONNECT_BY_PK = `
  query SingleConnect($connectId: uuid! ) {
    connects_by_pk(connect_id: $connectId){
      connect_id
      frequency
      next_reminder_date
      email
      first_name
      last_name
      company_name
      phone_number

      user{
        first_name
        last_name
        email
      }
    }  
  }
`

const UPDATE_CONNECT_FREQUENCY_OPERATION = `
  mutation updateConnectFrequency($connectId: uuid!, $next_reminder_date: timestamp!){
    update_connects_by_pk(pk_columns: {connect_id: $connectId}, _set: {next_reminder_date: $next_reminder_date}) {
      connect_id
      frequency
    }
  }
`

const GET_CONNECTS_OF_DAY = `
  query getConnectsOfDay($start_time: timestamp!, $end_time: timestamp! )  {
    connects(where: {next_reminder_date: {_gte: $start_time,
      _lte: $end_time }}) {
      first_name
      connect_id
    }
  }
`

export const getConnectById = (connectId: string) => {
  const variables = {
    connectId,
  }

  const body = JSON.stringify({
    query: GET_CONNECT_BY_PK,
    variables,
  })

  return axios.post(hasuraEndpoint, body, axiosConfig)
}

export const updateReminderDate = async (connectId: string) => {
  const { data: { data: { connects_by_pk } } } = await getConnectById(connectId)

  // console.log('DATA______', data)
  const { frequency, next_reminder_date } = connects_by_pk

  console.log('FREQUENCY:__________ ', frequency)
  console.log('NEXT REMINDER DATE:__________ ', next_reminder_date)

  let updatedNextReminderDate = next_reminder_date
  switch (frequency) {
    case '30-days':
      updatedNextReminderDate = moment(next_reminder_date).add('30', 'days').toISOString()
      console.log('INSIDE 30 DAYS')
      break

    case '60-days':
      console.log('INSIDE 60 DAYS')
      updatedNextReminderDate = moment(next_reminder_date).add('60', 'days').toISOString()
      break

    case '90-days':
      console.log('INSIDE 90 DAYS')
      updatedNextReminderDate = moment(next_reminder_date).add('90', 'days').toISOString()
      break

    case '180-days':
      console.log('INSIDE 180 DAYS')
      updatedNextReminderDate = moment(next_reminder_date).add('160', 'days').toISOString()
      break

    case 'yearly':
      console.log('INSIDE 180 DAYS')
      updatedNextReminderDate = moment(next_reminder_date).add('1', 'year').toISOString()
      break

    default:
      break
  }

  console.log('NEX REMINDER DATA UDPATED', updatedNextReminderDate)

  const updateBody = JSON.stringify({
    query: UPDATE_CONNECT_FREQUENCY_OPERATION,
    variables: {
      connectId,
      next_reminder_date: updatedNextReminderDate,
    },
  })

  return axios.post(hasuraEndpoint, updateBody, axiosConfig)
}

export const getTodayConnects = async () => {
  console.log('INSIDE GET TODAY CONNECTS API SERVICE')

  const start_time = moment.utc().startOf('day').toISOString()
  const end_time = moment.utc().endOf('day').toISOString()
  const variables = {
    start_time,
    end_time,
  }

  const body = JSON.stringify({
    query: GET_CONNECTS_OF_DAY,
    variables,
  })

  const { data: { data } } = await axios.post(hasuraEndpoint, body, axiosConfig)

  console.log('DATA')
  return data.connects.map((connect: any) => (connect.connect_id))
}
