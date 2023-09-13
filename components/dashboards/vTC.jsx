import React from "react"
import PropTypes from "prop-types"


const Dashboard = ({ data, version, dataset, dataset_name }) => {

  return (
    data && <>{JSON.stringify(data)} </>
  )
}



Dashboard.propTypes = {
  data: PropTypes.object,
  version: PropTypes.string,
  dataset: PropTypes.array,
  dataset_name: PropTypes.string
}

export default Dashboard
