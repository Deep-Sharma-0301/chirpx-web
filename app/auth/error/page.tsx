import { Suspense } from "react";
import AuthError from "@/components/Error";

export default function ErrorPage() {
  return (
    <Suspense fallback={<div>Loading error...</div>}>
      <AuthError />
    </Suspense>
  );
}
