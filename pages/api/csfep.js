import axios from "axios";

const endpoint = "https://csfep-3s-framework.herokuapp.com";

export async function fetchModelVersion() {
  const response = await axios.get(`${endpoint}/model`);

  return response.data.results;
}

export async function fetchModelInput(version) {
  // const version = "v1"
  const response = await axios.get(`${endpoint}/model/${version}`);
  return response.data.results;
}
