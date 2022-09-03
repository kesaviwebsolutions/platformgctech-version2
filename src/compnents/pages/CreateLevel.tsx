import React from "react";
import { MDBInput } from "mdb-react-ui-kit";
import { Box, Container } from "@mui/system";
import { Typography } from "@mui/material";

export default function CreateLevel() {
  return (
    <Container maxWidth="lg">
      <Box style={{ margin: "70px 0px" }}>
        <MDBInput label="Ex. Level 1" id="form1" type="text" />
        <Typography></Typography>
        <MDBInput label="2%" id="form1" type="text" />
        <MDBInput label="2%%" id="form1" type="text" />
        <MDBInput label="10" id="form1" type="text" />
        <MDBInput label="500" id="form1" type="text" />
        <MDBInput label="30 Days" id="form1" type="text" />
      </Box>
    </Container>
  );
}
