import { styled } from "@mui/material";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CryptoState } from '../CryptoContext';
import { HistoricalChart } from '../configApi/Api';
import { Line } from 'react-chartjs-2'; // Import Line instead of Bar
import { Chart, registerables } from 'chart.js';
import CircularProgress from "@mui/material/CircularProgress"; // Correct import

// Register all required components from Chart.js
Chart.register(...registerables);

const ChartContainer = styled('div')(({ theme }) => ({
  width: "100%", 
  height: "500px", 
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 0,
  padding: 0,
  [theme.breakpoints.down("md")]: {
    width: "100%",
    height: "400px",
    marginTop: 20,
    padding: 0,
    paddingTop: 0,
  },
  [theme.breakpoints.down("xs")]: {
    width: "100%",
    height: "400px",
    marginTop: 20,
    padding: 0,
    paddingTop: 0,
  },
}));

const ButtonGroup = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 50,
});

const Button = styled('button')({
  margin: '0 10px',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  background: 'grey',
  color: 'white',
  '&:hover': {
    background: '#1565c0',
  },
});

const CoinInfo = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [loading, setLoading] = useState(true); // Loading state

  const fetchHistoricalData = async () => {
    try {
      const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
      setHistoricalData(data.prices);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error fetching historical data:", error);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  useEffect(() => {
    setLoading(true); // Set loading true when fetching new data
    fetchHistoricalData();
  }, [currency, days]);

  const chartData = {
    labels: historicalData.map((data) => {
      const date = new Date(data[0]);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }),
    datasets: [
      {
        label: `Price in ${currency}`,
        data: historicalData.map((data) => data[1]),
        borderColor: 'blue', 
        borderWidth: 2,
        fill: true, 
        tension: 0.1, 
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: `Price in ${currency}`,
        },
      },
    },
  };

  return (
    <ChartContainer>
      {loading ? (
        <CircularProgress
          style={{ color: "blue" }}
          size={250}
          thickness={1}
        />
      ) : (
        <Line data={chartData} options={options} />
      )}
      <ButtonGroup>
        <Button onClick={() => setDays(1)}>1 Day</Button>
        <Button onClick={() => setDays(7)}>7 Days</Button>
        <Button onClick={() => setDays(30)}>30 Days</Button>
        <Button onClick={() => setDays(90)}>90 Days</Button>
        <Button onClick={() => setDays(365)}>365 Days</Button>
      </ButtonGroup>
    </ChartContainer>
  );
};

export default CoinInfo;
