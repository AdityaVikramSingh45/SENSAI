import React, { Suspense } from 'react'
import { PacmanLoader } from 'react-spinners'

const layout = ({children}) => {
  return (
    <div className='px-5'>
        <div className='flex items-center justify-between mb-5'>
            <h1 className='bg-gradient-to-b from-gray-400 via-gray-200 to-gray-600 font-extrabold tracking-tighter text-transparent bg-clip-text pb-2 pr-2 text-6xl'>Industry Insights</h1>
        </div>
        {/* <Suspense> is a special React component that lets you show a fallback UI (like a loader or skeleton) while some part of your UI is "waiting" (suspending) for data, code, or resources to load. */}
        <Suspense fallback={<PacmanLoader className='mt-4 flex justify-center items-center' width={"100%"} color='purple'/>}>
            {children}
        </Suspense>
    </div>
  )
}

export default layout