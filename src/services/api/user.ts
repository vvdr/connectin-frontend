import axios from 'axios';

const hasuraEndpoint = `${process.env.CI_HASURA_GRAPQHL_ENDPOINT}/graphql`;

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
`;

export const getUserWithEmail = async (email: string) => {
  const variables = {
    email,
  };

  const body = JSON.stringify({
    query: GET_USER_WITH_EMAIL_OPERATION,
    variables,
  });

  return axios.post(hasuraEndpoint, body);
};
