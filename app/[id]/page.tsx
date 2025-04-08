export const dynamic = "force-dynamic"; // required for dynamic routing

import UserProfilePage from "@/components/UserProfile";
import { getUserByIdQuery } from "@/graphql/query/user";
import { getGraphQLClient } from "@/graphql/graphqlClient";
import { User } from "@/gql/graphql";

const client = getGraphQLClient();

async function getUserData(id: string): Promise<User> {
  const userInfo = await client.request(getUserByIdQuery, { id });
  return userInfo.getUserById as User;
}

// ✅ Fix for generateMetadata — await params
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return {
    title: `@${id}`,
  };
}

// ✅ Fix for main page component — await params
export default async function UserProfilePageWrapper({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userInfo = await getUserData(id);

  return <UserProfilePage userInfo={userInfo} />;
}
