import axios from "axios";
import FormData from "form-data"

const endpoint = "http://127.0.0.1:8000";

export async function fetchModelVersion() {
  const response = await axios.get(`${endpoint}/model`);

  return response.data.results;
}

export async function fetchModelInput(version) {
  const response = await axios.get(`${endpoint}/model/${version}`);
  return response.data.results;
}

export async function fetchModelOutPut(version, body) {
  // fetch model output for a specified version and dataset
  // const data = new FormData();
  // data.append("body", body);
  // data.append("version", version);

  const response = await axios.post(`${endpoint}/model/${version}`, {
    // data,
    body:body,
    version:version
  });
  return response.data.results;
}

export async function getAllVersions() {
  // Return a list of possible value for versions
  const data = await fetchModelVersion();

  return data.map((v) => ({ params: { version: v } }));
}

export async function getModelOutput(version, body) {
  // Fetch necessary data for the model version
  const data = await fetchModelOutPut(version, body);
  const input = await fetchModelInput(version)
  data.meta = input.meta;

  // Combine the data with the version
  return {
    version,
    ...data,
  };
}


