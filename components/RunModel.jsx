import React, { useState } from "react";
import { useQuery } from "react-query";
import ModelSelection from "./ModelSelection";
import * as client from "../api/csfep";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useRouter } from "next/router";

const RunModel = () => {
  const router = useRouter();
  const [version, setVersion] = useState("v1");

  const body = {
    a_harvest: 0.74,
    biomass_left: 0.1,
    acc_rate: [3.3, 5, 6.7],
    wood_used: 0.5,
    material_used: 1,
    dmnf1: 0,
    dmnf2: 0,
    dmnf3: 0,
    dmnf4: 200,
    floor_area: 18,
    xl: 20,
    mass_ar_lm: 0.108,
    mass_ar_vn: 0,
    mass_ar_st_it: 0.00043,
    mass_ar_con_t: 0.02347,
    mass_ar_brick: 0.661,
    mass_ar_con: 0.451,
    mass_ar_mt_ps_co: 0.209,
    mass_ar_mt_ps_rs: 0.194,
    mass_ar_mt_en_co: 0.06,
    mass_ar_mt_en_rs: 0.028,
    mass_ar_wfb_en_co: 0.021,
    mass_ar_wfb_en_rs: 0.01,
    mass_ar_con_ps_co: 0.608,
    mass_ar_stl_ps_co: 0.083,
    mass_ar_stl_en_co: 0.01,
    mass_ar_fbg_en_co: 0.002,
    mass_ar_gyp_en_co: 0.013,
    mass_ar_xps_en_co: 0.002,
  };

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

  const redirect = (e) => {
    e.preventDefault();
    router.push({ pathname: `/model/${version}`, query: { body: body, meta: data.meta } });
  };

  return (
    <>
      <div
      // style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <h6>Available Model Versions: {"  "} </h6>
        <ModelSelection />
        <div style={{ marginTop: "20px" }}>
          Dynamic render
          <br></br>
          <TextField
            sx={{ width: "600px", height: "300px" }}
            value={JSON.stringify(body)}
          />
        </div>
        <div style={{display:"flex", justifyContent:"space-between"}}>
        <Button
          variant="contained"
          href={`/model/${version}`}
          sx={{
            // my: 2,
            color: "white",
            backgroundColor:"#005B36",
            textTransform: "none",
          }}
        >
          Run Model
        </Button>
        <span style={{ display: "inline-flex", justifyContent:"space-between"}}>
          <h6>Run notes: {" "}</h6>
          <TextField
            required
            id="outlined-required"
            label="Required"
            placeholder="Notes"
          />
        </span>
        </div>
      </div>
    </>
  );
};

export default RunModel;
