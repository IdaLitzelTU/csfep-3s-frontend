import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useQuery } from "react-query"
import * as client from "../api/csfep"

const useModel = ({ version }) => {
  const { data, refetch } = useQuery(["model-input", version], () =>
    client.fetchModelInput(version)
  )

  const [model, setModel] = useState(undefined)

  useEffect(() => {
    if (version && data) {
      console.log(data)
      const categories = data
        ? [...new Set(data.input.map((el) => el.category))]
        : []

      const tempFormData = {}

      categories.forEach((key) => {
        tempFormData[key] = data
          ? data.input.filter((el) => el.category === key)
          : [{}]
      })

      setModel(data)
    }
  }, [data, version])

  return {
    model,
  }
}

useModel.propTypes = {
  version: PropTypes.string,
}

export default useModel
