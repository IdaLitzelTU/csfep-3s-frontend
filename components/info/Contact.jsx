import React from "react"

import { Button, Stack, Typography } from "@mui/material"
import PropTypes from "prop-types"

const Contact = ({ meta }) => (
  <Stack
    direction="row"
    justifyContent="flex-start"
    alignItems="stretch"
    spacing={2}
  >
    <Typography variant="body1" style={{ margin: "auto 0" }}>
      {`Model version: ${meta["version"]} was iterated by ${meta["by"]}`}
    </Typography>
    <Button
      variant="contained"
      sx={{
        float: "right",
        color: "white",
        backgroundColor: "#005B36",
        textTransform: "none",
      }}
      href={`mailto:${meta["contact"]}`}
    >
      Contact
    </Button>
  </Stack>
)

Contact.propTypes = {
  meta: PropTypes.object,
}

export default Contact
