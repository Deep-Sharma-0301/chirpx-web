"use client"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const error = searchParams.get("error")

  // Determine the message to show
  let message = "Something went wrong during sign-in."
  if (error === "AccessDenied") {
    message = "Only Gmail accounts are allowed to sign in."
  } else if (error === "OAuthSignin") {
    message = "There was a problem signing in with Google."
  } else if (error === "Configuration") {
    message = "There’s a problem with the authentication configuration."
  }

  // Auto-redirect after 5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/")
    }, 5000)

    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Authentication Error</h1>
      <p className="text-gray-700 mb-2">{message}</p>
      <p className="text-sm text-gray-500">Redirecting back to signup...</p>
    </div>
  )
}
