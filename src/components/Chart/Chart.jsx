import React, { useState, useEffect } from "react";
import styles from "./Chart.module.css";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import Spinner from "../Spinner/Spinner";

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const todaysData = await fetchDailyData();

      setDailyData(todaysData);
    };

    fetchAPI();
  }, []);

  const lineChart = !dailyData.length ? (
    <Spinner />
  ) : (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true
          }
        ]
      }}
    />
  );

  const barChart = !confirmed ? (
    <Spinner />
  ) : (
    <Bar
      data={{
        labels: ["Confirmed", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)"
            ],
            data: [confirmed.value, recovered.value, deaths.value]
          }
        ]
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `The Current State in ${country}` }
      }}
    />
  );

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;
