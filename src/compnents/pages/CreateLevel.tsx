import React from "react";
import { MDBInput } from "mdb-react-ui-kit";
import { Box, Container } from "@mui/system";
import { Typography } from "@mui/material";

export default function CreateLevel() {
  return (
    <Container maxWidth="lg">
      <Box style={{ margin: "0px 0px 50px" }}>
        <Box style={{ margin: "70px 0px 0px" }}>
          <Typography paragraph>Name of the level</Typography>
          <MDBInput label="Ex. Level 1" id="form1" type="text" />
        </Box>
        <Box>
          <Typography paragraph style={{ marginTop: "20px" }}>
            Bonus(%)
          </Typography>
          <MDBInput label="2%" id="form1" type="text" />
        </Box>
        <Box>
          <Typography paragraph style={{ marginTop: "20px" }}>
            APY(%)
          </Typography>
          <MDBInput label="2%%" id="form1" type="text" />
        </Box>
        <Box>
          {" "}
          <Typography paragraph style={{ marginTop: "20px" }}>
            NO. of referral required to quality
          </Typography>
          <MDBInput label="10" id="form1" type="text" />
        </Box>
        <Box>
          <Typography paragraph style={{ marginTop: "20px" }}>
            Minimum tokens to staked
          </Typography>
          <MDBInput label="500" id="form1" type="text" />
        </Box>
        <Box>
          {" "}
          <Typography paragraph style={{ marginTop: "20px" }}>
            Length of staking
          </Typography>
          <MDBInput label="30 Days" id="form1" type="text" />
        </Box>
      </Box>
    </Container>
  );
}
