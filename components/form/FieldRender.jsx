import React, { useEffect, useState } from "react"

import Autocomplete from "@mui/material/Autocomplete"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Button from "@mui/material/Button"
import InputAdornment from "@mui/material/InputAdornment"
import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import Grid from "@mui/material/Grid"
import MenuItem from "@mui/material/MenuItem"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

import PropTypes from "prop-types"

import DialogComponent from "../DialogComponent"

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

const Populate = ({
  name,
  default: defaultValue,
  display_name: displayName,
  options,
  value,
  description,
  ...props
}) => {
  const optionsObject = JSON.parse(options)
  return (
    <Row description={description}>
      <Autocomplete
        id={name}
        key={value}
        defaultValue={
          value == ""
            ? defaultValue == "None"
              ? ""
              : defaultValue.replace("[", "").replace("]", "")
            : value.replace("[", "").replace("]", "")
        }
        freeSolo
        options={optionsObject}
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option
          }
          if (option.inputValue) {
            return `${option.inputValue}`
          }
          return `${option.values}`
        }}
        renderOption={(props, option) => (
          <li {...props}>{option.display_name}</li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label={displayName}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">{props?.unit}</InputAdornment>
              ),
            }}
            helperText={"Input comma separated numbers: (min, best, max)"}
          />
        )}
        style={{ width: "100%" }}
      />
    </Row>
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
        .map((field, index) =>
          inputFields.length > 0 ? (
            <Number
              {...field}
              key={index}
              name={`${name}-${field.name}`}
              value={inputFields.find((f) => field.name === f[0])[1]}
            />
          ) : (
            <Number {...field} key={index} name={`${name}-${field.name}`} />
          )
        )}
    </>
  )
}

const Number = ({
  name,
  default: defaultValue,
  display_name: displayName,
  value = "",
  description,
  unit,
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
        defaultValue={value == "" ? defaultValue : value}
        style={{ width: "100%" }}
        placeholder={units}
        inputProps={{ step: 0.01 }}
        InputProps={
          unit && {
            endAdornment: (
              <InputAdornment position="end">{unit}</InputAdornment>
            ),
          }
        }
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
  default: defaultValue = "[0,0,0]",
  display_name: displayName,
  value = "",
  description,
  defaultHelper = "",
  unit,
  ...props
}) => {
  const units = getUnits(displayName)
  const label = cleanString(displayName)
  const [error, setError] = useState(false)

  if (defaultValue !== "None") {
    defaultHelper = `Default value: ${defaultValue}${
      units || ""
    } ${defaultHelper}`
  } else {
    defaultValue = ""
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
        defaultValue={
          value == ""
            ? defaultValue.replace("[", "").replace("]", "")
            : value.replace("[", "").replace("]", "")
        }
        style={{ width: "100%" }}
        InputProps={
          unit && {
            endAdornment: (
              <InputAdornment position="end">{unit}</InputAdornment>
            ),
          }
        }
        placeholder={units}
        helperText={
          defaultHelper !== ""
            ? defaultHelper
            : `Input comma separated numbers. ${defaultHelper}`
        }
        onChange={(e) => notValidInput(e)}
      />
    </Row>
  )
}

