import { SignUp } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <SignUp
    path="/sign-up"
    routing="path"
    signInUrl="/sign-in"
    fallbackRedirectUrl="/onboarding"
    forceRedirectUrl="/onboarding"
  />
  )
}

export default page