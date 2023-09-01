import React from "react"
import PropTypes from "prop-types"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts"
import { Stack, Typography } from "@mui/material"

const StackedBarChart = ({ data, colors, units }) => {
  return (
    <Stack
      style={{ textAlign: "center", height: "100%" }}
      justifyContent="space-between"
      alignItems="stretch"
    >
      <div>
        <Typography
          variant="h4"
          style={{
            fontFamily: "Gotham",
            paddingBottom: "15px",
            fontFamily: "Gotham Medium",
          }}
          gutterBottom
        >
          <span style={{ color: "green" }}>S</span>
          TORAGE
        </Typography>
      </div>
      <ResponsiveContainer width={"100%"} height={225}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="1" horizontal={false} />
          <XAxis type="number" domain={[0, "dataMax + 1.5"]} />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          <Legend
            align="left"
            iconType="circle"
            wrapperStyle={{ paddingLeft: "55px" }}
            formatter={(value) => (
              <span style={{ fontFamily: "Gotham Book", color: "black" }}>
                {value}
              </span>
            )}
          />
          <Bar dataKey={Object.keys(data[0])[1]} stackId="a" fill={colors[0]} />
          <Bar
            dataKey={Object.keys(data[0])[2]}
            stackId="a"
            fill={colors[1]}
          ></Bar>
          <Bar dataKey={Object.keys(data[0])[3]} stackId="a" fill={colors[2]}>
            <LabelList position="right" dataKey="total" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div>
        <Typography
          variant="h6"
          fontFamily={"Gotham Medium"}
          style={{ lineHeight: 1.4 }}
        >
          {`Potential storage of carbon extracted from forest
            [${units}]`}
        </Typography>
      </div>
    </Stack>
  )
}

StackedBarChart.propTypes = {
  data: PropTypes.array,
  colors: PropTypes.array,
  units: PropTypes.string,
}

export default StackedBarChart
