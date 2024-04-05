import React from 'react'

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'red' | 'green'
}

const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  ...rest
}) => {
  let badgeClasses =
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold '

  switch (variant) {
    case 'secondary':
      badgeClasses += ' border-transparent bg-gray-800 text-gray-50 '
      break
    case 'red':
      badgeClasses +=
        ' border-transparent bg-red-200 text-red-800 hover:bg-red-300/80'
      break
    case 'green':
      badgeClasses +=
        ' border-transparent bg-green-200 text-green-800 hover:bg-green-300/80'
      break

    default:
      badgeClasses += ' border-transparent text-gray-900 '
  }

  return <div className={`${badgeClasses} ${className}`} {...rest} />
}

export { Badge }
