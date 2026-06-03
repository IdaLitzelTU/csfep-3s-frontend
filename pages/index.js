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
                    color: "#005B36",
                  }}
                  gutterBottom
                >
                ABOUT <span style={{ color: "#005B36", fontWeight: 600, letterSpacing: "3px", }}>3S</span>
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
                  The 3S (Sink, Storage, and Substitution) platform was originally developed 
                  under the Climate Smart Forest Economy Program (CSFEP), 
                  a collaborative initiative from EIT Climate-KIC, World Economic Forum,
                  and the World Resources Institute, with seed funding from the 
                  Good Energies Foundation and support from Dalberg Catalyst.
                  <br />
                  The platform has since been further developed and expanded <br />
                  through the ForestOvershoot project, which is a subproject <br />
                  under the CDRterra umbrella program.
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
                  Substitution (<span style={{ color: "#005B36", fontWeight: 100, }}>3S</span>)
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
                  FORESTOVERSHOOT
                </Typography>
                <Typography {...bodyProps}>
                  ForestOvershoot is a subproject within the broader 
                  CDRterra research program, contributing scientific 
                  knowledge and decision-support tools for assessing 
                  the climate benefits of forests and forest products.
                  The project uses advanced forest, wood product, 
                  and building models to test different climate and 
                  management scenarios and to quantify when and how 
                  forests and wood use in construction can provide 
                  climate benefits and contribute to negative emissions 
                  most effectively.
                </Typography>
              </div>
            </Grow>
          </Grid>

                  <Grid item sm={12} md={6} style={{ margin: "auto" }}>
            <Grow in={true} timeout={1100}>
              <div style={{ padding: "30px" }}>
                <Typography {...headerProps}>PROJECT SUPPORT</Typography>
                <Typography {...bodyProps}>
                  ForestOvershoot is part of the CDRterra Phase II research program. 
                  CDRterra is coordinated by Ludwig Maximilian University of Munich 
                  (LMU Munich) and funded by the German Federal Ministry for Research, 
                  Technology and Space (BMFTR) and Deutsches Zentrum für Luft- und Raumfahrt (DLR).

                  In the second phase of CDRterra, 17 collaborative research projects
                  across Germany investigate land-based carbon dioxide removal
                  approaches, including their feasibility, impacts, and limitations.
                </Typography>
              </div>
            </Grow>
          </Grid>

          <Grid item sm={12} md={6} style={{ margin: "auto" }}>
            <Grow in={true} timeout={1100}>
              <div
                style={{
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  padding: "30px",
                }}
              >
                <Image
                  src="/CDRterra_logo.png"
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
        </Grid>



      </Box>
    </main>
  )
}
