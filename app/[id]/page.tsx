// import Sidebar from "@/components/Sidebar"
// import SignupPage from "@/components/Signup"
// import Image from "next/image";
// import { BsArrowLeftShort } from "react-icons/bs";
// import FeedCard from "@/components/FeedCard";
// import { graphqlClient } from "@/graphql/graphqlClient";
// import { getUserByIdQuery } from "@/graphql/query/user";
// import { Tweet, User } from "@/gql/graphql";

// interface Props {
//     params: {
//       id: string;
//     };
//   }

// export default async function Profile({ params }: Props){
//     const userInfoResponse = await graphqlClient.request(getUserByIdQuery, {
//         id: params.id,
//       });
    
//       const userInfo = userInfoResponse?.getUserById as User | undefined;
    
//       if (!userInfo) {
//         return <div>User not found</div>;
//       }
//     return (
//         <div className="grid grid-cols-12 h-screen px-[250px] text-white bg-black w-fit">
//               <div className="col-span-3 mt-[10px]">
//               <Sidebar></Sidebar>
//               </div>
        
//               <div>
//         <nav className="flex items-center gap-3 py-3 px-3">
//           <BsArrowLeftShort className="text-4xl" />
//           <div>
//             <h1 className="text-2xl font-bold">
//               {userInfo.firstName} {userInfo.lastName}
//             </h1>
//             <h1 className="text-md font-bold text-slate-500">
//               {userInfo.tweets?.length} Tweets
//             </h1>
//           </div>
//         </nav>
//         <div className="p-4 border-b border-slate-800">
//           {userInfo.profileImageURL && (
//             <Image
//               src={userInfo.profileImageURL}
//               alt="user-image"
//               className="rounded-full"
//               width={100}
//               height={100}
//             />
//           )}
//           <h1 className="text-2xl font-bold mt-5">
//             {userInfo.firstName} {userInfo.lastName}
//           </h1>
//           <div className="flex justify-between items-center">
//             <div className="flex gap-4 mt-2 text-sm text-gray-400">
//               <span>{userInfo.followers?.length} followers</span>
//               <span>{userInfo.following?.length} following</span>
//             </div>
//             {/* Follow/unfollow button moved to client component */}
//           </div>
//         </div>

//         <div>
//           {userInfo.tweets?.map((tweet) => (
//             <FeedCard data={tweet as Tweet} key={tweet?.id} />
//           ))}
//         </div>
//       </div>
//               <div className="col-span-3">
//                 <SignupPage></SignupPage>
//               </div>
//             </div>
//     )
// }