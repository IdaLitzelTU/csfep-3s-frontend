import React from "react"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import ModelInput from "../components/ModelInput"
import DynamicRender from "../components/FormRender"
import Navbar from "../components/Navbar"

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <h4
          style={{
            textAlign: "center",
            verticalAlign: "middle",
            lineHeight: "50",
          }}
        >
          Home page
        </h4>
      </div>
    </main>
  )
}
