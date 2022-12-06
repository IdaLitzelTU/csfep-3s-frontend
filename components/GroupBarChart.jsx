import React from "react"
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
import { Typography, Stack } from "@mui/material"
import PropTypes from "prop-types"

const GroupBarChart = ({ data, colors, units }) => {
  return (
    data && (
      <Stack
        style={{ textAlign: "center", height: "100%" }}
        justifyContent="space-around"
      >
        <div>
          <Typography
            variant="h4"
            style={{ fontFamily: "Gotham Medium" }}
            gutterBottom
          >
            <span
              style={{
                color: "green",
                paddingBottom: "15px",
              }}
            >
              S
            </span>
            UBSTITUTION
          </Typography>
        </div>
        <ResponsiveContainer
          width={"100%"}
          height={400}
          style={{ padding: "30px" }}
        >
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="1" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend
              iconType="circle"
              align="left"
              wrapperStyle={{ paddingLeft: "55px" }}
              formatter={(value) => (
                <span style={{ fontFamily: "Gotham Book", color: "black" }}>
                  {value}
                </span>
              )}
            />
            <Bar
              dataKey={Object.keys(data[0])[1]}
              stackId="a"
              fill={colors[0]}
            />
            <Bar
              dataKey={Object.keys(data[0])[2]}
              stackId="a"
              fill={`${colors[0]}BF`}
            >
              <LabelList position="top" dataKey="totalMT" />
            </Bar>
            <Bar
              dataKey={Object.keys(data[0])[3]}
              stackId="b"
              fill={colors[1]}
            />
            <Bar
              dataKey={Object.keys(data[0])[4]}
              stackId="b"
              fill={`${colors[1]}BF`}
            >
              {" "}
              <LabelList position="top" dataKey="totalSC" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div>
          <Typography
            variant="h6"
            fontFamily={"Gotham Medium"}
            style={{ lineHeight: 1.4 }}
          >
            {`Material substitution benefits (${units})`}
          </Typography>
        </div>
      </Stack>
    )
  )
}

GroupBarChart.propTypes = {
  data: PropTypes.array,
  colors: PropTypes.array,
  units: PropTypes.string,
}

export default GroupBarChart
