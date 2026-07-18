import axios from "axios"

//const endpoint = "https://csfep-3s-framework.herokuapp.com"
const endpoint = "http://127.0.0.1:8000"

export async function fetchModelVersion() {
  const response = await axios.get(`${endpoint}/model`)

  return response.data
}

export async function fetchModelInput(version) {
  const response = await axios.get(`${endpoint}/model/${version}`)
  return response.data.results
}

export async function runModel(version, body) {
  const options = {
    headers: { "content-type": "application/json" },
  }
  //console.log("FULL BODY:", JSON.stringify(body, null, 2))
  const response = await axios.post(
    `${endpoint}/run/${version}?body=${JSON.stringify(body)}`,
    options
  )

  return response.data.results
}

export async function fetchModelOutput(version, dataset) {
  const response = await axios.get(
    `${endpoint}/result?version=${version}&dataset=${dataset}`
  )
  return response.data.results
}

export async function fetchDatasets() {
  // fetch all existing datasets
  const response = await axios.get(`${endpoint}/catalog`)
  return response.data
}

export async function fetchSelectedData(id) {
  // fetch selected model input data
  const response = await axios.get(`${endpoint}/dataset/${id}`)
  return response.data.data
}

export async function postNewDataset(body) {
  // save new dataset to the db
  const response = await axios.post(`${endpoint}/dataset`, body)
  return response.data
}

export async function getAllVersions() {
  // Return a list of possible value for versions
  const data = await fetchModelVersion()

  return data.map((v) => ({ params: { version: v } }))
}

export async function getModelOutput(version, body) {
  // Fetch necessary data for the model version
  const data = await runModel(version, body)
  const input = await fetchModelInput(version)
  data.meta = input.meta

  // Combine the data with the version
  return {
    version,
    ...data,
  }
}
