import React from "react"
import Head from "next/head"
import styles from "../styles/Home.module.css"
import * as client from "../api/csfep"

function Datasets() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>
      <main className={styles.main}>Datasets</main>
    </div>
  )
}

export default Datasets
