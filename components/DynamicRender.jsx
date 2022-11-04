import React from "react";
import { useQuery } from "react-query";
import * as client from "../pages/api/csfep";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
// import { styled } from "@mui/material/styles";

const DynamicRender = () => {
  const { data } = useQuery(["model-input"], client.fetchModelInput);
  const categories = data
    ? [...new Set(data.input.map((el) => el.category))]
    : [];
  const formData = {
    Forest: [{}],
  };
  categories.forEach((key) => {
    formData[key] = data
      ? data.input.filter((el) => el.category === key)
      : [{}];
  });
  const Number = ({ defaultValue, name }) => {
    console.log(defaultValue);
    return (
      <div>
        <input
          type="number"
          step="0.0001"
          // pattern="[A-Za-z0-9 ]+"
          key={name}
          defaultValue={defaultValue}
          onChange={(e) => console.log(e)}
          required
        />
      </div>
    );
  };
  const Array = ({ defaultValue, name }) => {
    return (
      <div>
        <input
          key={name}
          defaultValue={defaultValue}
          id="arrays"
          placeholder="Enter array inside brackets"
          required
          onChange={handleArrays}
        />
      </div>
    );
  };
  const handleArrays = (e) => {
    const arrayPresent = e.target.value;
    console.log(arrayPresent);
  };

  const renderers = {
    number: <Number />,
    "array[number]": <Array />,
  };

  return (
    <>
      <Grid container>
        {Object.keys(formData).map((key) => {
          return (
            <Grid item key={key}>
              <h3>{key}</h3>
              {formData[key].map((element) => {
                const Renderer = () => {
                  return renderers[element.type];
                };
                return (
                  <Grid item key={element.name}>
                    <Stack flow="columns">
                      <div>
                        <p>{element.display_name}</p>
                        <Tooltip>
                          <>{element.description}</>
                        </Tooltip>
                      </div>
                      <Renderer
                        defaulValue={element.default}
                        name={element.key}
                      />
                    </Stack>
                  </Grid>
                );
              })}
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
export default DynamicRender;
