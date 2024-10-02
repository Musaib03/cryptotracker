import {
	AppBar,
	Container,
	MenuItem,
	Select,
	Toolbar,
	Typography,
  } from "@mui/material";
  import { createTheme, ThemeProvider } from "@mui/material/styles";
  import { useNavigate } from "react-router-dom"; // Updated import
  import { CryptoState } from "../CryptoContext"; // Ensure this context is correctly implemented
  import { styled } from "@mui/material/styles";
  
  const Title = styled(Typography)(({ theme }) => ({
	flex: 1,
	color: "Blue",
	fontFamily: "Lucida Handwriting",
	fontWeight: "bold",
    fontSize: "30px", 
	cursor: "pointer",
  }));
  
  const darkTheme = createTheme({
	palette: {
	  primary: {
		main: "#fff",
	  },
	  mode: "dark", // Use "mode" instead of "type" in MUI v5
	},
  });
  
  function Header() {
	const { currency, setCurrency } = CryptoState();
	const navigate = useNavigate(); // Updated to useNavigate
  
	return (
	  <ThemeProvider theme={darkTheme}>
		<AppBar color="transparent" position="static">
		  <Container>
			<Toolbar>
			  <Title onClick={() => navigate(`/`)}>
				Crypto Tracker
			  </Title>
			  <Select
				variant="outlined"
				labelId="currency-select-label"
				id="currency-select"
				value={currency}
				style={{ width: 100, height: 40, marginLeft: 15 }}
				onChange={(e) => setCurrency(e.target.value)}
			  >
				<MenuItem value={"USD"}>USD</MenuItem>
				<MenuItem value={"INR"}>INR</MenuItem>
			  </Select>
			</Toolbar>
		  </Container>
		</AppBar>
	  </ThemeProvider>
	);
  }
  
  export default Header;
  