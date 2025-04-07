"use client"

import { graphqlClient } from "@/client/api"
import { signIn, useSession, getSession } from "next-auth/react"
import Image from "next/image"
import { useEffect } from "react"

export default function GoogleSignInButton() {
  const { data: session, status } = useSession()

  useEffect(() => {
    const fetchAndExchangeToken = async () => {
      const currentSession = await getSession()
      const googlelAuthToken = (currentSession as any)?.accessToken

      if (googlelAuthToken) {
        try {
          const {jwtToken} = await graphqlClient.request('dummuy query', {token: googlelAuthToken })

          const data = await jwtToken.json()
          console.log("🎯 Your App JWT:", jwtToken)

          // Store it locally (you can also use cookies)
          localStorage.setItem("jwt_token", data.jwt)
        } catch (err) {
          console.error("❌ Failed to exchange token:", err)
        }
      }
    }

    if (status === "authenticated") {
      fetchAndExchangeToken()
    }
  }, [status])

  if (status === "authenticated") {
    return (
      <div className="bg-gray-800 text-white rounded-lg p-6 shadow-md text-center">
        <p>Welcome, {session?.user?.name} 👋</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-800 text-white rounded-lg p-6 shadow-md">
      <div className="mb-2 text-center font-semibold mt-[10px] bg-gray-600 text-white rounded py-1">
        Sign in Using Google
      </div>
      <button
        onClick={() => signIn("google")}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md 
                   bg-[aliceblue] text-black ml-[28px] mt-[10px] mb-[10px] transition-all duration-200 
                   hover:bg-blue-100 hover:scale-[1.02] hover:shadow-lg"
      >
        <Image
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google"
          width={20}
          height={20}
        />
        <span>Sign in with Google</span>
      </button>
    </div>
  )
}
