import React from 'react'
import ProgressBar from '@/components/ui/progress'
import { ContentDetails } from '@/types/types'

interface CompareBarsProps {
  thisYear: number
  thisYearDetails: ContentDetails['thisYear']
  lastYearDetails: ContentDetails['lastYear']
  isLoading: boolean
}

export function CompareBars({
  thisYear,
  thisYearDetails,
  lastYearDetails,
}: CompareBarsProps) {
  const barTypes = ['story', 'static', 'reels']

  const {
    averageReachRates,
    counts,
    relativeCounts,
    averageReachRateDifferences,
  } = thisYearDetails

  const {
    averageReachRates: lastYearAverageReachRates,
    counts: lastYearCounts,
    relativeCounts: lastYearRelativeCounts,
  } = lastYearDetails

  const getColorForType = (
    type: string
  ): 'purple' | 'orange' | 'blue' | 'default' => {
    switch (type) {
      case 'story':
        return 'purple'
      case 'static':
        return 'orange'
      case 'reels':
        return 'blue'
      default:
        return 'default'
    }
  }

  return (
    <div className="flex flex-col ">
      <div className="px-5 w-full flex flex-row md:justify-center justify-between items-center mt-3 mb-1 text-lg text-center">
        <p className="md:w-5/12 w-4/12 flex ">{thisYear - 1}</p>
        <span className="  w-4/12  flex flex-row md:justify-center justify-between items-center font-medium  md:text-sm text-xs ">
          <p className="md:w-3/12 w-2/12 pr-1">%</p>
          <b className="md:w-3/12 w-2/12 pr-1">#</b>
          <p className="md:w-5/12 w-4/12 font-semibold ">TYPE</p>
          <b className="md:w-3/12 w-2/12 pl-1">#</b>
          <p className="md:w-3/12 w-2/12 pl-1">%</p>
        </span>
        <p className="flex md:w-5/12 w-4/12 justify-end">{thisYear}</p>
      </div>

      {/* map bars with types */}
      {barTypes.map((type) => (
        <div
          key={type}
          className={`${
            type === 'story'
              ? 'bg-purple-200 text-purple-500'
              : type === 'static'
              ? 'bg-orange-200 text-orange-500'
              : 'bg-blue-200 text-blue-500'
          } rounded-2xl flex flex-row md:justify-center justify-between items-center h-14 w-full mb-3`}
        >
          <div className=" md:w-5/12 w-4/12 flex items-center  justify-start">
            <ProgressBar
              progress={lastYearAverageReachRates[type] ?? 0}
              variant={getColorForType(type)}
              fillDirection="ltr"
              className="md:w-9/12 w-8/12"
            />
          </div>
          <div
            className={`flex flex-row md:justify-center justify-between text-${getColorForType(
              type
            )}-700 font-medium  text-center lg:text-sm md:text-xs text-[0.7rem] sm:w-4/12 w-4/12`}
          >
            <p className="md:w-3/12 2/12  ">
              {lastYearRelativeCounts[type] ?? 0}
            </p>
            <p className="md:w-3/12 2/12 font-semibold">
              {lastYearCounts[type] ?? 0}
            </p>
            <div className="md:w-5/12 4/12 font-bold ">
              {type?.toUpperCase() ?? ''}
            </div>
            <p className="md:w-3/12 2/12 font-semibold">{counts[type] ?? 0}</p>
            <p className="md:w-3/12 2/12   ">{relativeCounts[type] ?? 0}</p>
          </div>

          <div className="flex flex-row items-center gap-1 md:w-5/12 w-4/12 justify-end">
            <div
              className={`${
                averageReachRateDifferences[type] ?? 0 >= 0
                  ? 'text-green-700'
                  : 'text-red-700'
              }  md:text-xs text-[0.6rem] text-end font-bold md:w-4/12   w-3/12 `}
            >
              {averageReachRateDifferences[type] ?? 0 >= 0
                ? `+${averageReachRateDifferences[type] ?? 0}%`
                : `${averageReachRateDifferences[type] ?? 0}%`}
            </div>
            <ProgressBar
              progress={averageReachRates[type] ?? 0}
              variant={getColorForType(type)}
              fillDirection="rtl"
              className="md:w-10/12 sm:w-9/12 w-8/12"
            />
          </div>
        </div>
      ))}
    </div>
  )
}
