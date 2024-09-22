import React from 'react'

const ActionColumnFormatter = ({action}) => {
  return (
    <strong className="text-[0.5rem] px-2 py-1 rounded-lg bg-primary/10 text-primary capitalize">
    {action}
  </strong>
  )
}

export default ActionColumnFormatter
