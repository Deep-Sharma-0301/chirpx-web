// app/[id]/page.tsx
export const dynamic = "force-dynamic";

import { Metadata } from "next";
import UserProfilePage from "@/components/UserProfile";
import { getGraphQLClient } from "@/graphql/graphqlClient";
import { getUserByIdQuery } from "@/graphql/query/user";
import { User } from "@/gql/graphql";

const client = getGraphQLClient();

async function getUserData(id: string): Promise<User> {
  const userInfo = await client.request(getUserByIdQuery, { id });
  return userInfo.getUserById as User;
}

// ✅ Metadata function with correct signature
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: `@${params.id}`,
  };
}

// ✅ Component with explicit type, no Promise confusion
export default async function Page({
  params,
}: {
  params: { id: string };
}) {
  const userInfo = await getUserData(params.id);
  return <UserProfilePage userInfo={userInfo} />;
}
