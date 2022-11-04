import * as client from "../pages/api/csfep";

export async function getAllVersions() {
  // Return a list of possible value for versions
  const data = await client.fetchModelVersion();

  const versionsList = [];
  console.log(data);
  data &&
    data.map((v) => {
      versionsList.push({ params: { version: v } });
    });

  return versionsList;
}

export async function getModelData(version) {
  // Fetch necessary data for the model version
  const data = await client.fetchModelInput(version);
  
  // Combine the data with the version
  return {
    version,
    ...data,
  };
}
