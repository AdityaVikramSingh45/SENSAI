"use client"; // This must be a client component

import { SignIn, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  // Redirect if already signed in
  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  // Show SignIn only if not signed in
  if (isSignedIn) return null;

  return (
    <SignIn
      path="/sign-in"
      routing="path"
      signUpUrl="/sign-up"
      fallbackRedirectUrl="/onboarding"
      forceRedirectUrl="/onboarding"
    />
  );
};

export default Page;
