import React, { useState, useEffect } from "react"

import { useQuery } from "react-query"
import * as client from "../api/csfep"

const useVersions = () => {
  const { data } = useQuery(["model-versions"], client.fetchModelVersion)

  const [versions, setVersions] = useState(undefined)

  useEffect(() => {
    if (data) {
      data.sort()
      setVersions(data)
    }
  }, [data])

  return {
    versions,
  }
}

export default useVersions
