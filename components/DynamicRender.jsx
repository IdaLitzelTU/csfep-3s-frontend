import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import * as client from "../pages/api/csfep";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
// import { styled } from "@mui/material/styles";

const Number = ({ key, default: defaultValue }) => {
  // console.log(defaultValue);
  return (
    <div>
      <input
        type="number"
        step="0.0001"
        // pattern="[A-Za-z0-9 ]+"
        key={key}
        defaultValue={defaultValue}
        onChange={(e) => console.log(e)}
        required
      />
    </div>
  );
};

const Array = ({ key, default: defaultValue }) => {
  const handleArrays = (e) => {
    const arrayPresent = e.target.value;
  };

  return (
    <div>
      <input
        key={key}
        defaultValue={defaultValue}
        placeholder="Enter array, E.g., [3, 4.7]"
        required
        onChange={handleArrays}
      />
    </div>
  );
};

const renderers = {
  number: Number,
  "array[number]": Array,
};

const DynamicRender = () => {
  const { data } = useQuery(["model-input"], client.fetchModelInput);

  const [formData, setFormData] = useState(undefined);

  useEffect(() => {
    if (data) {
      const categories = data
        ? [...new Set(data.input.map((el) => el.category))]
        : [];

      const tempFormData = {};

      categories.forEach((key) => {
        tempFormData[key] = data
          ? data.input.filter((el) => el.category === key)
          : [{}];
      });

      setFormData(tempFormData);
    }
  }, [data]);

  return (
    <>
      {formData && (
        <Grid container>
          {Object.keys(formData).map((key) => {
            return (
              <Grid item key={key}>
                <h3>{key}</h3>
                {formData[key].map((element) => {
                  const Renderer = renderers[element.type];
                  return (
                    <Grid item key={element.name}>
                      <Stack
                        direction="row"
                        spacing={1}
                        divider={<Divider orientation="vertical" flexItem />}
                      >
                        <item>{element.display_name}</item>
                        <Renderer {...element} />
                        <item>{element.description}</item>
                        {/* <div>
                          <p></p>
                          <Tooltip>
                            <></>
                          </Tooltip>
                        </div> */}
                        
                      </Stack>
                    </Grid>
                  );
                })}
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
};
export default DynamicRender;
