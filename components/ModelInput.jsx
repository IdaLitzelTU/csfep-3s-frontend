import React from "react";
import { useQuery } from "react-query";
import * as client from "../api/csfep";
import PropTypes from "prop-types";

const ModelInput = ({ version }) => {
  const { isLoading, error, data } = useQuery(["model-input", version], () =>
    client.fetchModelInput(version)
  );

  if (isLoading)
    <>
      <div>
        <p>Loading...</p>
      </div>
    </>;

  if (error)
    <>
      <div>
        <p>{JSON.stringify(error)}</p>
      </div>
    </>;

  return data && <div>{JSON.stringify(data)}</div>;
};

ModelInput.propTypes = {
  version: PropTypes.string,
};

export default ModelInput;
