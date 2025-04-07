'use client';

import Image from "next/image";
import { BiImageAlt } from "react-icons/bi";
import Button from "./Button";
import { useCallback } from "react";

export default function TweetCard() {
  const handleImageSelector = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-12 border-x border-b border-[#606060] p-[3%] hover-box mt-[10px]">
        <div className="col-span-1 text-center">
          <Image
            src="https://media.istockphoto.com/id/2058319417/photo/face-business-and-woman-with-arms-crossed-smile-and-career-with-teamwork-meeting-or-planning.jpg?s=1024x1024&w=is&k=20&c=n73xlUlMEXVSqOWcb17dIDLrz29noAKea6ZyIkfdC7w="
            alt="user-image"
            height={30}
            width={30}
            className="rounded-full mr-[10px]"
          />
        </div>
        <div className="col-span-11 ml-[10px] mt-[5px]">
          <textarea
            placeholder="What's happening?"
            rows={5}
            className="bg-transparent border-0 border-b border-slate-700 w-full text-white placeholder-gray-400 focus:outline-none focus:border-b"
          />
          <div className="p-2 rounded-full hover:bg-[#1da1f233] transition-colors cursor-pointer w-fit">
            <BiImageAlt onClick={handleImageSelector} className="text-white" />
          </div>
          <div className="text-center -ml-[25px]">
            <Button />
          </div>
        </div>
      </div>
    </div>
  );
}
