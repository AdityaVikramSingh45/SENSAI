import { getUserOnboardingStatus } from '@/actions/user';
import { redirect } from 'next/navigation';
import React from 'react'

const IndustryInsightPage = async() => {

const {isOnboarded} = await getUserOnboardingStatus();

  if(!isOnboarded){
    redirect("/onboarding");
  }

  return (
    <div>
    </div>
  )
}

export default IndustryInsightPage