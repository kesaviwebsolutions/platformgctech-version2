import React, { useEffect, useState } from "react";
import { MDBInput } from "mdb-react-ui-kit";
import { Box, Container } from "@mui/system";
import { Button, Typography } from "@mui/material";
import AdminNav from "../AdminNav";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const url = "https://refer.ap.ngrok.io";
// const url = "http://localhost:3030";

const notify = (msg) => toast.success(msg);

export default function SeeLevel({ account }) {
  return (
    <Container maxWidth="lg">
      <AdminNav account={account} />
      <Box style={{marginTop:"2rem"}}>
        <Typography variant="span">Duration:</Typography>
        <Typography variant="span">30</Typography>
      </Box>
      <Box>
        <Typography variant="span">APY:</Typography>
        <Typography variant="span">10</Typography>
      </Box>
      <Box>
        <Typography variant="span">assert Name:</Typography>
        <Typography variant="span">"0x00000000000000000000"</Typography>
      </Box>
      <Box>
        <Typography variant="span">payout:</Typography>
        <Typography variant="span">30</Typography>
      </Box>
      <Box>
        <Typography variant="span">penalty:</Typography>
        <Typography variant="span">100</Typography>
      </Box>
      <Box>
        <Typography variant="span">level one MinAmount:</Typography>
        <Typography variant="span">30000</Typography>
      </Box>
      <Box>
        <Typography variant="span">bonus for level one:</Typography>
        <Typography variant="span">3000</Typography>
      </Box>
      <Box>
        <Typography variant="span">reward for level two:</Typography>
        <Typography variant="span">2</Typography>
      </Box>
      <Box>
        <Typography variant="span">level two Min Amount:</Typography>
        <Typography variant="span">2000</Typography>
      </Box>
      <Box>
        <Typography variant="span">level three Min Amount:</Typography>
        <Typography variant="span">2</Typography>
      </Box>
      <Box>
        <Typography variant="span">reward for level one:</Typography>
        <Typography variant="span">2</Typography>
      </Box>
      <Box>
        <Typography variant="span">bonus for level two:</Typography>
        <Typography variant="span">2</Typography>
      </Box>
      <Box>
        <Typography variant="span">bonus for level three:</Typography>
        <Typography variant="span">2</Typography>
      </Box>
      <Box>
        <Typography variant="span">reward for level three:</Typography>
        <Typography variant="span">2</Typography>
      </Box>
      <Box>
        <Typography variant="span">pool status:</Typography>
        <Typography variant="span">true</Typography>
      </Box>
      <Box>
      <Button>Button</Button>
      </Box>
      <Toaster />
    </Container>
  );
}
