"use client";

import Image from "next/image";
import Button, { Logo } from "@/components/Button";
import { BiHomeCircle } from "react-icons/bi";
import { FaHashtag } from "react-icons/fa6";
import { IoMailOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { useCurrentUser } from "@/hooks/user";

interface SideBarItem {
  title: string;
  icon: React.ReactNode;
}

const sideBarMenuItems: SideBarItem[] = [
  { title: "Home", icon: <BiHomeCircle size={24} /> },
  { title: "Explore", icon: <FaHashtag size={24} /> },
  { title: "Messages", icon: <IoMailOutline size={24} /> },
  { title: "Notifications", icon: <IoIosNotificationsOutline size={24} /> },
  { title: "Bookmarks", icon: <CiBookmark size={24} /> },
  { title: "Profile", icon: <FiUser size={24} /> }
];

export default function Sidebar() {
  const currentUser = useCurrentUser();
  const user = currentUser?.data?.getCurrentUser;

  return (
    <div className="fixed top-0 left-0 h-screen w-[250px] flex flex-col justify-between px-4 py-6 bg-black z-50">
      <div>
        {/* Logo */}
        <Logo />

        {/* Sidebar menu */}
        <div className="flex flex-col">
          {sideBarMenuItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center mt-[10px] gap-4 px-4 py-2 hover:bg-[#1d1f23] rounded-full cursor-pointer transition-colors duration-200"
            >
              <span className="mr-[4px]">{item.icon}</span>
              <span className="font-semibold text-lg">{item.title}</span>
            </div>
          ))}
        </div>

        {/* Tweet Button */}
        <div className="mt-[6px]">
          <Button />
        </div>
      </div>

      {/* User profile section */}
      {user && (
        <div className="flex items-center gap-3 mb-[25px] px-2 py-2 hover:bg-[#1d1f23] rounded-full transition">
          <Image
            src={user.profileImageURL}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="font-medium">{user.firstName} {user.lastName}</span>
        </div>
      )}
    </div>
  );
}
