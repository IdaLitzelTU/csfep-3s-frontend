import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useQuery } from "react-query"
import * as client from "../api/csfep"


const useModelInput = ({ version }) => {

  const { data } = useQuery(["model-input", version], () =>
    client.fetchModelInput(version)
  )

  const [fields, setFields] = useState(undefined)

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

      setFields(tempFormData)
    }
  }, [data])


  return {
    fields
  }
}

useModelInput.propTypes = {
  version: PropTypes.string,
}

export default useModelInput
