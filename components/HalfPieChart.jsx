import React from "react"
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts"
import { Grid, Typography, Stack } from "@mui/material"
import PropTypes from "prop-types"
import useDim from "../hooks/useDim"
import { Minimize } from "@mui/icons-material"

const HalfPieChart = ({ data, colors, units }) => {
  const { ref, width } = useDim()
  return (
    <Grid
      container
      columns={3}
      style={{ textAlign: "center", height: "100%" }}
      justifyContent="center"
      alignItems="flex-end"
      ref={ref}
    >
      <Grid item xs={3}>
        <Typography
          variant="h4"
          style={{ fontFamily: "Gotham Medium", paddingBottom: "15px" }}
          gutterBottom
        >
          <span style={{ color: "green" }}>S</span>INK
        </Typography>
      </Grid>
      <Grid item xs={1} style={{ textAlign: "right", paddingBottom: "15px" }}>
        <Stack>
          <Typography variant="h6" fontFamily={"Gotham Book"}>
            {data[0].name}
          </Typography>
          <Typography
            variant="h4"
            color={colors[0]}
            fontFamily={"Gotham Medium"}
          >
            {data[0].value}
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={1} style={{ maxHeight: "100px" }}>
        <ResponsiveContainer width={"100%"} height={160}>
          <PieChart>
            <Pie
              dataKey="value"
              startAngle={180}
              endAngle={0}
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={Math.min((width / 3) * 0.4, 75)}
              innerRadius={Math.min((width / 3) * 0.4, 75) * 0.75}
              paddingAngle={0}
              // label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Grid>
      <Grid item xs={1} style={{ textAlign: "left", paddingBottom: "15px" }}>
        <Stack>
          <Typography variant="h6" fontFamily={"Gotham Book"}>
            {data[1].name}
          </Typography>
          <Typography
            variant="h4"
            fontFamily={"Gotham Medium"}
            color={colors[1]}
          >
            {data[1].value}
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={4}>
        <Typography
          variant="h6"
          fontFamily={"Gotham Medium"}
          style={{ lineHeight: 1.4 }}
        >
          {`Forest carbon sink recovered after timber harvest (${units})`}
        </Typography>
      </Grid>
    </Grid>
  )
}

HalfPieChart.propTypes = {
  data: PropTypes.array,
  colors: PropTypes.array,
  units: PropTypes.string,
}

export default HalfPieChart
