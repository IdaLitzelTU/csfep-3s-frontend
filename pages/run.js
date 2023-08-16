import React from "react"
import styles from "../styles/Home.module.css"
import { useQuery } from "react-query"
import * as client from "../api/csfep"
import DashboardV1 from "../components/dashboards/v1"
import PropTypes from "prop-types"

export default function Model({ version, dataset }) {
  const { data } = useQuery(["model-output", version, dataset], () => {
    if (typeof dataset === "number") {
      return client.fetchModelOutput(version, dataset);
    }
    return client.runModel(version, dataset);
  })

  const render = ({ data, version, dataset }) => {
    const availableModels = {
      v1: DashboardV1,
      v2: DashboardV1,
    }

    const Renderer = availableModels[version]
    return <Renderer data={data} version={version} dataset={dataset} />
  }

  return (
    <main className={styles.main}>
      {data && <div>{render({ version, dataset, data })}</div>}
    </main>
  )
}

Model.getInitialProps = async ({ query }) => {
  const { version, dataset } = query
  return { version, dataset: JSON.parse(dataset) }
}

Model.propTypes = {
  version: PropTypes.string,
  dataset: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
}
