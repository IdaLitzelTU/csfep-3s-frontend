import React, { useState } from "react";
import { useQuery } from "react-query";
import ModelSelection from "./ModelSelection";
import * as client from "../api/csfep";

const RunModel = () => {
  const [version, setVersion] = useState("v1");
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

  return (
    <>
      <div
        // style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <h6>Available Model Versions: {"  "} </h6>
        <ModelSelection />
      </div>
    </>
  );
};

export default RunModel;
