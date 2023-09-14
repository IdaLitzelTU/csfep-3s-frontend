import React, { useState, useEffect } from "react"
import { useQuery } from "react-query"
import * as client from "../api/csfep"

const useCatalog = () => {
  const { data } = useQuery(["datasets"], client.fetchDatasets)

  const [catalog, setCatalog] = useState([])

  useEffect(() => {
    if (data) {
      setCatalog(data)
    }
  }, [data])

  return {
    catalog,
  }
}

export default useCatalog
