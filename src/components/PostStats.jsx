import { useQuery } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import {
  VictoryChart,
  VictoryTooltip,
  VictoryBar,
  VictoryLine,
  VictoryVoronoiContainer,
} from 'victory'
import {
  getTotalViews,
  getDailyViews,
  getDailyDurations,
} from '../api/events.js'

// Post statistics component that recieves an ID of the post ==================
export function PostStats({ postId }) {
  // Get total views query ====================================================
  const totalViews = useQuery({
    queryKey: ['totalViews', postId],
    queryFn: () => getTotalViews(postId),
  })

  // Get daily views query ====================================================
  const dailyViews = useQuery({
    queryKey: ['dailyViews', postId],
    queryFn: () => getDailyViews(postId),
  })

  // Get daily duration query =================================================
  const dailyDurations = useQuery({
    queryKey: ['dailyDurations', postId],
    queryFn: () => getDailyDurations(postId),
  })

  if (
    totalViews.isLoading ||
    dailyViews.isLoading ||
    dailyDurations.isLoading
  ) {
    return <div>loading stats...</div>
  }

  return (
    <div>
      <h2>
        <b>Total Views: {totalViews.data?.views} </b>{' '}
      </h2>
      <div style={{ width: 512 }}>
        <h3>Daily Views</h3>
        <VictoryChart domainPadding={16}>
          <VictoryBar
            labelComponent={<VictoryTooltip />}
            data={dailyViews.data?.map((d) => ({
              x: new Date(d._id),
              y: d.views,
              label: `${new Date(d._id).toLocaleDateString()}: ${
                d.views
              } views`,
            }))}
          />
        </VictoryChart>
      </div>
      <div style={{ width: 512 }}>
        <h4>Daily Average Viewing Duration</h4>
        <VictoryChart
          domainPadding={16}
          containerComponent={
            <VictoryVoronoiContainer
              voronoiDimension='x'
              labels={({ datum }) =>
                `${datum.x.toLocaleDateString()}: ${datum.y.toFixed(2)} minutes`
              }
              labelComponent={<VictoryTooltip />}
            />
          }
        >
          <VictoryLine
            data={dailyDurations.data?.map((d) => ({
              x: new Date(d._id),
              y: d.averageDuration / (60 * 1000),
            }))}
          />
        </VictoryChart>
      </div>
    </div>
  )
}

PostStats.propTypes = {
  postId: PropTypes.string.isRequired,
}
