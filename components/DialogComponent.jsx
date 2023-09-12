import React, { useState, useEffect, useContext } from "react"
import PropTypes from "prop-types"
import { Dialog } from "@mui/material"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { useQuery } from "react-query"
import * as client from "../api/csfep"
import { Button } from "@mui/material"
import { getFieldValue } from "./FieldRender"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import CircularProgress from "@mui/material/CircularProgress"
import ModelMeta from "./ModelMeta"
import ModelRender from "./ModelRender"
import DatasetSelection from "./DatasetSelection"

const dataset_object = {
  id: "-1",
  dataset_name: "",
  organisation_name: "",
  publisher_name: "",
  description: "",
  version: [{ name: "vTC" }],
}

const DialogComponent = ({ openModal, handleClose, setValue }) => {
  const version = "vTC"
  const { data, isLoading } = useQuery(["model-input", version], () =>
    client.fetchModelInput(version)
  )
  const [dataset, setDataset] = useState(dataset_object)
  const { data: selectedData } = useQuery(
    ["model-input-data", dataset.id],
    () => client.fetchSelectedData(dataset.id)
  )

  const [formData, setFormData] = useState(undefined)
  const [body, setBody] = useState({})
  const [status, setStatus] = useState("Loading...")
  const [applyStatus, setApplyStatus] = useState(false)

  const [newChecked, setNewChecked] = useState(false)

  useEffect(() => {
    if (data) {
      const categories = data
        ? [...new Set(data.input.map((el) => el.category))]
        : []

      const tempFormData = {}

      categories.forEach((key) => {
        tempFormData[key] = data
          ? data.input.filter((el) => el.category === key)
          : [{}]
      })

      setFormData(tempFormData)
    }
  }, [data])

  useEffect(() => {
    if (selectedData) {
      const inputData = {}
      selectedData.forEach((el) => {
        inputData[el.key] = JSON.parse(el.value)
      })
      setBody(inputData)
    }
  }, [selectedData])

  function getData() {
    const names = data ? [...new Set(data.input)] : []
    let inputData = []

    names.forEach((input) => {
      // console.log(input)
      inputData.push(getFieldValue(input))
    })
    const datasetMeta = [
      "dataset_name",
      "publisher_name",
      "organisation_name",
      "description",
    ]
    const newDataset = {}
    console.log("show", dataset)
    datasetMeta.forEach((dm) => {
      //console.log("element-dialog",document.getElementById(dm).value)
      newDataset[dm] = dataset[dm]
    })
    newDataset["version"] = version
    newDataset["data"] = inputData
    return newDataset
  }

  const handleClick = async () => {
    const payload = getData()
    //console.log(payload)
    setStatus("Checking your data")
    setApplyStatus(true)
    // if new create dataset then run model otherwise run model
    if (newChecked) {
      console.log("new", payload)
      client.postNewDataset(payload).then((r) => {
        console.log("saved dataset", r)
        client
          .runModel("vTC", payload.data)
          .then((res) => {
            const final = res.map((r) => r.toFixed(2))
            setApplyStatus(false)
            setValue(final.toString())
            console.log(r)

            handleClose()
          })
          .catch((error) => {
            console.log(error)
          })
      })
    } else {
      console.log("not new", payload)
      client
        .runModel("vTC", payload.data)
        .then((res) => {
          const final = res.map((r) => r.toFixed(2))
          setApplyStatus(false)
          setValue(final.toString())
          console.log(inputData)

          handleClose()
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
  //console.log(dataset)
  return (
    <Dialog maxWidth="xl" fullWidth open={openModal} onClose={handleClose}>
      <DialogTitle>
        Carbon emission calculator
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>

        <ModelMeta version={version}/>
        <DatasetSelection
          version={version}
          dataset={dataset}
          setDataset={setDataset}
          newChecked={newChecked}
          setNewChecked={setNewChecked}
        />

        <ModelRender version={version} dataset={dataset} />

      </DialogContent>
      <DialogActions style={{ marginLeft: "1rem" }}>
        <Button
          style={{
            color: "white",
            backgroundColor: "#005B36",
            textTransform: "none",
            width: "6rem",
            marginRight: "1rem",
          }}
          onClick={handleClick}
        >
          {applyStatus ? (
            <CircularProgress color="inherit" size={15} />
          ) : (
            "Apply"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

DialogComponent.propTypes = {
  openModal: PropTypes.boolean,
  handleClose: PropTypes.function,
  setValue: PropTypes.function,
}

export default DialogComponent
