import React from 'react'
import { AwardsForm, AwardsPreview } from './components'

const AwardSection = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-5 lg:gap-10">
      <AwardsForm />
      <AwardsPreview />
    </div>
  )
}

export default AwardSection
