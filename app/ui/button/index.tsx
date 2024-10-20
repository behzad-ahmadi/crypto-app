import clsx from 'clsx'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        'rounded-md bg-blue-400 text-white px-4 py-2 hover:bg-blue-500',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
