import { Badge } from '@/components/ui/badge'
import { CardTitle } from '@/components/ui/card'
import Spinner from '@/components/ui/spinner'
import { ContentDetails } from '@/types/types'
import styles from '@/styles/animations.module.css'

interface StatsCardHeaderProps {
  thisYear: number
  thisYearDetails: ContentDetails['thisYear']
  isLoading: boolean
}

export function StatsCardHeader({
  thisYear,
  thisYearDetails,
  isLoading,
}: StatsCardHeaderProps) {
  const { averageReachRates, averageReachRateDifferences } = thisYearDetails

  return (
    <div className="flex justify-between items-center mb-6 ">
      <CardTitle className="text-4xl font-bold ">
        <Badge
          className={`px-5 sm:pr-12 py-1 h-20 rounded-l-none ${styles.slideRight}`}
          variant="secondary"
        >
          <h1 className=" sm:text-4xl text-xl">REACH RATE</h1>
        </Badge>
      </CardTitle>
      <Badge
        className={`sm:px-4 pl-2 py-1 text-sm h-20 rounded-r-none ${styles.slideRight}`}
        variant="secondary"
      >
        {!isLoading && thisYearDetails ? (
          <div className="flex flex-row items-center gap-5">
            <div className="sm:text-3xl text-lg font-bold text-orange-200">
              {averageReachRates.all}%
            </div>
            <div className="flex gap-2 sm:flex-row flex-col">
              <span
                className={`${
                  averageReachRateDifferences.all >= 0
                    ? 'text-green-500'
                    : 'text-red-600'
                }  text-xs font-semibold `}
              >
                {averageReachRateDifferences.all >= 0
                  ? `+${averageReachRateDifferences.all}% `
                  : `${averageReachRateDifferences.all}% `}
              </span>
              <span>in {thisYear}</span>
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </Badge>
    </div>
  )
}
