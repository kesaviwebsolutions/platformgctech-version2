import React, { useEffect, useState } from "react";
import { MDBInput } from "mdb-react-ui-kit";
import { Box, Container } from "@mui/system";
import { Button, Typography, Grid } from "@mui/material";
import AdminNav from "../AdminNav";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { assetSymbol, editpool } from "../../Web3/Web3";
import { AiOutlineCopy } from "react-icons/ai";

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

  const changestatus = async (id, apy, fee, duration, payout, three, two, one, tab) => {
    const data = await editpool(id, apy, fee, duration, payout, three, two, one, !tab)
    if(data.status){
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
    }
  };

  const copytext = (text)=>{
    navigator.clipboard.writeText(text)
    notify("Copied")
  }

  const slicewallet = (add) => {
    const first = add.slice(0, 3);
    const second = add.slice(39);
    return first + "..." + second;
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
                          paddingTop: "1rem",
                          paddingLeft: "1rem",
                          marginTop: "1rem",
                          borderRadius: "10px",
                        }}
                      >
                     <Box style={{margin:"1rem auto"}} className="inner-box">
                        <Box>
                          <Grid container>
                            <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
                              <Typography variant="span">LP Token:</Typography>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                              <Typography
                                variant="span"
                                style={{
                                  fontWeight: "800",
                               
                                }}
                                className="value12"
                                id="value13"
                                
                              >
                                {slicewallet(res.assertName)}<AiOutlineCopy style={{cursor:'pointer'}} onClick={()=>copytext(res.assertName)}/>
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>

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
                                  
                                }}
                                className="value12"
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
                                  
                                }}
                                className="value12"
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
                                  
                                }}
                                className="value12"
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
                                  
                                }}
                                className="value12"
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
                                  
                                }}
                                className="value12"
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
                                  
                                }}
                                className="value12"
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
                                  
                                }}
                                className="value12"
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
                                  
                                }}
                                className="value12"
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
                                  
                                }}
                                className="value12"
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
                                  
                                }}
                                className="value12"
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
                                  
                                }}
                                className="value12"
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
                                  
                                }}
                                className="value12"
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
                                  
                                }}
                                className="value12"
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
                                  
                                }}
                                className="value12"
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
                                  
                                }}
                                className="value12"
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
                                  changestatus(level.indexOf(res), res.APY, res.fee, res.Duration, res.payout, res.levelthreeMinAmount, res.leveltwoMinAmount, res.leveloneMinAmount, res.poolstatus)
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
