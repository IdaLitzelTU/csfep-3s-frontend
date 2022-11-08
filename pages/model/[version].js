// dynamic routing of model versions
import React from "react";
import { getAllVersions, getModelData } from "../../api/csfep";
import styles from "../../styles/Home.module.css";

export default function model({ modelData }) {
  return (
    <div>
      <main className={styles.main}>
        <p> Model:</p>
        <>{JSON.stringify(modelData.meta)}</>
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

export async function getStaticProps({ params }) {
  const modelData = await getModelData(params.version);
  return {
    props: {
      modelData,
    },
  };
}
