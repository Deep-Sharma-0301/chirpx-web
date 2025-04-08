import { GraphQLClient } from 'graphql-request';

export const getGraphQLClient = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null;

  return new GraphQLClient('https://d2t6f6rfgd2p81.cloudfront.net/graphql', {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
};
