import React, { useState, useEffect } from "react"

import { useQuery } from "react-query"
import * as client from "../api/csfep"

const useVersions = () => {
  const { data } = useQuery(["model-versions"], client.fetchModelVersion)

  const [versions, setVersions] = useState(undefined)
  const [meta, setMeta] = useState(undefined)

  useEffect(() => {
    if (data) {
      setVersions(data.results.sort())
      setMeta(data.meta)
    }
  }, [data])

  return {
    versions,
    meta,
  }
}

export default useVersions
