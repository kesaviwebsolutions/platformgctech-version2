import React from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import { Box, Link, Typography } from "@mui/material";
import { MDBIcon } from "mdb-react-ui-kit";

export default function Footer() {
  return (
    <>
      <MDBContainer fluid>
        <Box className="footer-area">
          <Typography
            variant="h6"
            style={{
              border: "1px solid #F144EC",
              width: "200px",
              background: "#F144EC",
              color: "#fff",
              textAlign: "center",
              margin: "20px 0px",
              padding:"7px 10px"
            }}
          >
            <Link
              style={{ textDecoration: "none", color: "#fff" }}
              href="https://www.goldchainex.com/_files/ugd/5b76bc_8ecd39897bb94be5b26037b4b5b58f7c.pdf"
              target="_blank"
            >
              GCS AUDIT
            </Link>
          </Typography>
          <Typography
            variant="h6"
            className="mx-5"
            style={{
              border: "1px solid #00C851",
              width: "200px",
              background: "#00C851",
              color: "#fff",
              textAlign: "center",
              margin: "20px 0px",
              padding:"7px 10px"
            }}
          >
            <Link
              style={{ textDecoration: "none", color: "#fff" }}
              href="https://www.goldchainex.com/_files/ugd/5b76bc_1dee8962f2cd4cb2a83ec64f80f4154d.pdf"
              target="_blank"
            >
              USDM AUDIT
            </Link>
          </Typography>
        </Box>
        <Box>
          <Typography paragraph className="text-center">
            <MDBIcon fas icon="copyright" /> By Platform-Gctech
          </Typography>
          {/* <Typography  paragraph  className="text-center my-2">Designed & Developed BY KWS</Typography> */}
        </Box>
      </MDBContainer>
    </>
  );
}
