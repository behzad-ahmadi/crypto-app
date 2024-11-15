import clsx from 'clsx'
import React from 'react'

export default function Select({
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={clsx('rounded-md p-2', 'bg-slate-700 !text-white')}
    >
      {/* Add options here */}
    </select>
  )
}
