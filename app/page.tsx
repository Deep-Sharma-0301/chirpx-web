import FeedCard from "@/components/FeedCard";
import SignupPage from "@/components/Signup";
import TweetCard from "@/components/TweetCard";
import Sidebar from "@/components/Sidebar"
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <div className="grid grid-cols-12 h-screen px-[250px] text-white bg-black w-fit">
      <div className="col-span-3 mt-[10px]">
      <Sidebar></Sidebar>
      </div>

      <div className="col-span-6 border-l border-r border-gray-700">
        <div>
          {/* {here set the condition that id user is logged in then only show this} */}
          <TweetCard></TweetCard>
        </div>
        <FeedCard></FeedCard>
        <FeedCard></FeedCard>
        <FeedCard></FeedCard>
        <FeedCard></FeedCard>
        <FeedCard></FeedCard>
        <FeedCard></FeedCard>
        <FeedCard></FeedCard>
      </div>
      <div className="col-span-3">
        <SignupPage></SignupPage>
      </div>
    </div>
  );
}
