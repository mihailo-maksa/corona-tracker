import React from "react";
import * as spinner from "../../assets/spinner.gif";
import styles from "./Spinner.module.css";

export default function Spinner() {
  return (
    <div className={styles.container}>
      <img src={spinner} alt='Loading...' className={styles.spinner} />
    </div>
  );
}
