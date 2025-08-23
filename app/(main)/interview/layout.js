import React, { Suspense } from 'react'
import { PacmanLoader } from 'react-spinners'

const layout = ({children}) => {
  return (
    <div className="px-5">
      <Suspense
        fallback={<PacmanLoader className="mt-4 flex items-center justify-center" width={"100%"} color="purple" />}
      >
        {children}
      </Suspense>
    </div>
  )
}

export default layout