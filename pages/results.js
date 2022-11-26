import React from "react"
import styles from "../styles/Home.module.css"
import { useQuery } from "react-query"
import * as client from "../api/csfep"
import Dashboard from "../components/Dashboard"
import PropTypes from "prop-types"

export default function Model({ version, dataset }) {
  const { data } = useQuery(["model-output", version, dataset], () =>
    client.fetchModelOutput(version, dataset)
  )

  return (
    <main className={styles.main}>
      {data && (
        <div>
          <Dashboard data={data} version={version} dataset={dataset} />
        </div>
      )}
    </main>
  )
}

Model.getInitialProps = async ({ query }) => {
  const { version, dataset } = query
  return { version, dataset }
}

Model.propTypes = {
  version: PropTypes.string,
  dataset: PropTypes.string,
}
