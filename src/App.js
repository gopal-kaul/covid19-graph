import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import loadingGIF from './loading.gif';

function App() {
  const [cases, setCases] = useState();
  const [loading, setLoading]= useState(true);
  const getData = () => {
    axios
      .get("https://data.covid19india.org/data.json")
      .then((res) => res.data)
      .then((res) => {
        setCases(res["cases_time_series"]);
        setLoading(false);
      })
      .catch((e) => console.log(`Error : ${e}`));
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="App">
      {loading ?<> <h1>Loading...</h1><img src={loadingGIF} alt="Loading Spinner GIF" /> </> : <></> }
      {cases && (
        <Plot
          data={[
            {
              y: cases.map((x) => x["dailyconfirmed"]),
              x: cases.map((x) => x["dateymd"]),
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "blue" },
            },
          ]}
          layout={{
            title: { text: "COVID Cases In India" },
            xaxis: { title: "Date" },
            yaxis: { title: "New Cases" },
            autosize: true,
            automargin: true,
          }}
          style={{ width: "100%", height: "100%" }}
          config={{ responsive: true }}
        />
      )}
    </div>
  );
}

export default App;
