import React from "react"
import Image from "next/image"
import { Grid } from "@mui/material"

const Footer = () => {
  return (
    <Grid item xs={8}>
      <Image
        alt="forest"
        src="/forest.svg"
        width={1}
        height={1}
        style={{
          paddingTop: "45px",
          objectFit: "contain",
          width: "100%",
          position: "relative",
          height: "unset",
          opacity: "75%",
          marginBottom: "-2vh",
        }}
      />
    </Grid>
  )
}

export default Footer
