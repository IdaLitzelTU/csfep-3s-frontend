import React, { useState } from "react"
import Footer from "../components/dashboard/Footer"
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
    <Grid>
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
                  backgroundImage: `url("/Gradient-Header.png")`,
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
                  The 3S (Sink, Storage, and Substitution) platform was originally developed by 
                  CSFEP and is now further maintained and advanced by the ForestOvershoot project
                   under the CDRterra umbrella programme.
                  <br />
                  
                  Our mission is to generate and disseminate knowledge, inspire and raise
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
              <div style={{ padding: "30px" }}>
                <Typography {...headerProps}>CSFEP</Typography>
                <Typography {...bodyProps}>
                  The platform was originally 
                  created under the Climate Smart Forest Economy Program (CSFEP). 
                  <br />
                  CSFEP is a collaborative initiative of EIT Climate-KIC, the World Economic Forum, 
                  and the World Resources Institute, with seed funding from the 
                  Good Energies Foundation and support from Dalberg Catalyst.
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
                  padding: "40px",
                }}
              >
                <Image
                  src="/logo.jfif"
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
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  padding: "0px",
                }}
              >
                <Image
                  src="/Mainlogo_ForestOvershoot_RGB_CMYK.png"
                  width={400}
                  height={400}
                  alt="ForestOvershoot"
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
                  ForestOvershoot is part of the second phase of the CDRterra research program. 
                  CDRterra is coordinated by LMU Munich and funded by the German Federal Ministry for Research, 
                  Technology and Space (BMFTR) and the German Aerospace Center (DLR).
                  <br />
                  In this second phase of CDRterra, 17 collaborative research projects
                  across Germany investigate land-based carbon dioxide removal
                  approaches, including their feasibility, environmental and societal impacts, as well as their limitations.
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
                  src="/Mainlogo_CDRterra_RGB_CMYK.png"
                  width={400}
                  height={400}
                  alt="CDRterra"
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
    <Footer />
    </Grid>
    
  )
}
