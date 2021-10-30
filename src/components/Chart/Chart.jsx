import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Charts = ({ data, country }) => {
  const [daliyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    // console.log(daliyData);
    fetchAPI();
  }, []);

  const lineChart =
    daliyData.length != 0 ? (
      <Line
        data={{
          labels: daliyData.map(({ date }) => date),
          datasets: [
            {
              data: daliyData.map(({ confirmed }) => confirmed),
              label: "Infected",
              borderColor: "#3333ff",
              fill: true,
            },
            {
              data: daliyData.map(({ deaths }) => deaths),
              label: "Deaths",
              borderColor: "red",
              backgroundColor: "rgba(255, 0, 0, 0.5)",
              fill: true,
            },
          ],
        }}
      />
    ) : null;

  const barChar = data.confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 225, 0.5)",
              "rgba(0, 225, 0, 0.5)",
              "rgba(225, 0, 0, 0.5)",
            ],
            data: [
              data.confirmed.value,
              data.recovered.value,
              data.deaths.value,
            ],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: "Current state in" + country },
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>{country ? barChar : lineChart}</div>
  );
};

export default Charts;
