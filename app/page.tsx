'use client';

import FeedCard from "@/components/FeedCard";
import SignupPage from "@/components/Signup";
import TweetCard from "@/components/TweetCard";
import Sidebar from "@/components/Sidebar"
import { Toaster } from "react-hot-toast";
import { useGetAllTweets } from "@/hooks/tweet";


export default function Home() {
  const { tweets, isLoading, isError } = useGetAllTweets();

  return (
    <div className="grid grid-cols-12 h-screen px-[250px] text-white bg-black w-fit">
      <div className="col-span-3 mt-[10px]">
      <Sidebar></Sidebar>
      </div>

      <div className="col-span-6 border-l border-r border-gray-700 ml-[16px]">
        <TweetCard />

        {isLoading && <p className="text-center text-gray-400 mt-4">Loading tweets...</p>}
        {isError && <p className="text-center text-red-500 mt-4">Failed to load tweets.</p>}

        {tweets?.map((tweet: any) => (
          <FeedCard key={tweet.id} tweet={tweet} />
        ))}
      </div>


      <div className="col-span-3">
        <SignupPage></SignupPage>
      </div>
    </div>
  );
}
