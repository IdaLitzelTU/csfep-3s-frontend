import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import FormRender from "./FormRender"
import { useQuery } from "react-query"
import * as client from "../api/csfep"

const ModelRender = ({ version, dataset }) => {
  const { data } = useQuery(["model-input", version], () =>
    client.fetchModelInput(version)
  )

  const { data: selectedData } = useQuery(
    ["model-input-data", dataset.id],
    () =>
      dataset.id !== "-1" && dataset.id !== undefined
        ? client.fetchSelectedData(dataset.id)
        : []
  )

  const [formData, setFormData] = useState(undefined)
  const [body, setBody] = useState({})

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
        inputData[el.key] = el.value
      })
      setBody(inputData)
    }
  }, [selectedData])

  return (
    <>
      <FormRender formData={formData} defaultData={body} />
    </>
  )
}

ModelRender.propTypes = {
  version: PropTypes.string,
  dataset: PropTypes.object,
}

export default ModelRender
