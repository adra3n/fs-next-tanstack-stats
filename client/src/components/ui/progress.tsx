import React from 'react'
import styles from '@/styles/animations.module.css'

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  progress: number // %0-100
  variant?: 'default' | 'green' | 'purple' | 'orange' | 'blue'
  fillDirection?: 'ltr' | 'rtl'
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  variant = 'default',
  fillDirection = 'ltr',
  className,
  ...rest
}) => {
  let progressBarColor = ''
  let fontColor = ''
  let bgColor = ''

  //colors
  switch (variant) {
    case 'green':
      progressBarColor = 'bg-green-400'
      fontColor = 'text-green-800'
      bgColor = 'bg-green-200'
      break
    case 'purple':
      progressBarColor = 'bg-purple-400'
      fontColor = 'text-purple-800'
      bgColor = 'bg-purple-200'
      break
    case 'orange':
      progressBarColor = 'bg-orange-400'
      fontColor = 'text-orange-800'
      bgColor = 'bg-orange-200'
      break
    case 'blue':
      progressBarColor = 'bg-blue-400'
      fontColor = 'text-blue-800'
      bgColor = 'bg-blue-200'
      break
    default:
      progressBarColor = 'bg-gray-800'
      fontColor = 'text-gray-700'
  }

  // progress direction
  const progressStyle = {
    width: `${progress}%`,
    maxWidth: '100%',
    [fillDirection === 'ltr' ? 'left' : 'right']: '0',
  }

  //align % text to left or right
  const textAlignment =
    fillDirection === 'ltr' ? 'justify-start' : 'justify-end'
  const textSpacing = fillDirection === 'ltr' ? 'ml-5' : 'mr-5'

  // fill animation
  const fillAnimation =
    fillDirection === 'ltr' ? styles.fillLTR : styles.fillRTL

  const roundedBorderDirection =
    fillDirection === 'ltr' ? 'rounded-r-3xl' : 'rounded-l-3xl'

  return (
    <div
      className={`my-10 h-14 overflow-hidden   relative ${bgColor}  ${className}`}
      {...rest}
    >
      <div
        className={`${progressBarColor}  w-full shadow-sm shadow-gray-400 h-14 absolute  ${roundedBorderDirection} ${fillAnimation}`}
        style={progressStyle}
      ></div>
      <div
        className={`h-full md:text-base text-xs absolute inset-0 flex items-center z-10 font-semibold ${fontColor}  ${textAlignment} ${textSpacing}`}
      >
        {progress}%
      </div>
    </div>
  )
}

export default ProgressBar
