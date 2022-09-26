import React, { useEffect, useState } from "react";
import { MDBInput } from "mdb-react-ui-kit";
import { Box, Container } from "@mui/system";
import { Button, Typography } from "@mui/material";
import AdminNav from "../AdminNav";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Addpool } from './../../Web3/Web3'
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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


  const updatelevel = async () => {
    const data = await Addpool(rewardperblock, lptoken, fee, penalty, duration, payoutPeriod, minStakelevel1, minStakelevel2, minStakelevel3)
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
          notify("Successfull level updated");
        })
      .catch((e) => {
        console.log(e);
      });
    }
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
            type="Number"
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
            type="Number"
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
            type="Number"
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
            type="Number"
            onChange={(e) => setDuration(e.target.value)}
          />
        </Box>
        <Box>
          <Typography paragraph style={{ marginTop: "20px" }}>
            Payout Period
          </Typography>
          <MDBInput
            label="30"
            id="form1"
            type="Number"
            onChange={(e) => setPayoutPeriod(e.target.value)}
          />
        </Box>
        <Box>
          <Typography paragraph style={{ marginTop: "20px" }}>
            Minimum stake amount for Level 1
          </Typography>
          <MDBInput
            label="3000"
            id="form1"
            type="Number"
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
            type="Number"
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
            type="Number"
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
            type="Number"
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
            type="Number"
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
            type="Number"
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
            type="Number"
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
            type="Number"
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
            type="Number"
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
        <Button className="createbutton" onClick={() => updatelevel()}>
          Post
        </Button>
      </Box>
      <Toaster />
    </Container>
  );
}
