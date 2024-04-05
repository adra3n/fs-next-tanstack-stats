import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { CardFooter, CardHeader } from '../ui/card'
import { ContentDetails } from '@/types/types'

const Colors = ['#d8b4fe', '#93c5fd', '#fdba74']

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="text-white bg-gray-700 text-sm rounded p-2">
        <p>{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    )
  }

  return null
}
interface ChartProps {
  lastYearDetails: ContentDetails['lastYear']
  thisYearDetails: ContentDetails['thisYear']
  thisYear: number
}

export default function PieChartSection({
  lastYearDetails,
  thisYearDetails,
  thisYear,
}: ChartProps) {
  const thisYearData = [
    { name: 'Stories', value: thisYearDetails?.counts.story ?? 0 },
    { name: 'Reels', value: thisYearDetails?.counts.reels ?? 0 },
    { name: 'Static Posts', value: thisYearDetails?.counts.static ?? 0 },
  ]
  const lastYearData = [
    { name: 'Stories', value: lastYearDetails?.counts.story ?? 0 },
    { name: 'Reels', value: lastYearDetails?.counts.reels ?? 0 },
    { name: 'Static Posts', value: lastYearDetails?.counts.static ?? 0 },
  ]

  return (
    <>
      <CardHeader className="mt-6">
        <h3 className="text-center">Yearly Content Counts</h3>
      </CardHeader>
      <div className="flex flex-row justify-between gap-4 items-center  h-64  sm:w-full w-92">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart height={200} width={200}>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={thisYearData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {thisYearData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={Colors[index % Colors.length]}
                />
              ))}
            </Pie>
            <Tooltip content={CustomTooltip} />
          </PieChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart height={250} width={250}>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={lastYearData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {lastYearData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={Colors[index % Colors.length]}
                />
              ))}
            </Pie>
            <Tooltip content={CustomTooltip} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <CardFooter className="justify-between text-center">
        <p className="flex-1 pr-8">{thisYear - 1}</p>
        <p className="flex-1 pl-8">{thisYear}</p>
      </CardFooter>
    </>
  )
}
