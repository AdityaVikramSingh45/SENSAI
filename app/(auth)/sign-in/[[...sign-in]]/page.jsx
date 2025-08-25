"use client";

import { SignIn, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const Page = () => {
  const { isLoaded, isSignedIn } = useAuth(); // <-- add isLoaded
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // if (!isLoaded) return; // <-- wait until Clerk is ready

    if (!isLoaded) return <Loader2 className="animate-spin" />; // show loader until ready
    if (!isSignedIn) router.push("/sign-in"); // redirect only after loaded

    if (isSignedIn) {
      setIsRedirecting(true);
      const timeout = setTimeout(() => {
        router.replace("/dashboard");
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || isRedirecting) {
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
