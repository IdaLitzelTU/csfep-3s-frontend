import React from "react"

import styles from "../styles/Home.module.css"

import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Head from "next/head"
import Image from "next/image"
import Grow from "@mui/material/Grow"

const headerProps = {
  variant: "h6",
  style: {
    fontFamily: "Gotham Medium",
    color: "#005B36",
    paddingTop: "15px",
  },
  gutterBottom: true,
}

const bodyProps = {
  variant: "body1",
  style: { fontFamily: "Gotham Book", color: "black", lineHeight: 1.4 },
  gutterBottom: true,
}

export default function Home() {
  return (
    <main className={styles.main}>
      <Box
        sx={{
          width: {
            sm: "100%",
            md: "60vw",
          },
          margin: "0 auto",
          paddingTop: "10px",
          paddingBottom: "10vh",
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Grow in={true} timeout={1000}>
              <div
                style={{
                  padding: "5% 12% 5% 12%",
                  textAlign: "justify",
                  backgroundImage: `url("/Gradient-Header-Compressed.png")`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              >
                <Typography
                  variant="h4"
                  align="justify"
                  style={{
                    fontFamily: "Gotham Medium",
                    color: "black",
                    paddingBottom: "15px",
                  }}
                  gutterBottom
                >
                  The Climate Smart Forest Economy Program (CSFEP)
                </Typography>
                <Typography
                  variant="h6"
                  align="left"
                  style={{
                    fontFamily: "Gotham Book",
                    color: "black",
                    lineHeight: 1.4,
                    paddingBottom: "15px",
                  }}
                  gutterBottom
                >
                  is a collaborative initiative from EIT Climate-KIC, World
                  Economic Forum, and the World Resources Institute, with seed
                  funding from Good Energies Foundation, and support from Dalberg 
                  Catalyst. We are part of a global movement of organizations that 
                  are scaling climate smart biobased economies. CSFEPs initial focus
                  is the building and construction sector and its sourcing practices, where
                  increasing the use of sustainable forest products could
                  rapidly decarbonize construction, while creating carbon sinks
                  in the built environment.
                </Typography>
              </div>
            </Grow>
          </Grid>

          <Grid item sm={12} md={6} style={{ margin: "auto" }}>
            <Grow in={true} timeout={1100}>
              <div style={{ padding: "30px" }}>
                <Typography {...headerProps}>OUR MISSION</Typography>
                <Typography {...bodyProps}>
                  is to generate and disseminate knowledge, inspire and raise
                  ambition of stakeholders, and support initiatives that
                  demonstrate how the Sink, carbon Storage, and fossil-carbon
                  Substitution (<span style={{ color: "#005B36" }}>3S</span>)
                  functions of forests and forest products can be maximized for
                  enhanced climate, social and economic benefits.
                </Typography>
              </div>
            </Grow>
          </Grid>

          <Grid item sm={12} md={6} style={{ margin: "auto" }}>
            <Grow in={true} timeout={1100}>
              <div
                style={{
                  backgroundImage: `url("/Gradient-Green.png")`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  padding: "30px",
                }}
              >
                <Image
                  src="/Forest-Light.jpg"
                  width={400}
                  height={400}
                  alt="Forest-Light"
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    position: "relative",
                    height: "unset",
                  }}
                />
              </div>
            </Grow>
          </Grid>

          <Grid item sm={12} md={6} style={{ margin: "auto" }}>
            <Grow in={true} timeout={1100}>
              <div
                style={{
                  backgroundImage: `url("/Gradient-Gold.png")`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  padding: "30px",
                }}
              >
                <Image
                  src="/Log-House.jpg"
                  width={400}
                  height={400}
                  alt="Log-House"
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    position: "relative",
                    height: "unset",
                  }}
                />
              </div>
            </Grow>
          </Grid>

          <Grid item sm={12} md={6} style={{ margin: "auto" }}>
            <Grow in={true} timeout={1200}>
              <div style={{ padding: "30px" }}>
                <Typography {...headerProps}>
                  CLIMATE SMART FOREST ECONOMY
                </Typography>
                <Typography {...bodyProps}>
                  is the usage of forest products in circumstances where this
                  provides net climate benefits while meeting social and
                  ecological safeguards. Building it offers an economic
                  incentive that could protect, maintain, and manage forests,
                  while assigning greater value to forests, creating further
                  incentives for restoration and reforestation. This offers an
                  opportunity to decarbonize sectors that interface with forests
                  through their value chains, such as construction. In addition
                  to positive climate outcomes, this can result in substantial
                  social and economic benefits.
                </Typography>
              </div>
            </Grow>
          </Grid>
        </Grid>
      </Box>
    </main>
  )
}
