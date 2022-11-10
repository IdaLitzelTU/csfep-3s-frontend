import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import * as client from "../pages/api/csfep";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import { styled } from "@mui/material/styles";

const Number = ({ key, default: defaultValue }) => {
  return (
    <div>
      <input
        type="number"
        step="0.0001"
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
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="stretch"
        >
          {Object.keys(formData).map((key) => {
            return (
              <Grid item key={key}>
                <Typography
                  variant="h5"
                  style={{ color: "#005B36" }}
                  gutterBottom
                >
                  {key}
                </Typography>
                <Paper variant="outlined" sx={{ m: 1 }}>
                  {formData[key].map((element) => {
                    const Renderer = renderers[element.type];
                    return (
                      <Grid item key={element.name}>
                        <Stack direction="row" spacing={2}>
                          <item>{element.display_name}</item>
                          <Renderer {...element} />
                        </Stack>
                        <Stack direction="row" spacing={2}>
                          <Typography
                            sx={{ fontStyle: "italic", fontSize: 12 }}
                          >
                            {element.description}
                          </Typography>
                        </Stack>
                      </Grid>
                    );
                  })}
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
};
export default DynamicRender;
