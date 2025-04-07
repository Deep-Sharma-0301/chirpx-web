import { GraphQLClient } from 'graphql-request';

export const graphqlClient = new GraphQLClient('http://localhost:3000/graphql', {
  headers: () => {
    if (typeof window === 'undefined') return {}; // Skip on server

    const token = localStorage.getItem('jwt_token');

    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  },
});

// now by using this client we can make graohql request to the bakcned server.