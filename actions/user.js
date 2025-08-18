import { industries } from "@/data/industries";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function updatedUser(data){
    const {userId} = await auth();
    if(!userId) return new Error("Unauthoried");

    const user = await db.user.findUnique({
        where:{
            clerkUserId: userId
        }
    });

    if(!user) return new Error("User not found");
    try{
        const result = await db.$transaction(
            async(tx)=>{
                //find if the industry exists
                let industryInsight = await tx.industryInsight.findUnique({
                    where:{
                        industry: data.industry
                    }
                });

                //if industry doesn't exist, create with default values
                if(!industryInsight){
                    industryInsight = await tx.industryInsight.create({
                        data:{
                            industry: data.industry,
                            salaryRanges: [],
                            growthRate: 0,
                            demandLevel: "Medium",
                            topSkills: [],
                            marketOutlook: "Neutral",
                            keyTrends: [],
                            recommendedSkills: [],
                            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 ) // 1 week from now
                        },
                    })
                }

                // Update the user
                const updatedUser = await tx.user.update({
                    where: {
                        id: user.id,
                    },
                    data:{
                        industry: data.industry,
                        experience: data.experience,
                        bio: data.bio,
                        skills: data.skills
                    },
                })
                return {updatedUser, industryInsight}
        },
        {
            timeout: 10000
        });

        return result.user;
    }        
    catch(error){
        console.error("Error updating user and industry:", error.message);
        throw new Error("Failed to update profile");
    }
}


export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
    select: {
      industry: true, // only fetch what we need
    },
  });

  if (!user) throw new Error("User not found");

  try {
    return {
      isOnboarded: !!user.industry, // true if industry exists
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status");
  }
}


// !! is a double NOT operator in JavaScript.
// It’s a trick to convert any value into a strict boolean (true or false).

// export async function getUserOnboardingStatus() {
//     const {userId} = await auth();
//     if(!userId) return new Error("Unauthoried");

//     const user = await db.user.findUnique({
//         where:{
//             clerkUserId: userId
//         }
//     });

//     if(!user) return new Error("User not found");
//     try{
//         const userId = await db.user.findUnique({
//             where: {
//                 clerkUserId: userId,
//             },
//             select:{
//                 industry: true
//             }
//         })
//         return {
//             isOnboarded: !!user?.industry
//         }
//     }
//     catch(error){
//         console.error("Error checking onboarding status:", error);
//         throw new Error("Failed to check onboarding status");
//     }
// }




// // Why use $transaction here?


// // Because you’re:
// // Checking for an industry insight
// // Possibly creating one
// // Updating the user

// If one step fails, you don’t want a weird case like:
// Industry insight got created ✅
// But user update failed ❌
// That would leave your database in an inconsistent state. $transaction avoids this.

// tx = temporary Prisma client bound to this one transaction.
// Always use tx inside $transaction.