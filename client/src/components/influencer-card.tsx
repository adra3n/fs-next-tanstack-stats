'use client'
import { CardContent, Card } from '@/components/ui/card'
import { ContentData } from '@/types/types'
import { useQuery } from '@tanstack/react-query'
import { calculateContentDetails, calculateMetrics } from '@/utils/calculations'
import { fetchContentData } from '@/utils/apis'
import { StatsCardHeader } from '@/components/influencer-card/header'
import Spinner from '@/components/ui/spinner'
import { CompareBars } from '@/components//influencer-card/compare-bars'
import TopInfluencers from '@/components/influencer-card/top-influencers'
import ContentTips from '@/components/influencer-card/tips'
import PieChartSection from '@/components/influencer-card/chart'

export function InfluencerCard() {
  //query => influencerData
  const {
    data: contentData,
    isLoading,
    isError,
  } = useQuery<any>({
    queryKey: ['contentData'],
    queryFn: fetchContentData,
  })

  if (isLoading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    )
  if (isError)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="text-red-500">Error fetching data</div>
      </div>
    )

  const thisYear = 2021
  const tipCount = 2

  const { thisYear: thisYearDetails, lastYear: lastYearDetails } =
    calculateContentDetails(
      thisYear,
      contentData?.filter((item: ContentData) => item.year === thisYear),
      contentData?.filter((item: ContentData) => item.year === thisYear - 1)
    )

  const metrics = calculateMetrics(thisYearDetails, tipCount)

  console.log(metrics)
  return (
    <Card className=" my-8 py-6 bg-gray-800 border-0 sm:rounded-lg mx-auto shadow-lg lg:w-7/12 md:w-8/12 sm:w-10/12 w-[95vw]">
      <CardContent>
        <StatsCardHeader
          thisYear={thisYear}
          thisYearDetails={thisYearDetails}
          isLoading={isLoading}
        ></StatsCardHeader>
        <CompareBars
          thisYear={thisYear}
          thisYearDetails={thisYearDetails}
          lastYearDetails={lastYearDetails}
          isLoading={isLoading}
        />

        <TopInfluencers data={contentData} year={thisYear} />
        <ContentTips metrics={metrics} />

        <PieChartSection
          thisYearDetails={thisYearDetails}
          lastYearDetails={lastYearDetails}
        />
      </CardContent>
    </Card>
  )
}
