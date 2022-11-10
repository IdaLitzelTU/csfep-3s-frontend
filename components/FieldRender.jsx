import React, { useState } from "react"
import PropTypes from "prop-types"
import TextField from "@mui/material/TextField"

const Number = ({
  key,
  default: defaultValue,
  display_name,
  value,
  ...props
}) => {
  const units = getUnits(display_name)
  const label = cleanString(display_name)

  return (
    <div>
      <TextField
        label={label}
        type="number"
        id={key}
        key={key}
        defaultValue={value}
        style={{ width: "100%" }}
        placeholder={units}
        helperText={
          defaultValue === "None"
            ? ""
            : `Default value: ${defaultValue}${units ? units : ""}`
        }
      />
    </div>
  )
}

const Array = ({
  key,
  default: defaultValue,
  display_name,
  value,
  ...props
}) => {
  const units = getUnits(display_name)
  const label = cleanString(display_name)
  const [error, setError] = useState(false)
  let defaultHelper = ""
  if (defaultValue !== "None") {
    defaultHelper = `Default value: ${defaultValue}${units ? units : ""}`
  }

  function notValidInput(input) {
    setError(false)
    const elements = input.target.value.split(",")
    if (elements.length < 2) {
      setError(true)
    }
    elements.forEach((el) => {
      if (isNaN(el)) {
        setError(true)
      }
    })
    return error
  }

  return (
    <div>
      <TextField
        label={label}
        error={error}
        id={key}
        key={key}
        defaultValue={value}
        style={{ width: "100%" }}
        placeholder={units}
        helperText={`Input comma separated numbers. ${defaultHelper}`}
        onChange={(e) => notValidInput(e)}
      />
    </div>
  )
}

Array.propTypes = {
  key: PropTypes.string,
  default: PropTypes.string,
  display_name: PropTypes.string,
  value: PropTypes.string,
}

Number.propTypes = {
  key: PropTypes.string,
  default: PropTypes.string,
  display_name: PropTypes.string,
  value: PropTypes.string,
}

const renderers = {
  number: Number,
  "array[number]": Array,
}

export default renderers

function getUnits(string) {
  let units
  try {
    const [left, right] = string.split("(")
    const rest = right.split(")")
    units = rest[0]
  } catch {
    return undefined
  }
  return units
}

function cleanString(string) {
  return string.split("(")[0]
}
