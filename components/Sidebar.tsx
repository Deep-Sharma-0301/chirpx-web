import Button, { Logo } from "@/components/Button";
import { BiHomeCircle } from "react-icons/bi";
import { FaHashtag } from "react-icons/fa6";
import { IoMailOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";
import { FiUser } from "react-icons/fi";

interface sideBarItems {
  title: string;
  icon: React.ReactNode;
}

const sideBarMenuItems: sideBarItems[] = [
  {
    title: "Home",
    icon: <BiHomeCircle size={24} />
  },
  {
    title: "Explore",
    icon: <FaHashtag size={24} />
  },
  {
    title: "Messages",
    icon: <IoMailOutline size={24} />
  },
  {
    title: "Notifications",
    icon: <IoIosNotificationsOutline size={24} />
  },
  {
    title: "Bookmarks",
    icon: <CiBookmark size={24} />
  },
  {
    title: "Profile",
    icon: <FiUser size={24} />
  }
];


export default function Sidebar() {
    return (
        <div>
                    <Logo></Logo>
                    <div className="flex flex-col gap-4">
                    {sideBarMenuItems.map((item, index) => (
                        <div
                          key={index}
                          style={{ marginBottom: '8px' }}
                          className="flex items-center gap-y-10 px-4 py-2 hover:bg-[#1d1f23] rounded-full cursor-pointer transition-colors duration-200"
                        >
                          <span style={{ margin: '5px 15px 5px 0'}}>{item.icon}</span>
                          <span className="font-semibold text-lg">{item.title}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <Button></Button>
                    </div>
        </div>
    )
}