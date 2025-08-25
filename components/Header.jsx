
"use client";

import React from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  ChevronDown,
  FileText,
  GraduationCap,
  LayoutDashboard,
  StarIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/10">
      <nav className="flex justify-between container items-center mx-auto py-1">
        {/* Logo */}
        <Link href={"/"}>
          <Image
            alt="SENSAI LOGO"
            src={"/logo.png"}
            width={200}
            height={60}
            className="h-12 py-1 w-auto object-contain"
          />
        </Link>

        {/* Right side */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Show only if signed in */}
          <SignedIn>
            <Link href={"/dashboard"}>
              <Button variant={"outline"}>
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden md:block">Industry Insights</span>
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <StarIcon className="h-4 w-4" />
                  <span className="hidden md:block">Growth Tools</span>
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href={"/resume"} className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Build Resume</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={"/interview"} className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    <span>Interview Prep</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User button */}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              fallbackRedirectUrl="/"
            />
          </SignedIn>

          {/* Show only if signed out */}
          <SignedOut>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
};

export default Header;

// "use client"

// import React from "react";
// import {
//   SignInButton,
//   SignUpButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
// } from "@clerk/nextjs";
// import Link from "next/link";
// import Image from "next/image";
// import { Button } from "./ui/button";
// import {
//   ChevronDown,
//   FileText,
//   GraduationCap,
//   LayoutDashboard,
//   PenBox,
//   StarIcon,
// } from "lucide-react";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// const Header = ({user}) => {
//   // await checkUser();
//   return (
//     <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/10">
//       <nav className="flex justify-between container items-center mx-auto py-1">
//         <Link href={"/"}>
//           <Image
//             alt="SENSAI LOGO"
//             src={"/logo.png"}
//             width={200}
//             height={60}
//             className="h-12 py-1 w-auto object-contain"
//           />
//         </Link>

//         <div className="flex items-center space-x-2 md:space-x-4">
//           <SignedIn asChild>
//             <Link href={"/dashboard"}>
//               <Button variant={"outline"}>
//                 <LayoutDashboard className="h-4 w-4" />
//                 <span className="hidden md:block">Industry Insights</span>
//               </Button>
//             </Link>

//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button>
//                   <StarIcon className="h-4 w-4" />
//                   <span className="hidden md:block">Growth Tools</span>
//                   <ChevronDown />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent>
//                 <DropdownMenuItem>
//                   <Link href={"/resume"} className="flex items-center gap-2">
//                     <FileText className="h-4 w-4" />
//                     <span>Build Resume</span>
//                   </Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                   <Link href={"/interview"} className="flex items-center gap-2">
//                     <GraduationCap className="h-4 w-4" />
//                     <span>Interview Prep</span>
//                   </Link>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </SignedIn>

//           <SignedOut>
//             <SignInButton asChild>
//               <Button>Sign In</Button>
//             </SignInButton>
//           </SignedOut>
//           <SignedIn>
//             <UserButton
//              appearance={{
//                 elements:{
//                     avatarBox: "w-10 h-10",
//                     userButtonPopoverCard: "shadow-xl",
//                     userPreviewMainIdentifier: "font-semibold"
//                 }
//              }}
//              fallbackRedirectUrl="/"
//             />
//           </SignedIn>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;