import React from "react"
import { Stack, Typography, Paper, Button } from "@mui/material"
import PropTypes from "prop-types"
import { useQuery } from "react-query"
import * as client from "../api/csfep"
import Assumptions from "./Assumptions"

const ModelMeta = ({ version }) => {
  const { data } = useQuery(["model-input", version], () =>
    client.fetchModelInput(version)
  )
  return (
    version !== "" &&
    data && (
      <Paper
        variant="outlined"
        style={{
          padding: "1rem",
          backgroundColor: "whitesmoke",
          marginTop: "1rem",
        }}
      >
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={2}
        >
          <Typography variant="body1" style={{ margin: "auto 0" }}>
            {`Model version: ${data.meta["version"]} was iterated by ${data.meta["by"]}`}
          </Typography>
          <Button
            variant="contained"
            sx={{
              float: "right",
              color: "white",
              backgroundColor: "#005B36",
              textTransform: "none",
            }}
            href={`mailto:${data.meta["contact"]}`}
          >
            Contact
          </Button>
        </Stack>
        <Assumptions
          assumptions={{ Assumptions: "", ...data["assumptions"] }}
        />
      </Paper>
    )
  )
}

ModelMeta.propTypes = {
  version: PropTypes.string,
}

export default ModelMeta
