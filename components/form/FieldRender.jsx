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
import Switch from "@mui/material/Switch"
import FormControlLabel from "@mui/material/FormControlLabel"

import PropTypes from "prop-types"

import DialogComponent from "../DialogComponent"

const Row = ({ children, description }) => {
  return (
    <Grid
      container
      columns={5}
      spacing={2}
      style={{
        paddingBottom: "24px",
        justifyContent: "space-between",
      }}
    >
      {description !== "hide" && (
        <>
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
          <Grid item xs={1} />
        </>
      )}
      <Grid item xs>
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

const getFieldData = (fieldName) =>
  inputFields.find(([name]) => name === fieldName)?.[1] || {
    mass: "",
    state: "dry",
    sourcing_energy_id: None,
    manufacturing_energy_id: None,
  }

const Group = ({
  name,
  display_name: displayName,
  fields,
  description,
  value = "",
}) => {
  const [selectedFields, setSelectedFields] = useState([])
  const [inputFields, setInputFields] = useState({})

  const fieldsObject = JSON.parse(fields)
  
  useEffect(() => {
    if (value) {
      const parsedFields = JSON.parse(value)

      const normalized = {}

      Object.entries(parsedFields).forEach(([key, val]) => {
        normalized[key] =
          typeof val === "object"
            ? val
            : {
                mass: val,
                state: "dry",
                sourcing_energy_id: null,        
                manufacturing_energy_id: null,  
              }
      })

      setSelectedFields(Object.keys(normalized))
      setInputFields(normalized)
    } else {
      setSelectedFields([])
      setInputFields({})
    }
  }, [value])

  const handleChange = (event) => {
    const value =
      typeof event.target.value === "string"
        ? event.target.value.split(",")
        : event.target.value

    setSelectedFields(value)

    setInputFields((prev) => {
      const next = { ...prev }

      value.forEach((fieldName) => {
        if (!next[fieldName]) {
          next[fieldName] = {
            mass: "",
            state: "dry",
            sourcing_energy_id: null,        
            manufacturing_energy_id: null,   
          }
        }
      })

      Object.keys(next).forEach((fieldName) => {
        if (!value.includes(fieldName)) {
          delete next[fieldName]
        }
      })

      return next
    })
  }

  const getFieldData = (fieldName) =>
    inputFields[fieldName] || {
      mass: "",
      state: "dry",
      sourcing_energy_id: null,
      manufacturing_energy_id: null,
    }

  const updateMass = (fieldName, mass) => {
    setInputFields((prev) => ({
      ...prev,
      [fieldName]: {
        ...getFieldData(fieldName),
        mass,
      },
    }))
  }

  const updateState = (fieldName, state) => {
    setInputFields((prev) => ({
      ...prev,
      [fieldName]: {
        ...getFieldData(fieldName),
        state,
      },
    }))
  }

  // --- Funktion für Sourcing Energie-ID ---
  const updateSourcingEnergy = (fieldName, energyId) => {
    setInputFields((prev) => ({
      ...prev,
      [fieldName]: {
        ...getFieldData(fieldName),
        sourcing_energy_id: energyId, // Setzt entweder die ID oder null
      },
    }))
  }

  // --- Funktion für Manufacturing Energie-ID ---
  const updateManufacturingEnergy = (fieldName, energyId) => {
    setInputFields((prev) => ({
      ...prev,
      [fieldName]: {
        ...getFieldData(fieldName),
        manufacturing_energy_id: energyId, // Setzt entweder die ID oder null
      },
    }))
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
    {description !== "hide" && (
    <Row description={description}>
      <span style={{ fontSize: "12px" }}>
      Please enter the mass of each selected material. If applicable, specify whether it is fresh or dry. 
      You may also indicate the energy source used for raw material sourcing and the manufacturing process 
      if you want to include the energy balances of these processing steps.
      </span>
    </Row>
    )}
    {fieldsObject
      .filter((field) => selectedFields.includes(field.name))
      .map((field) => {
        // Zustand auslesen, um zu prüfen, ob bereits eine ID (also ungleich null) gesetzt ist
        const sourcingSelected = getFieldData(field.name).sourcing_energy_id !== null && getFieldData(field.name).sourcing_energy_id !== undefined;
        const manufacturingSelected = getFieldData(field.name).manufacturing_energy_id !== null && getFieldData(field.name).manufacturing_energy_id !== undefined;

        return (
          <React.Fragment key={field.name}>
            {/* UMHÜLLENDER CONTAINER FÜR DIE MATERIAL-GRUPPE */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "5px", paddingBottom: "0px", borderBottom: "1px solid #d9d9d9", width: "100%", paddingLeft: "50px",}} >  
            <h4
              style={{
                margin: 5,
                color: "#005B36",
                fontSize: "13px",
                fontWeight: 550,
              }}
            >
              {field.display_name}
            </h4>
  
              
              {/* Erste Zeile: Flex-Container, um Number-Input und Button nebeneinander zu platzieren */}
              <div style={{ display: "flex", alignItems: "center", marginBottom: "-0px",  gap: "12px", width: "100%" }}>
                
                <Number
                  {...field}
                  display_name="Mass"
                  name={`${name}-${field.name}`}
                  value={getFieldData(field.name).mass}
                  description={
                    description === "hide"
                      ? description
                      : field.description
                  }
                  onChange={(e) =>
                    updateMass(field.name, e.target.value)
                  }
                />

                {/* TOGGLE BUTTON FRESH-DRY*/}
                {field.has_moisture_option && (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <button
                      id={`${name}-${field.name}-state-btn`}
                      type="button"
                      onClick={() =>
                        updateState(
                          field.name,
                          getFieldData(field.name).state === "dry" ? "fresh" : "dry"
                        )
                      }
                      style={{
                        height: "30px",
                        padding: "10px",
                        borderRadius: "18px",
                        border: "1px solid #ccc",
                        marginTop: "-20px",
                        background: getFieldData(field.name).state === "dry" ? "#005B36" : "#efc005",
                        color: getFieldData(field.name).state === "dry" ? "#efc005" : "#005B36",
                        cursor: "pointer",
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {getFieldData(field.name).state === "dry" ? "DRY" : "FRESH"}
                    </button>
                  </div>
                )}
              </div>

              {/* Zweite Zeile: Optionale Energie-Auswahlfelder mit Aktivierungs-Checkboxen */}
              <div style={{ display: "flex", gap: "20px", width: "100%", flexWrap: "wrap", marginBottom: "20px", }}>
                
                {/* SOURCING OPTION */}
                {field.has_sourcing_option && (
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px", minWidth: "200px" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "12px" }}>
                      <input 
                        type="checkbox" 
                        checked={sourcingSelected}
                        onChange={(e) => {
                          // Wenn abgehakt, wird NULL gesetzt, andernfalls z.B. die erste verfügbare ID oder leer
                          if (!e.target.checked) {
                            updateSourcingEnergy(field.name, null);
                          } else {
                            updateSourcingEnergy(field.name, field.energy_sources[0]?.id || "");
                          }
                        }}
                      />
                      Include Sourcing
                    </label>

                    {sourcingSelected && (
                      <TextField
                        select
                        label="Energy Source"
                        style={{ width: "100%" }}
                        value={getFieldData(field.name).sourcing_energy_id || ""}
                        onChange={(e) => updateSourcingEnergy(field.name, e.target.value)}
                        inputProps={{ id: `${name}-${field.name}-sourcing` }}
                      >
                        {field.energy_sources.map((source) => (
                          <MenuItem key={source.id} value={source.id}>
                            {source.source}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  </div>
                )}

                {/* MANUFACTURING OPTION */}
                {field.has_manufacturing_option && (
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px", minWidth: "200px" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "12px" }}>
                      <input 
                        type="checkbox" 
                        checked={manufacturingSelected}
                        onChange={(e) => {
                          // Wenn abgehakt, wird NULL gesetzt
                          if (!e.target.checked) {
                            updateManufacturingEnergy(field.name, null);
                          } else {
                            updateManufacturingEnergy(field.name, field.energy_sources[0]?.id || "");
                          }
                        }}
                      />
                      Include Manufacturing
                    </label>

                    {manufacturingSelected && (
                      <TextField
                        select
                        label="Energy Source"
                        style={{ width: "100%" }}
                        value={getFieldData(field.name).manufacturing_energy_id || ""}
                        onChange={(e) => updateManufacturingEnergy(field.name, e.target.value)}
                        inputProps={{ id: `${name}-${field.name}-manufacturing` }}
                      >
                        {field.energy_sources.map((source) => (
                          <MenuItem key={source.id} value={source.id}>
                            {source.source}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  </div>
                )}

              </div>
            </div>
          </React.Fragment>
        );
      })}
  </>
)
}

const Number = ({
  name,
  default: defaultValue,
  display_name: displayName,
  value = "",
  description,
  min,
  max,
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
        inputProps={{
          step: 0.1,
          min: min,
          max: max,
        }}
        InputProps={{
          endAdornment: unit && (
            <InputAdornment position="end">{unit}</InputAdornment>
          ),
        }}
        helperText={
          defaultValue === "None"
            ? ""
            : `Default value: ${defaultValue}${units || ""}`
        }
        onChange={(e) => {
          if (e.target.value > max) e.target.value = max
          if (e.target.value < min) e.target.value = min
        }}
      />
    </Row>
  )
}

const Number2 = ({
  name,
  default: defaultValue,
  display_name: displayName,
  value = "",
  description,
  min,
  max,
  unit,
  onChange,
  ...props
}) => {
  const units = getUnits(displayName)
  const label = cleanString(displayName)

  const handleInputChange = (e) => {
    let val = e.target.value;

    if (val !== "") {
      const numVal = parseFloat(val);
      if (numVal > max) val = max.toString();
      if (numVal < min) val = min.toString();
    }

    if (onChange) {
      e.target.value = val;
      onChange(e);
    }
  };

  return (
    <Row description={description}>
      <TextField
        label={label}
        type="number2"
        // id={name} <-- HIER GELÖSCHT, da es sonst auf dem äußeren Container landet!
        value={value === "" && defaultValue !== "None" ? defaultValue : value}
        style={{ width: "100%" }}
        placeholder={units}
        InputProps={{
          endAdornment: unit && (
            <InputAdornment position="end">{unit}</InputAdornment>
          ),
        }}
        // WICHTIG: Die ID muss exakt auf dem echten Input-Feld liegen!
        inputProps={{
          id: name, // <-- HIERHER VERSCHOBEN
          step: 0.1,
          min: min,
          max: max,
        }}
        helperText={
          defaultValue === "None"
            ? ""
            : `Default value: ${defaultValue}${units || ""}`
        }
        onChange={handleInputChange}
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
  unit,
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
        unit={unit}
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
              return (
                <Renderer
                  key={element.name + "_" + index}
                  value={step?.[element.name] ?? ""}
                  {...element}
                  default={element.default || ""}
                  {...(description == "hide" ? { description: "hide" } : {})}
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

Number2.propTypes = {
  ...propTypes,
  description: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  unit: PropTypes.string,
  onChange: PropTypes.func,
}

Number.propTypes = {
  ...propTypes,
  min: PropTypes.number,
  max: PropTypes.number,
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
  number2: Number2,
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
  // Falls der Wert null, undefined oder gar nicht da ist, gib einen leeren Text zurück
  if (string === null || string === undefined) return ""; 
  
  // .toString() wandelt Zahlen (wie deine IDs) sicher in Text um, bevor .split() gerufen wird
  return string.toString().split("(")[0].trim();
}

function arrayParser(field) {
  return `[${inputParser(field)}]`
}

function inputParser(field) {
  const element = document.getElementById(field.name)
  return element.value
}

function groupParser(field) {
  const fields = JSON.parse(field.fields);
  const activeFields = fields.filter((f) =>
    document.getElementById(`${field.name}-${f.name}`)
  )
  const out = {};
  console.log("fields", fields);

  console.log(
    "active fields",
    activeFields.map((f) => f.name)
  )

  activeFields.forEach((f) => {
    const groupName = field.name;
    const fieldId = f.name ? f.name.toString() : ""; 
    const baseId = `${groupName}-${fieldId}`;

    // 1. Das Element für die Masse holen und absichern
    let massElement = document.getElementById(baseId);
    console.log("Suche:", baseId);
    console.log("Gefunden:", document.getElementById(baseId));
    console.log("element", massElement)
    console.log("tag", massElement.tagName)
    console.log("value", massElement.value)
    console.log("outerHTML", massElement.outerHTML)
    
    if (!massElement) {
      return;
    }

    // Falls es eine Custom-Komponente ist, tiefer graben
    if (massElement.tagName !== "INPUT") {
      const nativeInput = massElement.querySelector("input") || massElement.shadowRoot?.querySelector("input");
      if (nativeInput) massElement = nativeInput;
    }

    // Wert auslesen (verschiedene Wege absichern)
    let rawMass = massElement.value !== undefined ? massElement.value : massElement.getAttribute('value');
    let massValue = 0;
    if (rawMass !== undefined && rawMass !== null && rawMass !== "") {
      massValue = rawMass;
      if (isNaN(massValue)) massValue = 0;
    }
    

    // 2. Den State (DRY/FRESH) auslesen
    const stateButton = document.getElementById(`${baseId}-state-btn`);
    // Nutze trim(), um versteckte Leerzeichen zu entfernen
    const currentState = stateButton ? stateButton.textContent.trim().toLowerCase() : "dry";

    // 3. Sourcing Energie-ID auslesen
    let sourcingElement = document.getElementById(`${baseId}-sourcing`);
    if (sourcingElement && sourcingElement.tagName !== "INPUT") {
      const nativeSourcing = sourcingElement.querySelector("input") || sourcingElement.shadowRoot?.querySelector("input");
      if (nativeSourcing) sourcingElement = nativeSourcing;
    }

    let rawSourcing = sourcingElement ? (sourcingElement.value !== undefined ? sourcingElement.value : sourcingElement.getAttribute('value')) : null;
    const sourcingValue = rawSourcing !== undefined && rawSourcing !== null && rawSourcing !== "" 
      ? rawSourcing
      : null;

    // 4. Manufacturing Energie-ID auslesen
    let manufacturingElement = document.getElementById(`${baseId}-manufacturing`);
    if (manufacturingElement && manufacturingElement.tagName !== "INPUT") {
      const nativeManufacturing = manufacturingElement.querySelector("input") || manufacturingElement.shadowRoot?.querySelector("input");
      if (nativeManufacturing) manufacturingElement = nativeManufacturing;
    }

    let rawManufacturing = manufacturingElement ? (manufacturingElement.value !== undefined ? manufacturingElement.value : manufacturingElement.getAttribute('value')) : null;
    const manufacturingValue = rawManufacturing !== undefined && rawManufacturing !== null && rawManufacturing !== "" 
      ? rawManufacturing
      : null;


    out[f.name] = {
      mass: massValue,
      state: currentState,
      sourcing_energy_id: (sourcingValue === null || isNaN(sourcingValue)) ? null : sourcingValue,
      manufacturing_energy_id: (manufacturingValue === null || isNaN(manufacturingValue)) ? null : manufacturingValue
    };
    

    console.log(`Parsed ${f.name}:`, out[f.name]);
  });


  return JSON.stringify(out);
}

function stageParser(field) {
  const accordions = document.querySelectorAll(".MuiAccordionDetails-root")
  const accordionValues = []

  const fields = JSON.parse(field.fields)

  accordions.forEach((accordion) => {
    const inputs = accordion.querySelectorAll("input")
    const accordionData = {}

    inputs.forEach((input) => {
      fields.forEach((f) => {
        if (input.getAttribute("id") == f.name) {
          const raw = input.value?.trim()

          accordionData[f.name] = raw === "" ? null : raw
        }
      })
    })

    // nur hinzufügen wenn NICHT komplett leer
    const hasData = Object.values(accordionData).some(
      (v) => v !== null && v !== ""
    )

    if (hasData) {
      accordionValues.push(accordionData)
    }
  })

  return JSON.stringify(accordionValues)
}


const PARSERS = {
  number: inputParser,
  number2: inputParser,
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
