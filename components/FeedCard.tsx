import Image from "next/image"
import { CiHeart } from "react-icons/ci";
import { AiOutlineRetweet } from "react-icons/ai";
import { MdOutlineFileUpload } from "react-icons/md";
import { BiMessageRoundedDots } from "react-icons/bi";




export default function FeedCard() {
    return (
        <>
        <div className="grid grid-cols-12 border-x border-b border-[#606060] p-[3%] hover-box">
            <div className="col-span-1 text-center">
            <Image
                src="https://media.istockphoto.com/id/2058319417/photo/face-business-and-woman-with-arms-crossed-smile-and-career-with-teamwork-meeting-or-planning.jpg?s=1024x1024&w=is&k=20&c=n73xlUlMEXVSqOWcb17dIDLrz29noAKea6ZyIkfdC7w="
                alt="user-image"
                height={30}
                width={30}
                className="rounded-full mr-[10px]"
            />
            </div>
            <div className="col-span-11 ml-[10px]">
                <h4>Deep Sharma</h4>
                <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quae voluptas reiciendis repellendus. Magni modi libero suscipit cum a porro dolorem consequuntur, inventore laudantium nam labore expedita ratione eos harum.</p>
                <div className="flex justify-between text-[20px] mt-[15px]">
                    <div className="p-2 rounded-full hover:bg-[#1da1f233] transition-colors cursor-pointer">
                        <BiMessageRoundedDots className="text-white" />
                    </div>
                    <div className="p-2 rounded-full hover:bg-[#1da1f233] transition-colors cursor-pointer">
                        <AiOutlineRetweet className="text-white"/>
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
        </>
    )
}