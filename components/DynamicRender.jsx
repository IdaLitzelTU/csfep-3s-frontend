import React from "react";
import { useQuery } from "react-query";
import * as client from "../pages/api/csfep";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

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
    return (
      <div>
        <input
          key={name}
          default={defaultValue}
          onChange={(e) => console.log(e)}
          required
        />
      </div>
    );
  };
  const Array = ({ defaultValue, name }) => {
    return (
      <div>
        <input key={name} default={defaultValue} required />
      </div>
    );
  };
  const renderers = {
    number: <Number />,
    "array[number]": <Array />,
  };
  console.log(formData);
  return (
    <>
      <Grid container>
        {Object.keys(formData).map((key) => {
          return (
            <Grid item key={key}>
              <h3>{key}</h3>
              {formData[key].map((element) => {
                return (
                  <Grid item key={element.name}>
                    <Stack flow="columns">
                      <div>
                        <p>{element.display_name}</p>
                        <Tooltip>
                          <>{element.description}</>
                        </Tooltip>
                      </div>
                      {element.type === "number" ? (
                        <Number
                          defaultValue={element.default}
                          name={element.name}
                        />
                      ) : (
                        <Array
                          defaultValue={element.default}
                          name={element.name}
                        />
                      )}
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
