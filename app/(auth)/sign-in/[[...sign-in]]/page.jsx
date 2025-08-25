import { SignIn } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <SignIn
      path="/sign-in"
      routing="path"
      signUpUrl="/sign-up"
      fallbackRedirectUrl="/onboarding"   // redirect new users
      forceRedirectUrl="/onboarding"      // always redirect after login
    />
  )
}

export default page