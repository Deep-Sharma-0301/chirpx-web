'use client';

import { followUserMutation, unfollowUserMutation } from "@/graphql/mutations/user";
import { getGraphQLClient } from "@/graphql/graphqlClient";
import { useCurrentUser } from "@/hooks/user";
import { useCallback, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";

const client = getGraphQLClient()

interface Props {
  userInfoId: string;
  currentUserId: string | undefined;
  following: { id: string }[] | null | undefined;
}

export default function FollowButton({ userInfoId, currentUserId, following }: Props) {
  const queryClient = useQueryClient();

  const amIFollowing = useMemo(() => {
    return (following?.findIndex((f) => f?.id === userInfoId) ?? -1) >= 0;
  }, [following, userInfoId]);

  const handleFollowUser = useCallback(async () => {
    await client.request(followUserMutation as any, { to: userInfoId });
    await queryClient.invalidateQueries({ queryKey: ["curent-user"] });
  }, [userInfoId, queryClient]);

  const handleUnfollowUser = useCallback(async () => {
    await client.request(unfollowUserMutation as any, { to: userInfoId });
    await queryClient.invalidateQueries({ queryKey: ["curent-user"] });
  }, [userInfoId, queryClient]);

  if (!currentUserId || currentUserId === userInfoId) return null;

  return amIFollowing ? (
    <button onClick={handleUnfollowUser} className="bg-white text-black px-3 py-1 rounded-full text-sm">
      Unfollow
    </button>
  ) : (
    <button onClick={handleFollowUser} className="bg-white text-black px-3 py-1 rounded-full text-sm">
      Follow
    </button>
  );
}
