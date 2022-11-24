import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import FormRender from "./FormRender"
import { useQuery } from "react-query"
import * as client from "../api/csfep"

const body = {
  a_harvest: 0.74,
  biomass_left: 0.1,
  acc_rate: [3.3, 5, 6.7],
  wood_used: 0.5,
  material_used: 1,
  dmnf1: 0,
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
}

const ModelRender = ({ version }) => {
  const { data } = useQuery(["model-input", version], () =>
    client.fetchModelInput(version)
  )
  const [formData, setFormData] = useState(undefined)

  // const { data: datasets } = useQuery()

  useEffect(() => {
    if (data) {
      console.log(data)
      const categories = data
        ? [...new Set(data.input.map((el) => el.category))]
        : []

      const tempFormData = {}

      categories.forEach((key) => {
        tempFormData[key] = data
          ? data.input.filter((el) => el.category === key)
          : [{}]
      })

      setFormData(tempFormData)
    }
  }, [data])

  return (
    <>
      <FormRender formData={formData} defaultData={body} />
    </>
  )
}

ModelRender.propTypes = {
  version: PropTypes.string,
}

export default ModelRender
