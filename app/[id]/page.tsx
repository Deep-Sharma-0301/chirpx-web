export const dynamic = "force-dynamic"; // keep this for dynamic routing

import UserProfilePage from "@/components/UserProfile";
import { getUserByIdQuery } from "@/graphql/query/user";
import { getGraphQLClient } from "@/graphql/graphqlClient";
import { User } from "@/gql/graphql";

const client = getGraphQLClient();

async function getUserData(id: string): Promise<User> {
  const userInfo = await client.request(getUserByIdQuery, { id });
  return userInfo.getUserById as User;
}

// ✅ Properly typed metadata function
export function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `@${params.id}`,
  };
}

// ✅ Correct usage of `params` prop
type PageProps = {
  params: {
    id: string;
  };
};

export default async function UserProfilePageWrapper({ params }: PageProps) {
  const userInfo = await getUserData(params.id);
  return <UserProfilePage userInfo={userInfo} />;
}
