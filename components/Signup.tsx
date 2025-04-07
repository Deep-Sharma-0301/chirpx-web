"use client"

import { getGraphQLClient } from "@/graphql/graphqlClient"
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user"
import { signIn, useSession, getSession } from "next-auth/react"
import Image from "next/image"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useCurrentUser } from "@/hooks/user";


const client = getGraphQLClient();

export default function GoogleSignInButton() {
  const { data: session, status } = useSession()
  const currentUser = useCurrentUser();
  const user = currentUser?.data?.getCurrentUser;

  useEffect(() => {
    const fetchAndExchangeToken = async () => {
      const currentSession = await getSession()
      const googleAuthToken = (currentSession as any)?.idToken // ✅ fix casing
  
      if (!googleAuthToken) {
        toast.error("No token found. Please try signing in again.")
        return
      }
  
      const toastId = toast.loading("Authenticating with backend...")
  
      try {
        const { verifyGoogleToken }: any = await client.request(
          verifyUserGoogleTokenQuery,
          { token: googleAuthToken }
        )
  
        localStorage.setItem("jwt_token", verifyGoogleToken) // ✅ correct value
  
        toast.success("Successfully signed in!", { id: toastId })
        console.log("🎯 Your App JWT:", verifyGoogleToken)
      } catch (err) {
        console.error("❌ Failed to exchange token:", err)
        toast.error("Token verification failed", { id: toastId })
      }
    }
  
    if (status === "authenticated") {
      fetchAndExchangeToken()
    }
  }, [status])
  if (user) {
    return (
      <div
        style={{
          marginTop: "10px",
          borderRadius: "10px",
          background: "grey",
          padding: "10px 15px 10px 10px",
          color: "white",
          textAlign: "center",
        }}
      >
        <p>Welcome, {user?.firstName} {user?.lastName} 👋</p>
      </div>
    )
  }

  return (
    <div
      style={{
        marginTop: "10px",
        borderRadius: "10px",
        background: "grey",
        padding: "10px 15px 10px 10px",
        color: "white",
      }}
    >
      <div
        style={{
          marginBottom: "8px",
          textAlign: "center",
          fontWeight: "600",
          backgroundColor: "#4B5563",
          borderRadius: "6px",
          padding: "6px 0",
        }}
      >
        Sign in Using Google
      </div>
      <button
        onClick={() => signIn("google")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 16px",
          border: "1px solid #D1D5DB",
          borderRadius: "6px",
          backgroundColor: "aliceblue",
          color: "black",
          marginLeft: "2px",
          marginTop: "10px",
          marginBottom: "10px",
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#dbeafe"
          e.currentTarget.style.transform = "scale(1.02)"
          e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "aliceblue"
          e.currentTarget.style.transform = "scale(1)"
          e.currentTarget.style.boxShadow = "none"
        }}
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
