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

export default function CreateLevel({account}) {

  const [name, setName] = useState(0)
  const [bonus, setBonus] = useState(0)
  const [reward, setReward] = useState(0)
  const [ref, setRef] = useState(0);

  useEffect(()=>{
    

   
  },[])

  const CreateLevel =async()=>{
    axios.post(`${url}/levelcreate`,{
      Name:name,
      Bonus:bonus,
      Reward:reward,
      NoRefReq:ref
    }).then((res)=>{
      console.log(res)
      notify("Successfull level created")
    })
  }

  return (
    <Container maxWidth="lg">
      <AdminNav account={account}/>
      <Box style={{ margin: "0px 0px 50px" }}>
        <Box style={{ margin: "70px 0px 0px" }}>
          <Typography paragraph>Name of the level</Typography>
          <MDBInput label="Ex. Level 1" id="form1" type="Number" onChange={(e)=>setName(e.target.value)}/>
        </Box>
        <Box>
          <Typography paragraph style={{ marginTop: "20px" }}>
            Bonus(%)
          </Typography>
          <MDBInput label="2%" id="form1" type="Number" onChange={(e)=>setBonus(e.target.value)}/>
        </Box>
        <Box>
          <Typography paragraph style={{ marginTop: "20px" }}>
            Reward
          </Typography>
          <MDBInput label="2%%" id="form1" type="Number" onChange={(e)=>setReward(e.target.value)}/>
        </Box>
        <Box>
          {" "}
          <Typography paragraph style={{ marginTop: "20px" }}>
            NO. of referral required to qualify
          </Typography>
          <MDBInput label="10" id="form1" type="Number" onChange={(e)=>setRef(e.target.value)}/>
        </Box>
        <Button className="createbutton" onClick={()=>CreateLevel()}>Create</Button>
      </Box>
      <Toaster/>
    </Container>
  );
}
