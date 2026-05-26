import React from "react"
import { Typography, Grid } from "@mui/material"
import PropTypes from "prop-types"

const commonProps = {
  columns: 6,
  spacing: 2,
  justifyContent: "space-around",
  alignItems: "stretch",
}

const commonStyle = {
  padding: "1rem",
  width: "calc(100% - 2rem)",
  marginLeft: "1rem",
  marginRight: "1rem",
}

const commonItemStyle = {
  textAlign: "center",
}

const SimpleTable = ({ data }) => (
  <div style={{ padding: "0.5rem" }}>
    <Header data={data[0]} />
    {data.slice(1).map((row, i) => (
      <Row data={row} key={i} />
    ))}
  </div>
)

const Header = ({ data }) => (
  <Grid container {...commonProps} style={{ ...commonStyle }}>
    {data.map((element, i) => (
      <Grid item xs={1} key={i} style={commonItemStyle}>
        <Typography
          style={{
            fontFamily: "Gotham Book",
            textAlign: "center",
            fontWeight: 800,
            lineHeight: 1.5,
          }}
          variant="p"
        >
          {element}
        </Typography>
      </Grid>
    ))}
  </Grid>
)

const Row = ({ data }) => (
  <Grid
    container
    {...commonProps}
    style={{
      ...commonStyle,
      paddingTop: "0.5rem",
      paddingBottom: "1.5rem",
      marginTop: "1rem",
      marginBottom: "1rem",
      borderRadius: "15px",
      backgroundColor: "#DAE5D1",
    }}
  >
    {data.map((element, i) => (
      <Grid item xs={1} key={i} style={{ ...commonItemStyle }}>
        <Typography
          style={{
            fontFamily: "Gotham Book",
            fontSize: "1.1rem",
            fontWeight: i === 0 ? 600 : 500,
          }}
          variant="p"
        >
          {element}
        </Typography>
      </Grid>
    ))}
  </Grid>
)

SimpleTable.propTypes = {
  data: PropTypes.array,
}

Header.propTypes = {
  data: PropTypes.array,
}

Row.propTypes = {
  data: PropTypes.array,
}

export default SimpleTable
