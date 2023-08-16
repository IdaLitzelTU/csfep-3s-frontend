import React from "react"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import PropTypes from "prop-types"

const NumberChart = ({ name, value, suffix = "", icon = <></> }) => {
  return (
    <Stack
      spacing={2}
      justifyContent="flex-end"
      alignItems="center"
      style={{
        height: "150px",
        textAlign: "center",
        backgroundColor: "rgb(222, 221, 221)",
        borderRadius: "30px",
      }}
    >
      <div style={{ height: "45%" }}>
        {icon}{" "}
        <Typography
          style={{
            padding: "25px 15px 0px 15px",
            fontFamily: "Gotham Book",
            lineHeight: 1.4,
          }}
          variant="h6"
        >
          {name}
        </Typography>
      </div>
      <div style={{ height: "55%" }}>
        <Typography
          style={{
            padding: "15px",
            fontFamily: "Gotham Medium",
          }}
          variant="h4"
        >
          {value} {suffix}
        </Typography>
      </div>
    </Stack>
  )
}

NumberChart.propTypes = {
  value: PropTypes.number,
  suffix: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.object,
}

export default NumberChart
