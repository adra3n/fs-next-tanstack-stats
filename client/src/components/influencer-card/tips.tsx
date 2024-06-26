import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Metric } from '@/types/types'
import styles from '@/styles/animations.module.css'

interface ContentTipsProps {
  metrics: Metric[]
}

const ContentTips: React.FC<ContentTipsProps> = ({ metrics }) => {
  // sort metrics by change
  return (
    <div className="space-y-2 p-5">
      {metrics.map((metric, index) => (
        <div key={index} className={`slideIn ${styles.slideIn}`}>
          <div className="flex justify-between items-center">
            <Badge
              className={`px-3 py-1 w-20  justify-center ${
                metric.type === 'story'
                  ? 'bg-purple-300 hover:bg-purple-300/80'
                  : metric.type === 'reels'
                  ? 'bg-blue-300 hover:bg-blue-300/80'
                  : metric.type === 'static'
                  ? 'bg-orange-300 hover:bg-orange-300/80'
                  : 'bg-gray-200 hover:bg-gray-300/80'
              }`}
              variant="default"
            >
              {metric.type.toUpperCase()}
            </Badge>
            <div
              className={`sm:text-sm text-xs sm:text-start text-center ${
                metric.type === 'story'
                  ? 'text-purple-300'
                  : metric.type === 'static'
                  ? 'text-orange-300'
                  : metric.type === 'reels'
                  ? 'text-blue-300'
                  : 'text-gray-300'
              }`}
            >
              {metric.type === 'story'
                ? 'Story '
                : metric.type === 'static'
                ? 'Static Post '
                : metric.type === 'reels'
                ? 'Reels '
                : 'All '}
              {metric.category === 'reachRate' ? 'Reach Rate is ' : 'Count is '}
              {metric?.change ?? 0 > 0 ? 'up' : 'down'} by{' '}
              {Math.abs(metric?.change ?? 0)}%
            </div>
            <Badge
              className={`px-3 py-1 w-20 justify-center ${
                metric.change > 0
                  ? 'bg-green-400 hover:bg-green-300/80'
                  : 'bg-red-400 hover:bg-red-300/80'
              }`}
              variant="default"
            >
              {metric.change > 0 ? 'GREAT' : 'IMPROVE'}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ContentTips
