import axios from 'axios';
import { 
  Container, 
  TableContainer, 
  TextField, 
  ThemeProvider, 
  Table, 
  TableRow, 
  TableCell, 
  Typography, 
  LinearProgress, 
  TableHead, 
  TableBody, 
  Button, 
  Pagination 
} from "@mui/material";
import React, { useEffect, useState } from 'react';
import { CryptoState } from '../CryptoContext';
import { CoinList } from '../configApi/Api';
import { createTheme } from '@mui/material';
import { teal } from '@mui/material/colors';

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage] = useState(10);

  const { currency } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
    } catch (error) {
      console.error("Error fetching coins:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  const handleSearch = () => { 
    return coins.filter(coin => 
      coin.name.toLowerCase().includes(search.toLowerCase()) || 
      coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredCoins = handleSearch();
  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = filteredCoins.slice(indexOfFirstCoin, indexOfLastCoin);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Function to format numbers with commas and currency symbol
  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(number);
  };

  // Function to get the formatted price with currency symbol
  const getFormattedPrice = (price) => {
    if (currency === 'INR') {
      return `₹${formatNumber(price)}`;
    } else {
      return `$${formatNumber(price)}`;
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography variant="h4" style={{ margin: 18, fontFamily: "cursive" }}>
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search for a Cryptocurrency..."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "blue" }}>
                <TableRow>
                  {["Coin", "Symbol", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "cursive",
                      }}
                      key={head}
                      align={head === "Coin" || head === "Symbol" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>


              <TableBody 
                sx={{
                  "& .MuiTableCell-root": {
                    fontFamily:"sans-serif",
                    fontWeight: 300,                  },
                }}
                >
                {currentCoins.map((coin) => (
                  <TableRow key={coin.id}
                    sx={{
                      "&:hover":{
                        backgroundColor:"black",
                        cursor:"pointer",
                      }
                    }}
                  >
                    <TableCell>{coin.name}</TableCell>
                    <TableCell>
                      <img src={coin.image} alt={coin.name} style={{ width: "30px", height: "30px" }} />
                    </TableCell>
                    <TableCell align="right">{getFormattedPrice(coin.current_price)}</TableCell>
                    <TableCell align="right">{coin.price_change_percentage_24h.toFixed(2)}%</TableCell>
                    <TableCell align="right">{getFormattedPrice(coin.market_cap)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>

              
            </Table>
          )}
        </TableContainer>
        {/* Pagination Controls */}
        <Pagination
          count={Math.ceil(filteredCoins.length / coinsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
          style={{ marginTop: 20 }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
