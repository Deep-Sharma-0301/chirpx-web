export const dynamic = "force-dynamic"; // keep this for dynamic routing

import UserProfilePage from "@/components/UserProfile"; // or wherever you have the component
import { getUserByIdQuery } from "@/graphql/query/user";
import { getGraphQLClient } from "@/graphql/graphqlClient";
import { User } from "@/gql/graphql";

const client = getGraphQLClient();

async function getUserData(id: string): Promise<User> {
  const userInfo = await client.request(getUserByIdQuery, { id });
  return userInfo.getUserById as User;
}

export function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `@${params.id}`,
  };
}

export default async function UserProfilePageWrapper({ params }: { params: { id: string } }) {
  const userId = await Promise.resolve(params.id); // ✅ Force await to avoid the error
  const userInfo = await getUserData(userId);

  return <UserProfilePage userInfo={userInfo} />;
}
