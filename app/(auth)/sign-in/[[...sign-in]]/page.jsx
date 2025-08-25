"use client";

import { SignIn, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const Page = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      setIsRedirecting(true); // show loader
      const timeout = setTimeout(() => {
        router.push("/dashboard");
      }, 1200); // small delay for smoother UX

      return () => clearTimeout(timeout);
    }
  }, [isSignedIn, router]);

  if (isRedirecting) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600 mb-4" />
        <p className="text-lg font-medium text-gray-700 animate-pulse">
          Redirecting you to your dashboard...
        </p>
      </div>
    );
  }

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



// "use client"; // This must be a client component

// import { SignIn, useAuth } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import React, { useEffect } from "react";

// const Page = () => {
//   const { isSignedIn, isLoaded } = useAuth();
//   const router = useRouter();

//   // Redirect if already signed in
//   useEffect(() => {
//     if (isSignedIn) {
//       router.push("/dashboard");
//     }
//   }, [isSignedIn, router]);

//   // While Clerk is loading
//   if (!isLoaded) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   // Show SignIn only if not signed in
//   if (isSignedIn) return null;

//   return (
//     <SignIn
//       path="/sign-in"
//       routing="path"
//       signUpUrl="/sign-up"
//       fallbackRedirectUrl="/onboarding"
//       forceRedirectUrl="/onboarding"
//     />
//   );
// };

// export default Page;
