import clsx from 'clsx'

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  className?: string
  containerClassName?: string
}

const defaultProps: InputTextProps = {
  label: '',
  error: '',
  className: '',
}

export default function InputText({
  label,
  error,
  className,
  containerClassName,
  ...props
}: InputTextProps = defaultProps) {
  return (
    <div className={containerClassName}>
      {label && <label>{label}</label>}
      <input
        {...props}
        className={clsx(
          'rounded-md p-2',
          'bg-slate-700 !text-white',
          className
        )}
      />
      {error && <p className='text-red-600'>{error}</p>}
    </div>
  )
}
