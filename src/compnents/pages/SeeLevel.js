import React, { useEffect, useState } from "react";
import { MDBInput } from "mdb-react-ui-kit";
import { Box, Container } from "@mui/system";
import { Button, Typography, Grid } from "@mui/material";
import AdminNav from "../AdminNav";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { assetSymbol } from "../../Web3/Web3";

const url = "https://refer.ap.ngrok.io";
// const url = "http://localhost:3030";

const notify = (msg) => toast.success(msg);

export default function SeeLevel({ account }) {
  const [level, setLevel] = useState([]);

  useEffect(() => {
    const init = async () => {
      axios
        .get(`${url}/levels`)
        .then(async (res) => {
          let item = [];
          console.log(res);
          for (let x = 0; x < res.data.length; x++) {
            const data = res.data[x];
            const symbol = await assetSymbol(res.data[x].assertName);
            data.symbol = symbol;
            item.push(data);
          }
          setLevel(item);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    init();
  }, []);

  const init = async () => {
    axios
      .get(`${url}/levels`)
      .then(async (res) => {
        let item = [];
        console.log(res);
        for (let x = 0; x < res.data.length; x++) {
          const data = res.data[x];
          const symbol = await assetSymbol(res.data[x].assertName);
          data.symbol = symbol;
          item.push(data);
        }
        setLevel(item);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const changestatus = async (id, tab) => {
    axios
      .post(`${url}/handlepool`, {
        id: id,
        status: !tab,
      })
      .then((res) => {
        console.log(res);
        init();
        notify("Pool status changed");
      });
  };

  return (
    <>
      <Container maxWidth="lg">
        <AdminNav account={account} />
        <Box
          style={{
            boxShadow: "0 4px 25px rgb(51 51 51 / 15%)",
            padding: "60px 20px 60px",
            marginTop: "2rem",
          }}
        >
          <Grid container spacing={2}>
            {level &&
              level.map((res) => {
                return (
                  <>
                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                      <Box
                        style={{
                          boxShadow: "0 4px 25px rgb(51 51 51 / 15%)",
                          padding: "1rem",
                          paddingLeft: "2rem",
                          marginTop: "1rem",
                          borderRadius: "10px",
                        }}
                      >
                     <Box style={{width:"85% ",margin:"1.5rem auto"}}>
                        <Box>
                          <Grid container>
                            <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
                              <Typography variant="span">Duration:</Typography>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                              <Typography
                                variant="span"
                                style={{
                                  fontWeight: "800",
                                  paddingLeft: "5rem",
                                }}
                              >
                                {res.Duration}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>

                        <Box>
                          <Grid container>
                            <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
                              <Typography variant="span">APY:</Typography>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                              <Typography
                                variant="span"
                                style={{
                                  fontWeight: "800",
                                  paddingLeft: "5rem",
                                }}
                              >
                                {res.APY}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box>
                          <Grid container>
                            <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
                              <Typography variant="span">
                                assert Symbol:
                              </Typography>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                              <Typography
                                variant="span"
                                style={{
                                  fontWeight: "800",
                                  paddingLeft: "5rem",
                                }}
                              >
                                {res.symbol}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box>
                          <Grid container>
                            <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
                              <Typography variant="span">payout:</Typography>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                              <Typography
                                variant="span"
                                style={{
                                  fontWeight: "800",
                                  paddingLeft: "5rem",
                                }}
                              >
                                {res.payout}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box>
                          <Grid container>
                            <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
                              <Typography variant="span">penalty:</Typography>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                              <Typography
                                variant="span"
                                style={{
                                  fontWeight: "800",
                                  paddingLeft: "5rem",
                                }}
                              >
                                {res.penalty}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box>
                          <Grid container>
                            <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
                              <Typography variant="span">
                                Level one MinAmount:
                              </Typography>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                              <Typography
                                variant="span"
                                style={{
                                  fontWeight: "800",
                                  paddingLeft: "5rem",
                                }}
                              >
                                {res.leveloneMinAmount}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box>
                          <Grid container>
                            <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
                              <Typography variant="span">
                                Bonus for level one:
                              </Typography>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                              <Typography
                                variant="span"
                                style={{
                                  fontWeight: "800",
                                  paddingLeft: "5rem",
                                }}
                              >
                                {res.bonusforlevelone}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box>
                          <Grid container>
                            <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
                              <Typography variant="span">
                                Reward for level two:
                              </Typography>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                              <Typography
                                variant="span"
                                style={{
                                  fontWeight: "800",
                                  paddingLeft: "5rem",
                                }}
                              >
                                {res.rewardforleveltwo}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box>
                          <Grid container>
                            <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
                              <Typography variant="span">
                                level two Min Amount:
                              </Typography>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                              <Typography
                                variant="span"
                                style={{
                                  fontWeight: "800",
                                  paddingLeft: "5rem",
                                }}
                              >
                                {res.leveltwoMinAmount}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box>
                          <Grid container>
                            <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
                              <Typography variant="span">
                                level three Min Amount:
                              </Typography>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                              <Typography
                                variant="span"
                                style={{
                                  fontWeight: "800",
                                  paddingLeft: "5rem",
                                }}
                              >
                                {res.levelthreeMinAmount}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box>
                          <Grid container>
                            <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
                              <Typography variant="span">
                                reward for level one:
                              </Typography>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                              <Typography
                                variant="span"
                                style={{
                                  fontWeight: "800",
                                  paddingLeft: "5rem",
                                }}
                              >
                                {res.rewardforlevelone}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box>
                          <Grid container>
                            <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
                              <Typography variant="span">
                                bonus for level two:
                              </Typography>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                              <Typography
                                variant="span"
                                style={{
                                  fontWeight: "800",
                                  paddingLeft: "5rem",
                                }}
                              >
                                {res.bonusforleveltwo}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box>
                          <Grid container>
                            <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
                              <Typography variant="span">
                                bonus for level three:
                              </Typography>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                              <Typography
                                variant="span"
                                style={{
                                  fontWeight: "800",
                                  paddingLeft: "5rem",
                                }}
                              >
                                {res.bonusforlevelthree}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box>
                          <Grid container>
                            <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
                              <Typography variant="span">
                                reward for level three:{" "}
                              </Typography>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                              <Typography
                                variant="span"
                                style={{
                                  fontWeight: "800",
                                  paddingLeft: "5rem",
                                }}
                              >
                                {res.rewardforlevelthree}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box>
                          <Grid container>
                            <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
                              <Typography variant="span">
                                pool status:{" "}
                              </Typography>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                              <Typography
                                variant="span"
                                style={{
                                  fontWeight: "800",
                                  paddingLeft: "5rem",
                                }}
                              >
                                {res.poolstatus.toString()}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box>
                          <Grid container>
                            <Grid
                              item
                              xl={12}
                              lg={12}
                              md={12}
                              sm={12}
                              xs={12}
                              style={{
                                backgroundColor: "#8D00FF",
                                textAlign: "center",
                                margin: "1rem auto",
                                borderRadius: "10px",
                                color: "white",
                              }}
                            >
                              <Button
                                onClick={() =>
                                  changestatus(res._id, res.poolstatus)
                                }
                                style={{ color: "white" }}
                              >
                                {res.poolstatus ? "Pause" : "Active"}
                              </Button>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                      </Box>
                    </Grid>
                    <Toaster />
                  </>
                );
              })}
          </Grid>
        </Box>
      </Container>
    </>
  );
}
