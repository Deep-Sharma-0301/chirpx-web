import { GraphQLClient } from 'graphql-request';

export const getGraphQLClient = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('jwt_token') : null;

  return new GraphQLClient(process.env.NEXT_PUBLIC_API_URL as string, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
};
