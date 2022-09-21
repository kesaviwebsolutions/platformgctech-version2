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

export default function Pool({account}) {

 





  return (
    <Container maxWidth="lg">
      <AdminNav account={account}/>
     
      <Toaster/>
    </Container>
  );
}
