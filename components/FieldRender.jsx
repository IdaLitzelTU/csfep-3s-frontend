import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import MenuItem from "@mui/material/MenuItem"

const Row = ({ children, description }) => {
  return (
    <Grid
      container
      columns={5}
      style={{ paddingBottom: "24px", justifyContent: "space-between" }}
    >
      <Grid item xs={2}>
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography>{description}</Typography>
        </div>
      </Grid>
      <Grid item xs={2}>
        <div>{children}</div>
      </Grid>
    </Grid>
  )
}

const Select = ({
  name,
  default: defaultValue,
  display_name: displayName,
  options,
  value,
  description,
  ...props
}) => {
  const [selectedValue, setSelectedValue] = useState(value)
  const optionsObject = JSON.parse(options)

  useEffect(() => {
    setSelectedValue(value)
  }, [value])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    setSelectedValue(value)
  }

  return (
    <>
      <Row description={description}>
        <TextField
          select
          key={value}
          label={displayName}
          style={{ width: "100%" }}
          inputProps={{
            id: name,
            value: selectedValue,
            onChange: handleChange,
          }}
        >
          {optionsObject.map((field) => (
            <MenuItem key={field.name} value={field.name}>
              {field.display_name}
            </MenuItem>
          ))}
        </TextField>
      </Row>
    </>
  )
}

const Group = ({
  name,
  display_name: displayName,
  fields,
  description,
  value = "",
  ...props
}) => {
  const [selectedFields, setSelectedFields] = useState([])
  const [inputFields, setInputFields] = useState([])
  
  const fieldsObject = JSON.parse(fields)

  useEffect(() => {
    if (!!value) {
      const parsedFields = JSON.parse(value)
      setSelectedFields(Object.keys(parsedFields))
      setInputFields(Object.entries(parsedFields))
    } else {
      setSelectedFields([])
      setInputFields([])
    }
  }, [value])
  // row at the top with stateful multi-select
  // based on the select, filter the array of fields and render it with rows

  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    setSelectedFields(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    )
  }

  return (
    <>
      <Row description={description}>
        <TextField
          select
          id={name}
          label={displayName}
          style={{ width: "100%" }}
          SelectProps={{
            multiple: true,
          }}
          inputProps={{
            id: name,
            value: selectedFields,
            onChange: handleChange,
          }}
        >
          {fieldsObject.map((field) => (
            <MenuItem key={field.name} value={field.name}>
              {field.display_name}
            </MenuItem>
          ))}
        </TextField>
      </Row>
      {fieldsObject
        .filter((field) => selectedFields.includes(field.name))
        .map((field, index) => inputFields.length > 0 ? (
          <Number
          {...field}
          key={index}
          name={`${name}-${field.name}`}
          value={inputFields.find((f) => field.name === f[0])[1]}
        />
        ) : (
          <Number {...field} key={index} name={`${name}-${field.name}`} />
        ))}
    </>
  )
}

const Number = ({
  name,
  default: defaultValue,
  display_name: displayName,
  value = "",
  description,
  ...props
}) => {
  const units = getUnits(displayName)
  const label = cleanString(displayName)

  return (
    <Row description={description}>
      <TextField
        label={label}
        type="number"
        id={name}
        key={value}
        defaultValue={value}
        style={{ width: "100%" }}
        placeholder={units}
        inputProps={{ step: 0.01 }}
        helperText={
          defaultValue === "None"
            ? ""
            : `Default value: ${defaultValue}${units || ""}`
        }
      />
    </Row>
  )
}

const Array = ({
  name,
  default: defaultValue,
  display_name: displayName,
  value = "",
  description,
  ...props
}) => {
  const units = getUnits(displayName)
  const label = cleanString(displayName)
  const [error, setError] = useState(false)
  let defaultHelper = ""
  if (defaultValue !== "None") {
    defaultHelper = `Default value: ${defaultValue}${units || ""}`
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
    <Row description={description}>
      <TextField
        label={label}
        error={error}
        id={name}
        key={value}
        defaultValue={value.replace("[", "").replace("]", "")}
        style={{ width: "100%" }}
        placeholder={units}
        helperText={`Input comma separated numbers. ${defaultHelper}`}
        onChange={(e) => notValidInput(e)}
      />
    </Row>
  )
}

const propTypes = {
  name: PropTypes.string,
  default: PropTypes.string,
  display_name: PropTypes.string,
  value: PropTypes.string,
  description: PropTypes.string,
}

Row.propTypes = {
  children: PropTypes.element,
  description: PropTypes.string,
}

Array.propTypes = {
  ...propTypes,
}

Number.propTypes = {
  ...propTypes,
}

Select.propTypes = { ...propTypes, options: PropTypes.string }

Group.propTypes = {
  ...propTypes,
  fields: PropTypes.string,
}

const renderers = {
  number: Number,
  "array[number]": Array,
  group: Group,
  select: Select,
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

function arrayParser(field) {
  return `[${inputParser(field)}]`
}

function inputParser(field) {
  const element = document.getElementById(field.name)
  return element.value
}

function groupParser(field) {
  const fields = JSON.parse(field.fields)
  const out = {}
  fields.forEach((f) => {
    const groupName = field.name
    const element = document.getElementById(`${groupName}-${f.name}`)
    if (element) {
      out[f.name] = element.value
    }
  })
  return JSON.stringify(out)
}

const PARSERS = {
  number: inputParser,
  group: groupParser,
  "array[number]": arrayParser,
  select: inputParser,
}

export function getFieldValue(field) {
  const value = PARSERS[field.type](field)
  return { [field.name]: value }
}
