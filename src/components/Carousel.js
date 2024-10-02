import { styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import { CryptoState } from "../CryptoContext";
import { TrendingCoins } from "../configApi/Api"; // Ensure the correct path to TrendingCoins

// Styled wrapper for the carousel
const CarouselWrapper = styled('div')({
  height: "50%",
  display: "flex",
  alignItems: "center",
  flexWrap:  "wrap",
  overflow: "None",
  justifyContent: "center",
  gap:"20px",
  padding: "20px",
  // overflowX: "auto",  // Enable horizontal scrolling
  // scrollbarWidth: "none", // Hide scrollbar for different browsers
  // "&::-webkit-scrollbar": {
  //   display: "none", // Hide scrollbar in WebKit browsers
  // },
});

// Styled for each coin item
const CoinItem = styled('div')({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width:"120px", //for fixed width of all
  margin: "0 10px",  // Spacing between coins
  padding: "10px",
  borderRadius: "8px",
  backgroundColor: "#f7f7f7",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.1)", // Scale up on hover for effect
  },
  "@media (max-width: 768px)": {
    width: "90px", // Adjust width for tablets
  },
  "@media (max-width: 480px)": {
    width: "70px", // Adjust width for mobile devices
  },
});

const CoinImage = styled('img')({
  width: "50px",
  height: "50px",
  marginBottom: "10px",
});

const CoinName = styled('span')({
  fontSize: "16px",
  fontWeight: "bold",
  marginBottom: "5px",
});

const CoinPrice = styled('span')({
  fontSize: "14px",
  color: "#333",
});

const Carousel = () => {
  const [trending, setTrending] = useState([]); // State to hold trending coins
  const { currency } = CryptoState(); // Extract currency from CryptoState

  // Function to fetch trending coins
  const fetchTrendingCoins = async () => {
    try {
      const { data } = await axios.get(TrendingCoins(currency)); // Fetch data
      setTrending(data); // Update state
    } catch (error) {
      console.error("Error fetching trending coins:", error);
    }
  };

  // Fetch trending coins when the currency changes
  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  return (
    <CarouselWrapper>
      {/* Render the trending coins or placeholder */}
      {trending.length > 0 ? (
        trending.map((coin) => (
          <CoinItem key={coin.id}>
            <CoinImage src={coin.image} alt={coin.name} /> {/* Display coin image */}
            <CoinName>{coin.name}</CoinName> {/* Display coin name */}
              <CoinPrice>{currency === "USD" ? "$" : "Rs. "}{coin.current_price.toFixed(2)}</CoinPrice> {/* Display coin price */}
          </CoinItem>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </CarouselWrapper>
  );
};

export default Carousel;
