import React from 'react'

const Card: React.FC<any> = ({ children, className, ...rest }) => {
  return (
    <div
      className={`rounded-lg border shadow-2xl shadow-black border-gray-800 bg-gray-900 text-gray-50 ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}

const CardHeader: React.FC<any> = ({ children, className, ...rest }) => {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...rest}>
      {children}
    </div>
  )
}

const CardTitle: React.FC<any> = ({ children, className, ...rest }) => {
  return (
    <h3
      className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
      {...rest}
    >
      {children}
    </h3>
  )
}

const CardContent: React.FC<any> = ({ children, className, ...rest }) => {
  return (
    <div className={` pt-0 ${className}`} {...rest}>
      {children}
    </div>
  )
}

const CardFooter: React.FC<any> = ({ children, className, ...rest }) => {
  return (
    <div className={`flex items-center p-6 pt-0 ${className}`} {...rest}>
      {children}
    </div>
  )
}

export { Card, CardHeader, CardTitle, CardContent, CardFooter }
