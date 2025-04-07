import { GraphQLClient } from 'graphql-request';

export const getGraphQLClient = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null;

  return new GraphQLClient('http://localhost:8000/graphql', {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
};
