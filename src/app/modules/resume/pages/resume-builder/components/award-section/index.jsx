import React from 'react'
import { AwardsForm } from './components'

const AwardSection = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-5 lg:gap-10">
      <AwardsForm />
    </div>
  )
}

export default AwardSection
