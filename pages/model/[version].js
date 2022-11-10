// dynamic routing of model versions output
import React from "react";
import { getAllVersions, getModelOutput } from "../../api/csfep";
import styles from "../../styles/Home.module.css";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

export default function model({ modelOutput }) {
  return (
    <div>
      <main className={styles.main}>
      <h3> Model Output:</h3>
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
          <List>
            {Object.entries(modelOutput.meta).map(([key, value]) => {
              return (
                <ListItem disablePadding key={key}>
                  <span style={{display:"inline"}}>
                  <strong>{key}{": "}</strong>
                  <ListItemText primary={value} />
                  </span>
                </ListItem>
              );
            })}
          </List>
          <Divider />
        </Box>
        <>{JSON.stringify(modelOutput)}</>
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = await getAllVersions();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params, body }) {
  const modelOutput = await getModelOutput(params.version, body);
  return {
    props: {
      modelOutput,
    },
  };
}
