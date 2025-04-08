import { GraphQLClient } from 'graphql-request';

export const getGraphQLClient = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null;

  return new GraphQLClient('https://d2aewxzretzu52.cloudfront.net/ghraphql', {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
};
