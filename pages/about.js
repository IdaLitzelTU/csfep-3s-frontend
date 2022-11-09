import React from "react";
import Head from "next/head"
import styles from "../styles/Home.module.css";

const About = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>
      <main className={styles.main}>
        About
      </main>
    </div>
  )
};

export default About;
