import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useQuery } from "react-query"
import * as client from "../api/csfep"

const useData = ({ dataset }) => {
  const { data: body } = useQuery(["model-input-data", dataset.id], () =>
    dataset.id !== "-1" && dataset.id !== undefined
      ? client.fetchSelectedData(dataset.id)
      : []
  )

  const [data, setData] = useState({})

  useEffect(() => {
    if (body) {
      const inputData = {}
      body.forEach((el) => {
        inputData[el.key] = el.value
      })
      setData(inputData)
    }
  }, [body])

  return { data }
}

useData.propTypes = {
  dataset: PropTypes.object,
}

export default useData
