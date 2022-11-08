import axios from "axios";

const endpoint = "https://csfep-3s-framework.herokuapp.com";

export async function fetchModelVersion() {
  const response = await axios.get(`${endpoint}/model`);

  return response.data.results;
}

export async function fetchModelInput(version) {
  const response = await axios.get(`${endpoint}/model/${version}`);
  return response.data.results;
}

export async function getAllVersions() {
  // Return a list of possible value for versions
  const data = await fetchModelVersion();

  return data.map((v) => ({ params: { version: v } }));
}

export async function getModelData(version) {
  // Fetch necessary data for the model version
  const data = await fetchModelInput(version);

  // Combine the data with the version
  return {
    version,
    ...data,
  };
}
