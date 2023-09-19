import React, { useState } from "react"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import PropTypes from "prop-types"

const CopyTextField = ({ value, label }) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyClick = () => {
    navigator.clipboard.writeText(value)
    setIsCopied(true)

    // Reset the tooltip state after a short delay
    setTimeout(() => setIsCopied(false), 1500)
  }

  return (
    <Tooltip title={isCopied ? "Copied!" : "Copy"} placement="top-end">
      <TextField
        value={value}
        style={{ width: "70%", padding: "1rem" }}
        fullWidth
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleCopyClick}>
              <ContentCopyIcon />
            </IconButton>
          ),
        }}
      />
    </Tooltip>
  )
}

CopyTextField.propTypes = {
  value: PropTypes.array,
  label: PropTypes.string,
}

export default CopyTextField
