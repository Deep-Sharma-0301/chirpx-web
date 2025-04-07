import Image from "next/image"
import { CiHeart } from "react-icons/ci";
import { AiOutlineRetweet } from "react-icons/ai";
import { MdOutlineFileUpload } from "react-icons/md";
import { BiMessageRoundedDots } from "react-icons/bi";
import { Tweet } from "@/gql/graphql";
import { useRouter } from "next/navigation";

// ✅ Accept tweet as a prop
interface FeedCardProps {
  tweet: {
    id: string;
    content: string;
    imageURL?: string;
    author: {
      id?: string; // <-- added for routing
      name: string;
      profileImageURL?: string;
    };
  };
}
export default function FeedCard({ tweet }: FeedCardProps) {
  const router = useRouter();
  // const {data} = tweet
  console.log(tweet.imageURL)
  
  return (
    <div className="grid grid-cols-12 border-x border-b border-[#606060] p-[3%] hover-box">
      <div className="col-span-1 text-center">
        <Image
          src={tweet.author.profileImageURL || "https://via.placeholder.com/30"}
          alt="user-image"
          height={30}
          width={30}
          className="rounded-full mr-[10px]"
          onClick={() => router.push(`/${tweet?.author.id}`)}
        />
      </div>
      <div className="col-span-11 ml-[10px]">
      <h4>{tweet.author.name}</h4>
      <p className="text-sm mb-[5px]">{tweet.content}</p>

        {tweet.imageURL && (
          <div className="mt-2 max-h-[300px] max-w-full overflow-hidden rounded-lg">
            <img
              src={tweet.imageURL}
              alt="tweet-image"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex justify-between text-[20px] mt-[15px]">
          <div className="p-2 rounded-full hover:bg-[#1da1f233] transition-colors cursor-pointer">
            <BiMessageRoundedDots className="text-white" />
          </div>
          <div className="p-2 rounded-full hover:bg-[#1da1f233] transition-colors cursor-pointer">
            <AiOutlineRetweet className="text-white" />
          </div>
          <div className="p-2 rounded-full hover:bg-[#1da1f233] transition-colors cursor-pointer">
            <CiHeart className="text-white" />
          </div>
          <div className="p-2 rounded-full hover:bg-[#1da1f233] transition-colors cursor-pointer">
            <MdOutlineFileUpload className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
