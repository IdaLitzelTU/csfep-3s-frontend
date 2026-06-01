import React from "react"
import Head from "next/head"
import styles from "../styles/Home.module.css"
import { Grid, Typography, Box } from "@mui/material"

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

const About = () => {
  return (
    <main className={styles.main}>
      <Box
        sx={{
          width: {
            sm: "100%",
            md: "40vw",
            position: "absolute",
            top: "40vh",
            left: "30vw",
          },
          margin: "auto",
          paddingTop: "45px",
        }}
      >
        <Grid
          container
          justifyContent="space-evenly"
          alignItems="stretch"
          spacing={6}
          columns={1}
          style={{ width: "100%", minWidth: "650px" }}
        >
          <div>
            <Typography {...headerProps}> CONTACT US</Typography>
          </div>
          <div>
            <Typography {...bodyProps}>
              If you would like to partner with us, provide potential
              breakthrough initiative opportunities, or learn more about the
              CSFEP, please contact us at robyn.vandenheuvel@dalberg.com.
            </Typography>
          </div>
        </Grid>
      </Box>
      <div
      style={{
        marginTop: "4rem",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img
        src="/Forest.svg"
        alt="Forest"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: -1,
        }}
      />
    </div>
    </main>
    
  )
}

export default About
