"use client";

import { BsArrowLeftShort } from "react-icons/bs";
import { useCurrentUser } from "@/hooks/user";
import Sidebar from "@/components/Sidebar";
import FeedCard from "@/components/FeedCard";
import Image from "next/image";
import { useCallback, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Tweet, User } from "@/gql/graphql";
import { useRouter } from "next/navigation";

import {
  followUserMutation,
  unfollowUserMutation,
} from "@/graphql/mutations/user";
import { getGraphQLClient } from "@/graphql/graphqlClient";

const client = getGraphQLClient();


export default function UserProfilePage({ userInfo }: { userInfo: User }) {
  const router = useRouter()
  const { user: currentUser } = useCurrentUser();
  const queryClient = useQueryClient();

  const amIFollowing = useMemo(() => {
    if (!userInfo) return false;
    return (
      (currentUser?.following?.findIndex((el) => el?.id === userInfo?.id) ?? -1) >= 0
    );
  }, [currentUser?.following, userInfo]);

  const handleFollowUser = useCallback(async () => {
    if (!userInfo?.id) return;
    await client.request(followUserMutation as any, { to: userInfo?.id });
    await queryClient.invalidateQueries({ queryKey: ["curent-user"] });
  }, [userInfo?.id, queryClient]);

  const handleUnfollowUser = useCallback(async () => {
    if (!userInfo?.id) return;
    await client.request(unfollowUserMutation as any, { to: userInfo?.id });
    await queryClient.invalidateQueries({ queryKey: ["curent-user"] });
  }, [userInfo?.id, queryClient]);

  return (
    <div className="grid grid-cols-12 h-screen px-[250px] text-white bg-black w-fit">
      <div className="col-span-3 mt-[10px]">
        <Sidebar />
      </div>
      <div className="col-span-6 border-l border-r border-gray-700 ml-[16px]">
        <nav className="flex flex-start items-center ">
        <BsArrowLeftShort
            size={24}
            className="text-4xl cursor-pointer"
            onClick={() => {
                if (window.history.length > 1) {
                router.back();
                } else {
                router.push("/");
                }
            }}
            />          
            <div>
            <h1 className="text-xl" style={{fontSize:"16px",marginTop: "10px"}}>
              {userInfo?.firstName} {userInfo?.lastName}
            </h1>
            <h1 className="text-md text-slate-500" style={{fontSize:"10px", color:"grey"}}>
              {userInfo?.tweets?.length} Tweets
            </h1>
          </div>
        </nav>
        <div className="p-4 border-b border-slate-800 mt-[10px] ml-[10px]">
          {userInfo?.profileImageURL && (
            <Image
              src={userInfo?.profileImageURL}
              alt="user-image"
              className="rounded-full"
              width={100}
              height={100}
            />
          )}
          <h1 className="text-2xl font-bold mt-5">
            {userInfo?.firstName} {userInfo?.lastName}
          </h1>
          <div className="flex justify-between items-center mb-[20px]">
            <div className="flex gap-4 mt-2 text-sm text-gray-400">
              <span style={{marginRight:"10px"}}>{userInfo?.followers?.length} followers</span>
              <span>{userInfo?.following?.length} following</span>
            </div>
            {/* {currentUser?.id !== userInfo?.id && (
              <>
                {amIFollowing ? (
                  <button
                    onClick={handleUnfollowUser}
                    className="bg-white text-black px-3 py-1 rounded-full text-sm"
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={handleFollowUser}
                    className="bg-white text-black px-3 py-1 rounded-full text-sm"
                  >
                    Follow
                  </button>
                )}
              </>
            )} */}
          </div>
        </div>
        <div>
          {userInfo?.tweets?.map((tweet: any) => (
            <FeedCard key={tweet.id} tweet={tweet} />
          ))}
        </div>
      </div>
    </div>
  );
}
