import React from "react"
import { Stack, Typography } from "@mui/material"
import { ArrowBack } from "@mui/icons-material"
import { useRouter } from "next/router"

const ReturnButton = ({}) => {
  const router = useRouter()
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      onClick={() => router.back()}
      style={{ cursor: "pointer", marginBottom: "2rem" }}
    >
      <ArrowBack fontSize="medium" style={{ cursor: "pointer" }} />
      <Typography
        style={{
          fontSize: "1rem",
          fontFamily: "Gotham Book",
          cursor: "pointer",
        }}
      >
        Return
      </Typography>
    </Stack>
  )
}

export default ReturnButton
