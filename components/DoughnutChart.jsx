import React from "react"
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Label,
  Tooltip,
  Text,
  ResponsiveContainer,
} from "recharts"
import { Stack, Typography } from "@mui/material"
import PropTypes from "prop-types"

import useDim from "../hooks/useDim"

const DoughnutChart = ({ data, colors }) => {
  const { ref, height, width } = useDim()

  function chartPosition(chartArea, index) {
    const chartWidth = chartArea / 3
    const chartRelativePosition = chartWidth / 2
    return chartWidth * index + chartRelativePosition
  }

  function chartRadius(chartArea) {
    return (chartArea / 3) * 0.4
  }

  return (
    data && (
      <Stack direction="row" style={{ paddingTop: "2%" }} ref={ref}>
        <div
          style={{
            width: "20%",
            paddingLeft: "30px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            style={{
              fontFamily: "Gotham Book",
              fontWeight: 600,
              lineHeight: 1.4,
              textTransform: "uppercase",
            }}
            variant="h6"
          >
            Contribution of <span style={{ color: "green" }}>S</span>ink,{" "}
            <span style={{ color: "green" }}>S</span>torage and{" "}
            <span style={{ color: "green" }}>S</span>ubstitution to CO2
            reductions
          </Typography>
        </div>
        <ResponsiveContainer width={"80%"} height={300}>
          <PieChart>
            {data.map((d, index) => (
              <>
                <text
                  key={`text-pie-${index}`}
                  x={chartPosition(width * 0.6, index)}
                  y={45}
                  textAnchor="middle"
                  fontSize="1.25rem"
                  style={{ fontFamily: "Gotham Book" }}
                >
                  {d.title}
                </text>
                {createPieChart({
                  ...d,
                  cy: 150,
                  // cx: `${25 + 25 * index}%`,
                  cx: chartPosition(width * 0.6, index),
                  radius: Math.min(chartRadius(width * 0.6), 100),
                  colors,
                  index,
                })}
              </>
            ))}
            <Legend
              formatter={(value) => (
                <span style={{ fontFamily: "Gotham Book", color: "black" }}>
                  {value}
                </span>
              )}
              wrapperStyle={{ right: "1%", width: "19%" }}
              align="right"
              verticalAlign="middle"
              layout="vertical"
              iconSize={16}
              // style={{ fontFamily: "Gotham Medium" }}
              payload={data[0].data.map((item, index) => ({
                id: item.name,
                type: "circle",
                value: `${item.name}`,
                color: colors[index % colors.length],
              }))}
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Stack>
    )
  )
}

function createPieChart({ tooltip, data, colors, cy, cx, index, radius }) {
  return (
    <Pie
      key={index}
      data={data}
      cx={cx}
      cy={cy}
      startAngle={225}
      endAngle={-45}
      innerRadius={radius * 0.75}
      outerRadius={radius}
      fill="#8884d8"
      paddingAngle={0}
      dataKey="value"
      syncId="dogTotal"
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
      ))}
      <Label
        value={tooltip}
        position="centerTop"
        fontFamily="Gotham Medium"
        fontSize={"1.25rem"}
      />
    </Pie>
  )
}

DoughnutChart.propTypes = {
  data: PropTypes.array,
  colors: PropTypes.array,
  tooltip: PropTypes.string,
}

export default DoughnutChart