const InputWithOverlay = ({
  name,
  default: defaultValue,
  display_name: displayName,
  value = "",
  description,
  defaultHelper = "Open calculator",
  modal = "transportCalculator",
  ...props
}) => {
  const [openModal, setOpenModal] = useState(false)
  const [calcValue, setCalcValue] = useState(value)
  const Modal = MODALS[modal]

  useEffect(() => {
    setCalcValue(value)
  }, [value])
  return (
    <>
      <Array
        name={name}
        default={defaultValue}
        display_name={displayName}
        value={calcValue}
        key={value}
        description={description}
        defaultHelper={
          <span
            style={{
              color: "#0096FF",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => setOpenModal(true)}
          >
            {defaultHelper}
          </span>
        }
      />
      <Modal
        openModal={openModal}
        handleClose={() => setOpenModal(false)}
        setValue={setCalcValue}
        transportName={name}
      />
    </>
  )
}

const Text = ({
  name,
  default: defaultValue,
  display_name: displayName,
  value = "",
  description,
  ...props
}) => {
  const units = getUnits(displayName)
  const label = cleanString(displayName)
  let defaultHelper
  if (defaultValue !== "None") {
    defaultHelper = `Default value: ${defaultValue}${
      units || ""
    } ${defaultHelper}`
  } else {
    defaultValue = ""
  }
  return (
    <Row description={description}>
      <TextField
        label={label}
        id={name}
        key={value}
        defaultValue={value == "" ? defaultValue : value}
        style={{ width: "100%" }}
        helperText={defaultHelper}
      />
    </Row>
  )
}

const StagedInput = ({
  name,
  display_name: displayName,
  fields,
  description,
  value = "",
  ...props
}) => {
  const [steps, setSteps] = useState([{ id: 1 }])
  const [expanded, setExpanded] = useState("step1")

  const fieldsObject = JSON.parse(fields)
  const addStep = () => {
    const newStepId = steps.length + 1
    setSteps([...steps, { id: newStepId }])
  }
  const removeStep = (index) => {
    setSteps(steps.filter((s) => s.id !== index))
  }

  useEffect(() => {
    let parsedData
    if (value !== "") {
      parsedData = JSON.parse(value)
    } else {
      parsedData = []
    }
    const incomingValue = parsedData.map((el, i) => ({ id: i, ...el }))
    setSteps(incomingValue)
  }, [value])

  return (
    <Grid>
      {steps.map((step, index) => (
        <Accordion
          key={step.id}
          expanded={expanded === `step${step.id}` ? true : false}
          onChange={() => setExpanded(`step${step.id}`)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`step${step.id}-content`}
            id={`step${step.id}-header`}
          >
            <Typography>Step {step.id}</Typography>
          </AccordionSummary>
          <AccordionDetails id={`step${step.id}`}>
            {fieldsObject.map((element) => {
              const Renderer = renderers[element.type]
              console.log(element)
              return (
                <Renderer
                  key={element.name + "_" + index}
                  value={step && step[element.name]}
                  {...element}
                  default={element.default || ""}
                />
              )
            })}
          </AccordionDetails>
          <div
            style={{ display: "flex", justifyContent: "right", margin: "1rem" }}
          >
            <Button
              color="error"
              style={{ textTransform: "none" }}
              onClick={() => removeStep(step.id)}
            >
              Remove step
            </Button>
          </div>
        </Accordion>
      ))}

      <div style={{ display: "flex", justifyContent: "right", margin: "1rem" }}>
        <Button
          style={{
            float: "right",
            color: "white",
            backgroundColor: "#005B36",
            textTransform: "none",
            width: "6rem",
          }}
          onClick={addStep}
        >
          Add Step
        </Button>
      </div>
    </Grid>
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

Text.propTypes = {
  ...propTypes,
}

Select.propTypes = { ...propTypes, options: PropTypes.string }

Group.propTypes = {
  ...propTypes,
  fields: PropTypes.string,
}

StagedInput.propTypes = {
  ...propTypes,
  fields: PropTypes.string,
}

InputWithOverlay.propTypes = {
  ...propTypes,
}

Populate.propTypes = { ...propTypes, options: PropTypes.string }

const renderers = {
  number: Number,
  array: Array,
  text: Text,
  group: Group,
  select: Select,
  staged_input: StagedInput,
  modal: InputWithOverlay,
  populate: Populate,
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
function stageParser(field) {
  const accordions = document.querySelectorAll(".MuiAccordionDetails-root")
  const accordionValues = []

  accordions.forEach((accordion) => {
    const inputs = accordion.querySelectorAll("input")
    const accordionData = {}
    const fields = JSON.parse(field.fields)

    inputs.forEach((input, index) => {
      // accordionData[fields[index].name] = input.value;
      fields.forEach((f) => {
        if (input.getAttribute("id") == f.name) {
          accordionData[f.name] = input.value
        }
      })
    })

    accordionValues.push(accordionData)
  })

  return JSON.stringify(accordionValues)
}
const PARSERS = {
  number: inputParser,
  group: groupParser,
  array: arrayParser,
  select: inputParser,
  text: inputParser,
  staged_input: stageParser,
  modal: arrayParser,
  populate: arrayParser,
}

const MODALS = {
  transportCalculator: DialogComponent,
}

export function getFieldValue(field) {
  const value = PARSERS[field.type](field)
  return { name: field.name, value, type: field.type }
}
