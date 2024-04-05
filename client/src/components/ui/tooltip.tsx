import React from 'react'

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
  position: { top: string; left: string }
}

const Tooltip: React.FC<TooltipProps> = ({ text, position }) => {
  return (
    <div
      className="absolute px-2 py-1 text-white text-xs rounded whitespace-nowrap z-10"
      style={{ top: position.top, left: position.left }}
    >
      {text}
    </div>
  )
}

export default Tooltip
