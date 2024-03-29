import React, { useEffect, useState } from "react";
import { MDBInput } from "mdb-react-ui-kit";
import { Box, Container } from "@mui/system";
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import AdminNav from "../AdminNav";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Addpool } from './../../Web3/Web3'
import {Backdrop,
  CircularProgress,
} from "@mui/material";

const url = "https://refer.ap.ngrok.io";
// const url = "http://localhost:3030";

const level3 = "63202016d019bbf56a0f7892";
const level2 = "63201ff3d019bbf56a0f7890";
const level1 = "631e97abfeacda54e1339958";

const notify = (msg) => toast.success(msg);

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function CreateLevel({ account }) {
  const [name, setName] = useState(0);
  const [rewardperblock, setRewardPerBlock] = useState(0)
  const [lptoken, setLPToken] = useState("")
  const [fee, setFee] = useState(0)
  const [duration, setDuration] = useState(0)
  const [payoutPeriod, setPayoutPeriod] = useState(0)
  const [minStakelevel1, setMinStakeLevel1] = useState(0);
  const [minStakelevel2, setMinStakeLevel2] = useState(0);
  const [minStakelevel3, setMinStakeLevel3] = useState(0);
  const [bonuslevel1, setBonuslevel1] = useState(0);
  const [bonuslevel2, setBonuslevel2] = useState(0);
  const [bonuslevel3, setBonuslevel3] = useState(0);
  const [rewardlevel1, setRewardlevel1] = useState(0);
  const [rewardlevel2, setRewardlevel2] = useState(0);
  const [rewardlevel3, setRewardlevel3] = useState(0);
  const [planname, setPlanName] = useState(0);
  const [penalty, setpenalty] = useState(0);
  const [reflev3, setreflev3] = useState()
  const [loading, setLoading] = useState(false);
  const [previous, setPrivious] = React.useState(0);


  const updatelevel = async () => {
    try {
    setLoading(true)
    const data = await Addpool(rewardperblock*10, lptoken, fee*100, penalty*10, (Number(rewardlevel1)+Number(rewardlevel2)), duration, payoutPeriod, minStakelevel3, minStakelevel2, minStakelevel1)
    if(data.status){
     axios.post(`${url}/levelcreate`, {
      planName:planname,
      Duration: duration,
      APY: Number(rewardperblock),
      assertName: lptoken,
      payout:payoutPeriod,
      fee:fee,
      penalty:penalty,
      leveloneMinAmount:minStakelevel1,
      rewardforlevelone:rewardlevel1,
      bonusforlevelone:bonuslevel1,
      rewardforleveltwo:rewardlevel2,
      leveltwoMinAmount:minStakelevel2,
      bonusforleveltwo:bonuslevel2,
      levelthreeMinAmount:minStakelevel3,
      bonusforlevelthree:bonuslevel3,
      rewardforlevelthree:rewardlevel3,
      requiredrefforlevel3:0,
      poolstatus:true
      })
        .then((res) => {
          console.log(res);
          setLoading(false)
          notify("Successfull level updated");
        })
      .catch((e) => {
        setLoading(false)
        console.log(e);
      });
    }
    } catch (error) {
      setLoading(false)
    }
  };
  const handleChange = (event) => {
    setPayoutPeriod(event.target.value);
    console.log(event.target.value)
  };

  return (
    <Container maxWidth="lg">
      <AdminNav account={account} />
      <Box style={{ margin: "0px 0px 50px" }}>
      <Box>
          <Typography paragraph style={{ marginTop: "20px" }}>
            Plan Name
          </Typography>
          <MDBInput
            label="10"
            id="form1"
            type="text"
            onChange={(e) => setPlanName(e.target.value)}
          />
        </Box>
        <Box>
          <Typography paragraph style={{ marginTop: "20px" }}>
            APY(%)
          </Typography>
          <MDBInput
            label="10"
            id="form1"
            type="text"
            onChange={(e) => setRewardPerBlock(e.target.value)}
          />
        </Box>
        <Box>
          <Typography paragraph style={{ marginTop: "20px" }}>
            LP Token
          </Typography>
          <MDBInput
            label="0xD8bd2f81FB990F206268d35fc4DffbcDc003a8B0"
            id="form1"
            onChange={(e) => setLPToken(e.target.value)}
          />
        </Box>
        <Box>
          <Typography paragraph style={{ marginTop: "20px" }}>
            Fee(%)
          </Typography>
          <MDBInput
            label="100"
            id="form1"
            type="text"
            onChange={(e) => setFee(e.target.value)}
          />
        </Box>
        <Box>
          <Typography paragraph style={{ marginTop: "20px" }}>
            Penalty
          </Typography>
          <MDBInput
            label="100"
            id="form1"
            type="text"
            onChange={(e) => setpenalty(e.target.value)}
          />
        </Box>
        <Box>
          <Typography paragraph style={{ marginTop: "20px" }}>
            Duration
          </Typography>
          <MDBInput
            label="30"
            id="form1"
            type="text"
            onChange={(e) => setDuration(e.target.value)}
          />
        </Box>
        <Box>
          <Typography paragraph style={{ marginTop: "20px" }}>
            Payout Period
          </Typography>
          {/* <MDBInput
            label="30"
            id="form1"
            type="text"
            onChange={(e) => setPayoutPeriod(e.target.value)}
          /> */}
           <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">sel..</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={payoutPeriod}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={30}>Monthly</MenuItem>
              <MenuItem value={90}>Quarterly</MenuItem>
              <MenuItem value={180}>Half-Yearly</MenuItem>
              <MenuItem value={360}>Yearly</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <Typography paragraph style={{ marginTop: "20px" }}>
            Minimum stake amount for Level 1
          </Typography>
          <MDBInput
            label="3000"
            id="form1"
            type="text"
            onChange={(e) => setMinStakeLevel1(e.target.value)}
          />
        </Box>
        <Box>
          <Typography paragraph style={{ marginTop: "20px" }}>
          Minimum stake amount for Level 2
          </Typography>
          <MDBInput
            label="2000"
            id="form1"
            type="text"
            onChange={(e) => setMinStakeLevel2(e.target.value)}
          />
        </Box>
        <Box>
          <Typography paragraph style={{ marginTop: "20px" }}>
          Minimum stake amount for Entry Level
          </Typography>
          <MDBInput
            label="1000"
            id="form1"
            type="text"
            onChange={(e) => setMinStakeLevel3(e.target.value)}
          />
        </Box>
        <Box>
          <Typography paragraph style={{ marginTop: "20px" }}>
          Bonus for Level 1(%)
          </Typography>
          <MDBInput
            label="1"
            id="form1"
            type="text"
            onChange={(e) => setBonuslevel1(e.target.value)}
          />
        </Box>
        <Box>
          <Typography paragraph style={{ marginTop: "20px" }}>
          Bonus for Level 2(%)
          </Typography>
          <MDBInput
            label="1"
            id="form1"
            type="text"
            onChange={(e) => setBonuslevel2(e.target.value)}
          />
        </Box>
       
        <Box>
          <Typography paragraph style={{ marginTop: "20px" }}>
          Reward for Level 1(%)
          </Typography>
          <MDBInput
            label="1"
            id="form1"
            type="text"
            onChange={(e) => setRewardlevel1(e.target.value)}
          />
        </Box>
        <Box>
          <Typography paragraph style={{ marginTop: "20px" }}>
          Reward for Level 2(%)
          </Typography>
          <MDBInput
            label="1"
            id="form1"
            type="text"
            onChange={(e) => setRewardlevel2(e.target.value)}
          />
        </Box>
        <Box>
          <Typography paragraph style={{ marginTop: "20px" }}>
          Min L2 referral required for Lvl 1 Bonus:
          </Typography>
          <MDBInput
            label="1"
            id="form1"
            type="text"
            onChange={(e) => setRewardlevel3(e.target.value)}
          />
        </Box>
        <Box>
          <Typography paragraph style={{ marginTop: "20px" }}>
          Min Entry level referral required for Lvl 2 Bonus:
          </Typography>
          <MDBInput
            label="1"
            id="form1"
            type="text"
            onChange={(e) => setBonuslevel3(e.target.value)}
          />
        </Box>
        {/* <Box>
          <Typography paragraph style={{ marginTop: "20px" }}>
          Required Number of refferals for Entry Level
          </Typography>
          <MDBInput
            label="1"
            id="form1"
            type="Number"
            onChange={(e) => setreflev3(e.target.value)}
          />
        </Box> */}
        <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
        <Button className="createbutton" onClick={() => updatelevel()}>
          Post
        </Button>
      </Box>
      <Toaster />
    </Container>
  );
}
