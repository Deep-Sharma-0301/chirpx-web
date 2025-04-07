'use client';

import Image from "next/image";
import { BiImageAlt } from "react-icons/bi";
import Button from "./Button";
import { useCallback, useRef, useState } from "react";
import { useCreateTweet } from "@/hooks/tweet";
import { getGraphQLClient } from "@/graphql/graphqlClient";
import { getSignedURLForTweetQuery } from "@/graphql/query/tweet";
import toast from "react-hot-toast";
import axios from "axios";
import { useCurrentUser } from "@/hooks/user";

const client = getGraphQLClient()

export default function TweetCard() {
  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const currentUser = useCurrentUser();
  const user = currentUser?.data?.getCurrentUser

  const { mutateAsync } = useCreateTweet();

  const handleImageSelector = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const { getSignedURLForTweet } = await client.request(
      getSignedURLForTweetQuery,
      {
        imageName: file.name,
        imageType: file.type,
      }
    );

    if (getSignedURLForTweet) {
      toast.loading("Uploading image...", { id: "upload-toast" });

      await axios.put(getSignedURLForTweet, file, {
        headers: { "Content-Type": file.type },
      });

      toast.success("Upload complete!", { id: "upload-toast" });

      const url = new URL(getSignedURLForTweet);
      const myFilePath = `${url.origin}${url.pathname}`;
      setImageURL(myFilePath);
    }
  };

  const handleCreateTweet = async () => {
    await mutateAsync({
      content,
      imageURL,
    });
    setContent("");
    setImageURL("");
  };

  return (
    <div className="grid grid-cols-12 border-x border-b border-[#606060] p-[3%] hover-box mt-[10px]">
      <div className="col-span-1 text-center">
        <Image
          src={user?.profileImageURL || "https://via.placeholder.com/30" }
          alt="user-image"
          height={30}
          width={30}
          className="rounded-full mr-[10px]"
        />
      </div>

      <div className="col-span-11 ml-[10px] mt-[5px] text-white">
        <textarea
          placeholder="What's happening?"
          rows={5}
          value={content}
          style={{color:"white"}}
          onChange={(e) => setContent(e.target.value)}
          className="bg-transparent border-0 border-b border-slate-700 w-full text-white placeholder-gray-400 focus:outline-none focus:border-b"
        />

        <div
          className="p-2 rounded-full hover:bg-[#1da1f233] transition-colors cursor-pointer w-fit"
          onClick={handleImageSelector}
        >
          <BiImageAlt className="text-white text-[22px]" />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {imageURL && (
          <div className="flex items-center gap-2 mt-[4px] mb-2 px-3 py-2 rounded-md w-fit">
            <span className="text-white text-[10px]">
              ✅ <span className="text-green-400">Uploaded:</span> {imageURL.split("/").pop()}
            </span>
          </div>
        )}

        <div className="text-center -ml-[25px]" onClick={handleCreateTweet}>
          <Button />
        </div>
      </div>
    </div>
  );
}
