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
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];
// const url = "https://refer.ap.ngrok.io";
const url = "http://localhost:3030";

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
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Container maxWidth="lg">
      <AdminNav account={account} />
      <Box style={{ margin: "0px 0px 50px" }}>
        <Box style={{ margin: "70px 0px 0px" }}>
          <Typography paragraph>Select level</Typography>
          <FormControl sx={{ m: 1, width: "100%" }}>
            <InputLabel id="demo-multiple-name-label">Level</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, personName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
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
            label="2%%"
            id="form1"
            type="Number"
            onChange={(e) => setReward(e.target.value)}
          />
        </Box>
        <Box>
          {" "}
          <Typography paragraph style={{ marginTop: "20px" }}>
            NO. of referral required to qualify
          </Typography>
          <MDBInput
            label="10"
            id="form1"
            type="Number"
            onChange={(e) => setRef(e.target.value)}
          />
        </Box>
        <Button className="createbutton" onClick={() => CreateLevel()}>
          Create
        </Button>
      </Box>
      <Toaster />
    </Container>
  );
}
