import React, { useEffect, useState } from "react";
import { MDBInput } from "mdb-react-ui-kit";
import { Box, Container } from "@mui/system";
import { Button, Typography } from "@mui/material";
import AdminNav from "../AdminNav";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { assetSymbol } from "../../Web3/Web3";

const url = "https://refer.ap.ngrok.io";
// const url = "http://localhost:3030";

const notify = (msg) => toast.success(msg);



export default function SeeLevel({ account }) {

  const [level, setLevel] = useState([])

  useEffect(()=>{
    const init = async()=>{
      axios.get(`${url}/levels`).then(async(res)=>{
        let item = []
        console.log(res)
        for(let x = 0; x < res.data.length; x++){
          const data = res.data[x];
          const symbol = await assetSymbol(res.data[x].assertName)
          data.symbol = symbol
          item.push(data)
        }
        setLevel(item)
      }).catch((e)=>{
        console.log(e)
      })
    }
    init();
  },[])

  const init = async()=>{
    axios.get(`${url}/levels`).then(async(res)=>{
      let item = []
      console.log(res)
      for(let x = 0; x < res.data.length; x++){
        const data = res.data[x];
        const symbol = await assetSymbol(res.data[x].assertName)
        data.symbol = symbol
        item.push(data)
      }
      setLevel(item)
    }).catch((e)=>{
      console.log(e)
    })
  }
  
  const changestatus = async(id, tab)=>{
    axios.post(`${url}/handlepool`,{
      "id":id,
      "status":!tab
    }).then((res)=>{
      console.log(res);
      init();
      notify("Pool status changed")
    })
  }

  return (
    <>
    <Container maxWidth="lg">
    <AdminNav account={account} />
   {level && level.map((res)=>{
    return  <Container maxWidth="lg">
    
    <Box style={{marginTop:"2rem"}}>
      <Typography variant="span">Duration:</Typography>
      <Typography variant="span">{res.Duration}</Typography>
    </Box>
    <Box>
      <Typography variant="span">APY:</Typography>
      <Typography variant="span">{res.APY}</Typography>
    </Box>
    <Box>
      <Typography variant="span">assert Symbol:</Typography>
      <Typography variant="span">{res.symbol}</Typography>
    </Box>
    <Box>
      <Typography variant="span">payout:</Typography>
      <Typography variant="span">{res.payout}</Typography>
    </Box>
    <Box>
      <Typography variant="span">penalty:</Typography>
      <Typography variant="span">{res.penalty}</Typography>
    </Box>
    <Box>
      <Typography variant="span">Level one MinAmount:</Typography>
      <Typography variant="span">{res.leveloneMinAmount}</Typography>
    </Box>
    <Box>
      <Typography variant="span">Bonus for level one:</Typography>
      <Typography variant="span">{res.bonusforlevelone}</Typography>
    </Box>
    <Box>
      <Typography variant="span">Reward for level two:</Typography>
      <Typography variant="span">{res.rewardforleveltwo}</Typography>
    </Box>
    <Box>
      <Typography variant="span">level two Min Amount:</Typography>
      <Typography variant="span">{res.leveltwoMinAmount}</Typography>
    </Box>
    <Box>
      <Typography variant="span">level three Min Amount:</Typography>
      <Typography variant="span">{res.levelthreeMinAmount}</Typography>
    </Box>
    <Box>
      <Typography variant="span">reward for level one:</Typography>
      <Typography variant="span">{res.rewardforlevelone}</Typography>
    </Box>
    <Box>
      <Typography variant="span">bonus for level two:</Typography>
      <Typography variant="span">{res.bonusforleveltwo}</Typography>
    </Box>
    <Box>
      <Typography variant="span">bonus for level three:</Typography>
      <Typography variant="span">{res.bonusforlevelthree}</Typography>
    </Box>
    <Box>
      <Typography variant="span">reward for level three: </Typography>
      <Typography variant="span">{res.rewardforlevelthree}</Typography>
    </Box>
    <Box>
      <Typography variant="span">pool status: </Typography>
      <Typography variant="span">{(res.poolstatus).toString()}</Typography>
    </Box>
    <Box>
    <Button onClick={()=>changestatus(res._id, res.poolstatus)}>{res.poolstatus ? "Pause" : "Active"}</Button>
    </Box>
    <Toaster />
  </Container> 
   })}
   </Container>
    </>
  );
}
