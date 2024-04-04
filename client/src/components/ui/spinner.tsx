import React from 'react'
interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {}
const Spinner: React.FC<SpinnerProps> = ({ className, ...rest }) => {
  return (
    <div
      className={`flex justify-center items-center h-full ${className}`}
      {...rest}
    >
      <div className="animate-spin rounded-full border-t-2 border-b-2 border-gray-500 dark:border-white  h-12 w-12"></div>
    </div>
  )
}

export default Spinner
