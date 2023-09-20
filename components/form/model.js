import { getFieldValue } from "./FieldRender"

export function getData(model, version, parentId) {
  const names = model ? [...new Set(model.input)] : []
  let inputData = []

  names.forEach((input) => {
    inputData.push(getFieldValue(input))
  })
  const datasetMeta = [
    "dataset_name",
    "publisher_name",
    "organisation_name",
    "description",
  ]
  const newDataset = {}
  const parentElement = document.getElementById(parentId)
  datasetMeta.forEach((dm) => {
    newDataset[dm] = parentElement.querySelector(`#${dm}`).value
  })
  newDataset["version"] = version
  newDataset["data"] = inputData
  return newDataset
}

export function isEmpty(data) {
  const empty = (key) => key.value === ""
  return data.some(empty)
}
