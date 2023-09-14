import React, { useState } from "react"

import PropTypes from "prop-types"

import CloseIcon from "@mui/icons-material/Close"
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material"

import DatasetSelection from "./DatasetSelection"
import FormRender from "./FormRender"
import ModelMeta from "./ModelMeta"
import Loader from "./Loader"

import useCatalog from "../hooks/useCatalog"
import useData from "../hooks/useData"
import useModel from "../hooks/useModel"

import * as client from "../api/csfep"

import { getData } from "./form/model"

const dataset_object = {
  id: "-1",
  dataset_name: "",
  organisation_name: "",
  publisher_name: "",
  description: "",
  version: [{ name: "vTC" }],
}

const DialogComponent = ({
  version = "vTC",
  openModal,
  handleClose,
  setValue,
}) => {
  const [dataset, setDataset] = useState(dataset_object)

  const { model } = useModel({ version })
  const { catalog } = useCatalog()
  const { data } = useData({ dataset })

  const [applyStatus, setApplyStatus] = useState(false)

  const [newChecked, setNewChecked] = useState(false)

  const handleClick = async () => {
    const payload = getData(model, version)
    setApplyStatus(true)
    // if new create dataset then run model otherwise run model
    if (newChecked) {
      client.postNewDataset(payload).then((r) => {
        client
          .runModel("vTC", payload.data)
          .then((res) => {
            const final = res.map((r) => r.toFixed(2))
            setValue(final.toString())
            setApplyStatus(false)
            handleClose()
          })
          .catch((error) => {
            console.log(error)
          })
      })
    } else {
      client
        .runModel("vTC", payload.data)
        .then((res) => {
          const final = res.map((r) => r.toFixed(2))
          setValue(final.toString())
          setApplyStatus(false)
          handleClose()
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

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
        <Loader loading={applyStatus} status={"Loading"} />
        <ModelMeta version={version} />
        <DatasetSelection
          catalog={catalog}
          version={version}
          dataset={dataset}
          setDataset={setDataset}
          newChecked={newChecked}
          setNewChecked={setNewChecked}
        />

        <FormRender model={model} data={data} />
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
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  )
}

DialogComponent.propTypes = {
  version: PropTypes.string,
  openModal: PropTypes.boolean,
  handleClose: PropTypes.function,
  setValue: PropTypes.function,
}

export default DialogComponent
