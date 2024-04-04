export interface ContentData {
  influencer: string
  year: number
  type: 'story' | 'reels' | 'static'
  reach_rate: number
}

export interface ReachRateDetails {
  averageReachRates: { [type: string]: number }
  counts: { [type: string]: number }
  relativeCounts: { [type: string]: number }
}
export interface ContentDetails {
  thisYear: {
    averageReachRates: { [type: string]: number }
    counts: { [type: string]: number }
    relativeCounts: { [type: string]: number }
    averageReachRateDifferences: { [type: string]: number }
    contentCountDifferences: { [type: string]: number }
  }
  lastYear: {
    averageReachRates: { [type: string]: number }
    counts: { [type: string]: number }
    relativeCounts: { [type: string]: number }
  }
}

export interface Metric {
  type: string
  change: number
  category: string
}
