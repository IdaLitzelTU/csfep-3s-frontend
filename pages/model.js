import React from "react";
import styles from "../styles/Home.module.css";
import { useQuery } from "react-query";
import * as client from "../pages/api/csfep";
import Link from "next/link";

export default function Model() {
  const { data } = useQuery(["model-versions"], client.fetchModelVersion);

  data && console.log(data);

  return (
    <div>
      <main className={styles.main}>
        <p> Model:</p>
        {data &&
          data.map((version) => {
            return (
              <li key={version}>
                <Link href={`/model/${version}`}>{version}</Link>
              </li>
            );
          })}
      </main>
    </div>
  );
}
