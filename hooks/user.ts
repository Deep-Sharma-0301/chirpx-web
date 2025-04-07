import { getGraphQLClient } from "@/graphql/graphqlClient";
import { getCurrentUserQuery } from "@/graphql/query/user";
import { useQuery } from "@tanstack/react-query";

const client = getGraphQLClient();

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ["curent-user"],
    queryFn: () => client.request(getCurrentUserQuery),
  });

  return { ...query, user: query.data?.getCurrentUser };
};