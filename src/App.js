import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

export default function App() {
  const [chartData, setChartData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseY = await fetch("https://retoolapi.dev/o5zMs5/data");
        const responseX = await fetch("https://retoolapi.dev/gDa8uC/data");

        if (!responseY.ok || !responseX.ok) {
          throw new Error("Failed to fetch data");
        }

        const dataY = await responseY.json();
        const dataX = await responseX.json();

        const xAxisLabelsData = dataX.slice(0, 50).map(item => item.Label);
        const XAxisData = dataX.slice(0, 50).map(item => parseFloat(item.RandomNumber));

        const yAxisData = dataY.slice(0, 50).map(item => parseFloat(item.RandomNumber));

        const ctx = document.getElementById('myChart');
        const myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: xAxisLabelsData,
            datasets: [{
              label: 'X-axis Data',
              data: XAxisData,
              borderColor: 'green',
              fill: false
            }, {
              label: 'Y-axis Data',
              data: yAxisData,
              borderColor: 'red',
              fill: false
            }]
          },
          options: {
            scales: {
              x: {
                type: 'category'
              }
            }
          }
        });

        setChartData(myChart);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h2>Data in Line Chart</h2>
      <div style={{ height: "400px", width: "800px" }}>
        <canvas id="myChart"></canvas>
      </div>
    </div>
  );
}
