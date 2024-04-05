import React from 'react'
import { Metric } from '@/types/types'
import { Badge } from '@/components/ui/badge'
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
              className={`px-3 py-1  ${
                metric.type === 'story'
                  ? 'bg-purple-300 hover:bg-purple-300/80'
                  : metric.type === 'reels'
                  ? 'bg-blue-300'
                  : metric.type === 'static'
                  ? 'bg-orange-300 hover:bg-orange-300/80'
                  : 'bg-gray-200 hover:bg-gray-300/80'
              }`}
              variant="default"
            >
              {metric.type.toUpperCase()}
            </Badge>
            <div
              className={`text-sm  ${
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
              {metric.change > 0 ? 'up' : 'down'} by {Math.abs(metric.change)}%
            </div>
            <Badge
              className={`px-3 py-1 ${
                metric.change > 0 ? 'bg-green-400' : 'bg-red-400'
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
