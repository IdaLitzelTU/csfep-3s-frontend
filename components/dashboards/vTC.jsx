import React from "react"
import PropTypes from "prop-types"

const Dashboard = ({ data, version, dataset, datasetName }) => {
  return data && <>{JSON.stringify(data)} </>
}

Dashboard.propTypes = {
  data: PropTypes.object,
  version: PropTypes.string,
  dataset: PropTypes.array,
  datasetName: PropTypes.string,
}

export default Dashboard
