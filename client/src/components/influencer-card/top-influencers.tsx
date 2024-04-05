import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { ContentData } from '@/types/types'
import { getTopInfluencersByYear } from '@/utils/calculations'
import styles from '@/styles/animations.module.css'
import Tooltip from '@/components/ui/tooltip'

interface TopInfluencersProps {
  data: ContentData[]
  year: number
}

const TopInfluencers: React.FC<TopInfluencersProps> = ({ data, year }) => {
  const topInfluencersThisYear = getTopInfluencersByYear(data, year, 3)
  const topInfluencersLastYear = getTopInfluencersByYear(data, year - 1, 3)
  const [tooltipText, setTooltipText] = useState('')
  const [tooltipPosition, setTooltipPosition] = useState<{
    top: string
    left: string
  }>({ top: '0', left: '0' })

  const handleBadgeMouseEnter = (
    name: string,
    count: number,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setTooltipText(`${name}: ${count}`)
    const rect = event.currentTarget.getBoundingClientRect()
    setTooltipPosition({ top: `${rect.top - 30}px`, left: `${rect.left}px` })
  }

  const handleBadgeMouseLeave = () => {
    setTooltipText('')
  }
  return (
    <div className="flex flex-row justify-between items-center w-full h-16 sm:gap-5  my-5 sm:px-5 px-1 bg-gray-800 ">
      <div className="flex justify-center items-center gap-1">
        {topInfluencersThisYear.map((influencer, index) => (
          <Badge
            key={index}
            className={`sm:h-10 sm:w-10 w-7 h-7 flex items-center justify-center bg-gray-100 text-gray-800 ${styles['fade-in']} hover:animate-spin`}
            onMouseEnter={(event) =>
              handleBadgeMouseEnter(influencer.name, influencer.count, event)
            }
            onMouseLeave={handleBadgeMouseLeave}
          >
            {influencer.name}
          </Badge>
        ))}
      </div>
      <div className=" font-light text-gray-100 text-center sm:text-sm text-[0.6rem]">
        <p>
          <span className="font-extrabold ">TOP 3 INFLUENCERS</span> BY REACH
          RATE
        </p>
      </div>
      <div className="flex   justify-center items-center gap-1">
        {topInfluencersLastYear.map((influencer, index) => (
          <Badge
            key={index}
            className={`sm:h-10 sm:w-10 w-7 h-7 flex items-center justify-center bg-gray-100 text-gray-800 ${styles['fade-in']} hover:animate-spin`}
            onMouseEnter={(event) =>
              handleBadgeMouseEnter(influencer.name, influencer.count, event)
            }
            onMouseLeave={handleBadgeMouseLeave}
          >
            {influencer.name}
          </Badge>
        ))}
        {tooltipText && (
          <Tooltip text={tooltipText} position={tooltipPosition} />
        )}
      </div>
    </div>
  )
}

export default TopInfluencers
