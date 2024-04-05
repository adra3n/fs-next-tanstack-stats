import { ContentData, ReachRateDetails, ContentDetails } from '@/types/types'

export const calculateAverageReachRates = (
  data: ContentData[],
  year: number
): { [type: string]: number } => {
  const filteredData = data.filter((item) => item.year === year)

  const averageReachRates: { [type: string]: number } = {}
  const typeCounts: { [type: string]: number } = {}

  //totals
  const totalCount = filteredData.length
  const totalReachRate = filteredData.reduce(
    (total, item) => total + item.reach_rate,
    0
  )

  //all
  const averageReachRateAll =
    totalCount === 0 ? 0 : Math.round((totalReachRate / totalCount) * 10) / 10
  averageReachRates['all'] = averageReachRateAll

  // calculate type average rr and counts
  filteredData.forEach((item) => {
    if (averageReachRates[item.type]) {
      averageReachRates[item.type] += item.reach_rate
      typeCounts[item.type]++
    } else {
      averageReachRates[item.type] = item.reach_rate
      typeCounts[item.type] = 1
    }
  })

  Object.keys(averageReachRates).forEach((type) => {
    if (type !== 'all') {
      averageReachRates[type] /= typeCounts[type]
    }
  })

  return averageReachRates
}

export const getCounts = (
  data: ContentData[],
  year: number
): { [type: string]: number } => {
  //filter year
  const filteredData = data.filter((item) => item.year === year)
  const counts: { [type: string]: number } = {}
  //total count
  counts.all = filteredData.length
  //counts
  filteredData.forEach((item) => {
    if (counts[item.type]) {
      counts[item.type]++
    } else {
      counts[item.type] = 1
    }
  })

  return counts
}

export const calculateRelativeCounts = (
  data: ContentData[],
  year: number
): { [type: string]: number } => {
  const counts = getCounts(data, year)
  const totalCount = counts.all || 1

  const relativeCounts: { [type: string]: number } = {}
  //relative counts (count/total count)
  Object.keys(counts).forEach((type) => {
    if (type !== 'all') {
      relativeCounts[type] = parseFloat(
        ((counts[type] / totalCount) * 100).toFixed(1)
      )
    }
  })

  return relativeCounts
}

export const calculateContentCountDifference = (
  currentYearData: ContentData[],
  lastYearData: ContentData[]
): { [type: string]: number } => {
  const getCounts = (data: ContentData[]): { [type: string]: number } => {
    const counts: { [type: string]: number } = {}
    //counts by type
    data.forEach((item) => {
      if (counts[item.type]) {
        counts[item.type]++
      } else {
        counts[item.type] = 1
      }
    })

    return counts
  }

  const currentYearCounts = getCounts(currentYearData)
  const lastYearCounts = getCounts(lastYearData)

  const contentCountDifference: { [type: string]: number } = {}

  // calculate difference for each type
  Object.keys(currentYearCounts).forEach((type) => {
    const currentYearCount = currentYearCounts[type] || 0
    const lastYearCount = lastYearCounts[type] || 0

    // percentage change
    const percentageChange =
      lastYearCount !== 0
        ? ((currentYearCount - lastYearCount) / lastYearCount) * 100
        : 0
    contentCountDifference[type] = parseFloat(percentageChange.toFixed(1))
  })

  //total difference
  const currentYearTotalCount = currentYearData.length
  const lastYearTotalCount = lastYearData.length

  //percentage change for total difference
  const totalDifference =
    lastYearTotalCount !== 0
      ? ((currentYearTotalCount - lastYearTotalCount) / lastYearTotalCount) *
        100
      : 0
  contentCountDifference['all'] = parseFloat(totalDifference.toFixed(1))

  return contentCountDifference
}

export const calculateAverageReachRateDifferences = (
  currentYear: number,
  currentYearData: ContentData[],
  lastYearData: ContentData[]
): { [type: string]: number } => {
  const averageReachRatesCurrentYear = calculateAverageReachRates(
    currentYearData,
    currentYear
  )
  const averageReachRatesLastYear = calculateAverageReachRates(
    lastYearData,
    currentYear - 1
  )
  const differences: { [type: string]: number } = {}

  //diff for reach rates for all types
  Object.keys(averageReachRatesCurrentYear).forEach((type) => {
    const currentYearRate = averageReachRatesCurrentYear[type]
    const lastYearRate = averageReachRatesLastYear[type]
    const difference = currentYearRate - lastYearRate
    differences[type] = parseFloat(difference.toFixed(1))
  })

  return differences
}

export const calculateContentDetails = (
  thisYear: number,
  thisYearData: ContentData[],
  lastYearData: ContentData[]
): ContentDetails => {
  const calculateYearData = (
    data: ContentData[],
    year: number
  ): ReachRateDetails => {
    const averageReachRates = calculateAverageReachRates(data, year)
    const counts = getCounts(data, year)
    const relativeCounts = calculateRelativeCounts(data, year)

    return {
      averageReachRates,
      counts,
      relativeCounts,
    }
  }

  const thisYearDetails = calculateYearData(thisYearData, thisYear)
  const lastYearDetails = calculateYearData(lastYearData, thisYear - 1)

  //final obj
  return {
    thisYear: {
      averageReachRates: thisYearDetails?.averageReachRates,
      counts: thisYearDetails?.counts,
      relativeCounts: thisYearDetails?.relativeCounts,
      averageReachRateDifferences: calculateAverageReachRateDifferences(
        thisYear,
        thisYearData,
        lastYearData
      ),
      contentCountDifferences: calculateContentCountDifference(
        thisYearData,
        lastYearData
      ),
    },
    lastYear: {
      averageReachRates: lastYearDetails?.averageReachRates,
      counts: lastYearDetails?.counts,
      relativeCounts: lastYearDetails?.relativeCounts,
    },
  }
}

export function getTopInfluencersByYear(
  data: ContentData[],
  year: number,
  limit: number
): { name: string; count: number }[] {
  //filter year
  const filteredData = data.filter((item) => item.year === year)
  // find influencer content count
  const influencerCounts: { [key: string]: number } = filteredData.reduce(
    (total: { [key: string]: number }, item) => {
      total[item.influencer] = (total[item.influencer] || 0) + 1
      return total
    },
    {}
  )

  // array for counts
  const influencerArray = Object.entries(influencerCounts).map(
    ([name, count]) => ({
      name,
      count,
    })
  )

  //sort
  influencerArray.sort((a, b) => b.count - a.count)

  //slice with limit
  return influencerArray.slice(0, limit)
}

export const calculateMetrics = (
  thisYearDetails: ContentDetails['thisYear'],
  count: number // Accepts the count of highest and lowest changes
) => {
  const { averageReachRateDifferences, contentCountDifferences } =
    thisYearDetails

  const metricChanges: any[] = []

  //types
  const additionalMetrics = ['story', 'reels', 'static', 'all']

  // reach rate change
  additionalMetrics.forEach((metricType) => {
    const change = averageReachRateDifferences[metricType] || 0
    metricChanges.push({ type: metricType, change, category: 'reachRate' })
  })

  //count difference
  additionalMetrics.forEach((metricType) => {
    const change = contentCountDifferences[metricType] || 0
    metricChanges.push({ type: metricType, change, category: 'count' })
  })

  // sort
  metricChanges.sort((a, b) => b.change - a.change)

  //highest and lowest
  const highestChanges = metricChanges.slice(0, count)
  const lowestChanges = metricChanges.slice(-count)

  //concat
  const mergedChanges = highestChanges.concat(lowestChanges)

  return mergedChanges
}
