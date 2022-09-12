import React, { useEffect, useState } from "react";
import { MDBInput } from "mdb-react-ui-kit";
import { Box, Container } from "@mui/system";
import { Button, Typography } from "@mui/material";
import AdminNav from "../AdminNav";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Addpool } from "../../Web3/Web3";

const url = "https://refer.ap.ngrok.io";
// const url = "http://localhost:3030";

const notify = (msg) => toast.success(msg);

export default function Pool() {

  const [duration, setDuration] = useState(0)
  const [returns, setReturns] = useState(0)




  const CreateLevel =async()=>{
    const data = await Addpool(duration, returns)
    if(data.status){
        notify("Pool Created Successfully")
    }
  }


  return (
    <Container maxWidth="lg">
      <AdminNav />
      <Box style={{ margin: "0px 0px 50px" }}>
        <Box style={{ margin: "70px 0px 0px" }}>
          <Typography paragraph>Duration</Typography>
          <MDBInput label="Ex. Level 1" id="form1" type="Number" onChange={(e)=>setDuration(e.target.value)}/>
        </Box>
        <Box>
          <Typography paragraph style={{ marginTop: "20px" }}>
            Return
          </Typography>
          <MDBInput label="2%" id="form1" type="Number" onChange={(e)=>setReturns(e.target.value)}/>
        </Box>
        <Button className="createbutton" onClick={()=>CreateLevel()}>Create</Button>
      </Box>
      <Toaster/>
    </Container>
  );
}
