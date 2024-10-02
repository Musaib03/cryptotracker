import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pageC/Home"; 
import './App.css';
import Header from "./components/Header"; 
import CoinPage from "./pageC/CoinPage"; 
import { styled } from '@mui/material/styles';

const AppContainer = styled('div')({
  backgroundColor: "#14161a",
  color: "white",
  minHeight: "100vh",
});

function App() { 
  return (
    <BrowserRouter>
      <AppContainer>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/coins/:id" element={<CoinPage />} exact />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
