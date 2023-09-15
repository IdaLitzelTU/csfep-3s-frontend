import React from "react"
import styles from "../styles/Home.module.css"
import { useQuery } from "react-query"
import * as client from "../api/csfep"
import DashboardV1 from "../components/dashboards/v1"
import DashboardVTC from "../components/dashboards/vTC"
import DashboardV3 from "../components/dashboards/v3"
import PropTypes from "prop-types"

export default function Model({ version, dataset, datasetName }) {
  const { data } = useQuery(["model-output", version, dataset], () =>
    typeof dataset === "number"
      ? client.fetchModelOutput(version, dataset)
      : client.runModel(version, dataset)
  )
  const render = ({ data, version, datasetName }) => {
    const availableModels = {
      v1: DashboardV1,
      v2: DashboardV1,
      v3: DashboardV3,
      vTC: DashboardVTC,
    }

    const Renderer = availableModels[version]
    return <Renderer data={data} version={version} datasetName={datasetName} />
  }

  return (
    <main className={styles.main}>
      {data && <div>{render({ version, dataset, data, datasetName })}</div>}
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
