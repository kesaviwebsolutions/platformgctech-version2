import React, { useEffect, useState } from "react";
import { MDBInput } from "mdb-react-ui-kit";
import { Box, Container } from "@mui/system";
import { Button, Typography } from "@mui/material";
import AdminNav from "../AdminNav";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

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
  const [bonus, setBonus] = useState(0);
  const [reward, setReward] = useState(0);
  const [ref, setRef] = useState(0);
  const [levelid, setLevelId] = useState("");

  useEffect(() => {}, []);

  const CreateLevel = async () => {
    axios
      .post(`${url}/levelcreate`, {
        Name: name,
        Bonus: bonus,
        Reward: reward,
        NoRefReq: ref,
      })
      .then((res) => {
        console.log(res);
        notify("Successfull level created");
      });
  };
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
    if(event.target.value == "Level 1")
    {
      setLevelId(level1)
    }
    else if(event.target.value == "Level 2"){
      setLevelId(level2)
    }
    else{
      setLevelId(level3)
    }
    console.log(event.target.value)
  };

  const updatelevel = async () => {
    axios
      .put(`${url}/Updatelevel/${levelid}`, {
        Bonus: bonus,
        Reward: reward,
        NoRefReq: ref,
      })
      .then((res) => {
        console.log(res);
        notify("Successfull level updated");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container maxWidth="lg">
      <AdminNav account={account} />
      <Box style={{ margin: "0px 0px 50px" }}>
        <Box style={{ margin: "70px 0px 0px" }}>
          <Typography paragraph>Select level</Typography>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Level</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={"Level 1"}>Level 1</MenuItem>
              <MenuItem value={"Level 2"}>Level 2</MenuItem>
              <MenuItem value={"Entry Level"}>Entry Level</MenuItem>
            </Select>
          </FormControl>
          {/* <MDBInput label="Ex. Level 1" id="form1" type="Number" onChange={(e)=>setName(e.target.value)}/> */}
        </Box>
        <Box>
          <Typography paragraph style={{ marginTop: "20px" }}>
            Bonus(%)
          </Typography>
          <MDBInput
            label="2%"
            id="form1"
            type="Number"
            onChange={(e) => setBonus(e.target.value)}
          />
        </Box>
        <Box>
          <Typography paragraph style={{ marginTop: "20px" }}>
            Reward
          </Typography>
          <MDBInput
            label="2%"
            id="form1"
            type="Number"
            onChange={(e) => setReward(e.target.value)}
          />
        </Box>
        <Box>
          {" "}
          <Typography paragraph style={{ marginTop: "20px" }}>
            Require Amount
          </Typography>
          <MDBInput
            label="10"
            id="form1"
            type="Number"
            onChange={(e) => setRef(e.target.value)}
          />
        </Box>
        <Button className="createbutton" onClick={() => updatelevel()}>
          Post
        </Button>
      </Box>
      <Toaster />
    </Container>
  );
}
