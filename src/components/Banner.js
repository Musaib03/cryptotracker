import { Container, styled, Typography } from "@mui/material";
import React from 'react';
import Carousel  from "./Carousel";

// Styling the outer banner wrapper div
const BannerWrapper = styled('div')({
  backgroundImage: "url(./Banner.jpg)",
  backgroundSize: "cover",          // Ensures the image is fully visible
  backgroundPosition: "center",     // Centers the image
  height: "60vh",                   // 60% of the viewport height
  width: "100%",                    // Full width of the page
});

// Styling the banner content container
const BannerContent = styled(Container)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

// Styling the tagline container
const Tagline = styled('div')({
  display: "flex",
  height: "40%",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
});

const Banner = () => {
  return (
    <BannerWrapper>
      <BannerContent>
        <Tagline>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Lucida Handwriting",
            }}
          >
            Crypto Tracker
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Dwell into the real-time exploration of cryptocurrency
          </Typography>
        </Tagline>

        <Carousel />
        
      </BannerContent>
    </BannerWrapper>
  );
};

export default Banner;
