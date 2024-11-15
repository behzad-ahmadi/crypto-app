import clsx from 'clsx'
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children?: React.ReactNode
  loading?: boolean
  iconStart?: React.ReactNode
  iconEnd?: React.ReactNode
  disabled?: boolean
  size?: 'sm' | 'md'
}

export default function Button({
  className,
  children,
  loading,
  iconStart,
  iconEnd,
  size = 'md',
  ...props
}: ButtonProps) {
  {
    const sizeClasses = {
      sm: 'h-btn-sm text-base',
      md: 'h-btn-md text-lg',
    }

    return (
      <button
        className={clsx(
          'btn font-normal rounded-xl items-center flex',
          sizeClasses[size],
          className
        )}
        {...props}
        disabled={loading || props.disabled}
        type={props.type ? props.type : 'button'}
      >
        {iconStart}
        {children}
        {iconEnd}
        {loading && <span className='loading loading-spinner'></span>}
      </button>
    )
  }
}
