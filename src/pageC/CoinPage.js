import { styled, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import { SingleCoin } from '../configApi/Api';
import CoinInfo from '../components/CoinInfo';

const CoinPage = () => {
  const { id } = useParams(); // Get the coin id from the URL
  const [coin, setCoin] = useState(null); // Initialize coin state
  const { currency, symbol } = CryptoState(); // Get currency and symbol from context

  const fetchCoin = async () => {
    try {
      console.log(`Fetching coin with id: ${id}`); // Log the id
      const { data } = await axios.get(SingleCoin(id)); // Get the coin data
      setCoin(data); // Set the coin data
      console.log("Coin data:", data); // Log the entire coin data to inspect
    } catch (error) {
      console.error("Error fetching coin data", error); // Catch and log any errors
    }
  };

  useEffect(() => {
    fetchCoin(); // Fetch coin data when id is available
  }, [id]); // Add id as a dependency to refetch when it changes

  // Styling of the page
  const Container = styled('div')(({ theme }) => ({
    display: 'flex', // Use flex to align the sidebar and content side by side
    justifyContent: "space-between", // Ensure there's space between sidebar and content
    padding: 40,
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  }));

  const Sidebar = styled('div')(({ theme }) => ({
    width: '30%', // Sidebar takes 30% of the width
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    borderRight: "2px solid grey",
    // padding: theme.spacing(2), // Optional: Add padding for aesthetics
    [theme.breakpoints.down("md")]: {
      width: "100%", // Sidebar takes full width on smaller screens
      borderRight: "none", // Remove border on smaller screens
    },
  }));

  const ContentArea = styled('div')(({ theme }) => ({
    width: '70%', // Main content takes 70% of the width
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    [theme.breakpoints.down("md")]: {
      width: "100%", // Content takes full width on smaller screens
      marginTop:30,
    },
  }));

  const commonLabelStyle = {
    fontFamily: 'sans-serif',
    fontWeight: 'bold', // Make the label bold
    alignSelf: 'start',
    paddingTop: 5,
  };

  const commonValueStyle = {
    fontFamily: 'sans-serif',
    alignSelf: 'start',
    paddingTop: 5,
    fontWeight: "normal",
    fontSize: "large",
  };

  const formatNumber = (num) => {
    return num !== undefined ? Number(num).toLocaleString() : 'N/A'; // Format the number with commas
  };

  return (
    <Container>
      <Sidebar>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" style={{ fontWeight: 'bold', fontFamily: 'sans-serif' }}>
          {coin?.name}
        </Typography>

        <Typography
          variant="subtitle1"
          style={{
            width: "100%",
            fontFamily: "sans-serif",
            padding: 25,
            paddingBottom: 15,
            paddingTop: 10,
            textAlign: "justify",
          }}
        >
          {coin?.description?.en && parse(coin.description.en.split(' ').slice(0, 50).join(' '))}.
        </Typography>

        <Typography variant="h5" style={commonLabelStyle}>
          Rank: 
          <span style={commonValueStyle}> {coin?.market_cap_rank}</span>
        </Typography>
        <Typography variant="h5" style={commonLabelStyle}>
          Current Price: 
          <span style={commonValueStyle}> {symbol} {formatNumber(coin?.market_data.current_price[currency.toLowerCase()])}</span>
        </Typography>
        <Typography variant="h5" style={commonLabelStyle}>
          Market Cap: 
          <span style={commonValueStyle}> {symbol} {formatNumber(coin?.market_data.market_cap[currency.toLowerCase()])}</span>
        </Typography>
      </Sidebar>

      {/* Main Content Area */}
      <ContentArea>
        {coin && <CoinInfo coin={coin} />} {/* Render the CoinInfo component */}
      </ContentArea>
    </Container>
  );
};

export default CoinPage;
