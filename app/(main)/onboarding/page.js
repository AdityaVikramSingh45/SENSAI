import { industries } from '@/data/industries'
import React from 'react'
import OnBoardingForm from './_components/OnBoardingForm'
import { getUserOnboardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation'


const OnBoardingPage = async() => {
  //check if user is already onboarding
  const {isOnboarded} = await getUserOnboardingStatus();

  if(isOnboarded){
    redirect("/dashboard");
  }

  return (
    <main> 
      <OnBoardingForm industries={industries} />
    </main>
  )
}

export default OnBoardingPage