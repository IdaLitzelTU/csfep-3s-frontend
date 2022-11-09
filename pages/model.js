import React from "react";
import styles from "../styles/Home.module.css";
import RunModel from "../components/RunModel";

export default function Model() {
  return (
    <div>
      <main className={styles.main}>
        <RunModel />
      </main>
    </div>
  );
}
