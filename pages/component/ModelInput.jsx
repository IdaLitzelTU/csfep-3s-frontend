import React from "react"
import { useQuery } from "react-query"
import * as client from "../api/csfep"

const ModelInput = () => {
  const { isLoading, error, data } = useQuery(
    ["model-input"],
    client.fetchModelInput
  )

  if (isLoading)
    <>
      <div>
        <p>Loading...</p>
      </div>
    </>

  if (error)
    <>
      <div>
        <p>{JSON.stringify(error)}</p>
      </div>
    </>

  return data && <div>{JSON.stringify(data)}</div>
}

export default ModelInput
