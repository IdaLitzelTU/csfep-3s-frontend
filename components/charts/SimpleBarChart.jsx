import React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import PropTypes from "prop-types"

const SimpleBarChart = ({ chartData }) => {
  return (
    <>
      <ResponsiveContainer width="100%" height={550}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="1" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip labelStyle={{ margin: "10px" }} />

          <Bar dataKey="value" fill="#FFC000" />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}
SimpleBarChart.propTypes = {
  chartData: PropTypes.array,
}

export default SimpleBarChart
