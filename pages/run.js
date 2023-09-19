import React from "react"
import styles from "../styles/Home.module.css"
import { useQuery } from "react-query"

import * as client from "../api/csfep"

import ReturnButton from "../components/navigation/Return"
import DashboardV1 from "../components/dashboards/v1"
import DashboardVTC from "../components/dashboards/vTC"

import PropTypes from "prop-types"

export default function Model({ version, dataset, dataset_name }) {
  const { data } = useQuery(["model-output", version, dataset], () =>
    typeof dataset === "number"
      ? client.fetchModelOutput(version, dataset)
      : client.runModel(version, dataset)
  )
  const render = ({ data, version, dataset }) => {
    const availableModels = {
      v1: DashboardV1,
      v2: DashboardV1,
      vTC: DashboardVTC,
    }

    const Renderer = availableModels[version]
    return (
      <Renderer
        data={data}
        version={version}
        dataset={dataset}
        dataset_name={dataset_name}
      />
    )
  }

  return (
    <main className={styles.main}>
      <ReturnButton />
      {data && <div>{render({ version, dataset, data })}</div>}
    </main>
  )
}

Model.getInitialProps = async ({ query }) => {
  const { version, dataset, dataset_name } = query
  return { version, dataset: JSON.parse(dataset), dataset_name }
}

Model.propTypes = {
  version: PropTypes.string,
  dataset: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  dataset_name: PropTypes.string,
}
