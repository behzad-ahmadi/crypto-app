import clsx from 'clsx'
import React from 'react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  // Add any custom props or overrides here
}

export default function Select({ ...props }: SelectProps) {
  return (
    <select
      {...props}
      className={clsx('rounded-md p-2', 'bg-slate-700 !text-white')}
    >
      {/* Add options here */}
    </select>
  )
}
