import React from "react"
import { Stack, Typography } from "@mui/material"
import { ArrowBack } from "@mui/icons-material"
import { useRouter } from "next/router"

const ReturnButton = () => {
  const router = useRouter()

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push("/")
    }
  }

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      onClick={handleBack}
      style={{ cursor: "pointer", marginBottom: "2rem" }}
    >
      <ArrowBack fontSize="medium" />
      <Typography style={{ fontSize: "1rem", fontFamily: "Gotham Book" }}>
        Return
      </Typography>
    </Stack>
  )
}
export default ReturnButton
