import React from "react"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
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

const Framework = () => {
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
          <Grid item sm={12} md={6} style={{ margin: "auto " }}>
            <Grow in={true} timeout={1100}>
              <div style={{ padding: "30px" }}>
                <Typography {...headerProps}>
                  OBJECTIVE OF THE FRAMEWORK
                </Typography>
                <ul style={{ paddingLeft: "0" }}>
                  <li>
                    <Typography {...bodyProps}>
                      to serve as a decision tool/accounting framework that will
                      allow decision makers to credibly assess how their choices
                      can maximize the climate change impacts of forests and
                      forest products.
                    </Typography>
                  </li>
                  <li>
                    <Typography {...bodyProps}>
                      to help to compare different scenarios in terms of carbon
                      absorption and sequestration (the Sink function), of
                      carbon Storage (the biocarbon stored in wood-based
                      products) and carbon Substitution (the fossil carbon
                      emissions avoided).
                    </Typography>
                  </li>
                </ul>
              </div>
            </Grow>
          </Grid>

          <Grid item sm={12} md={6}>
            <Grow in={true} timeout={1100}>
              <div style={{ padding: "30px" }}>
                <Image
                  src="/Graph-Why.png"
                  width={400}
                  height={400}
                  alt="Forest-Light"
                  priority
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

          <Grid item sm={12} md={6}>
            <Grow in={true} timeout={1100}>
              <div style={{ padding: "30px" }}>
                <Image
                  src="/Graph-Framework.png"
                  width={400}
                  height={200}
                  alt="Log-House"
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    position: "relative",
                    top: "50%",
                    height: "unset",
                  }}
                />
              </div>
            </Grow>
          </Grid>

          <Grid item sm={12} md={6} style={{ margin: "auto " }}>
            <Grow in={true} timeout={1200}>
              <div style={{ padding: "30px" }}>
                <Typography {...headerProps}>WHY A 3S FRAMEWORK?</Typography>
                <ul style={{ paddingLeft: "0" }}>
                  <li>
                    <Typography {...bodyProps}>
                      Forest systems and the built environment are both complex
                      systems, but linking the two involves a system in itself
                      which currently does not exist.
                    </Typography>
                  </li>
                </ul>
              </div>
            </Grow>
          </Grid>

          <Grid item sm={12} md={6} style={{ margin: "auto " }}>
            <Grow in={true} timeout={1200}>
              <div style={{ padding: "30px" }}>
                <ul style={{ paddingLeft: "0" }}>
                  <li>
                    <Typography {...bodyProps}>
                      There is a lack of understanding about forestry practices.
                      Carbon tends to only be expressed through building
                      materials, and impacts are widely misunderstood,
                      misrepresented until building material gets to site.
                    </Typography>
                  </li>
                  <li>
                    <Typography {...bodyProps}>
                      There is a missing link between feedbacks of
                      forests/construction materials and climate
                    </Typography>
                  </li>
                  <li>
                    <Typography {...bodyProps}>
                      A consistent framework (or a numeric model) tracking
                      carbon from forest to city does not exist
                    </Typography>
                  </li>
                </ul>
              </div>
            </Grow>
          </Grid>

          <Grid item sm={12} md={6}>
            <Grow in={true} timeout={1100}>
              <div style={{ padding: "30px" }}>
                <Image
                  src="/Graph-Objective.png"
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
        </Grid>
      </Box>
    </main>
  )
}

export default Framework
