import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Container, Box } from "@mui/system";
import { Grid, Card, Typography, CardContent, Stack } from "@mui/material";
import { MDBInput } from "mdb-react-ui-kit";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AdminNav() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ width: "100%", marginTop: "50px" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="GCex Stake" {...a11yProps(0)} />
            <Tab label="My Stake" {...a11yProps(1)} />
            <Tab label="My Referrals" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Container maxWidth="xl">
            <Box
              style={{
                boxShadow: "0 4px 25px rgb(51 51 51 / 15%)",
                padding: "60px 20px 60px",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                  <Box sx={{ minWidth: 290 }}>
                    <Card
                      variant="outlined"
                      style={{
                        border: "none",
                        background: "#fff",
                        boxShadow: "0 4px 25px rgb(51 51 51 / 15%)",
                      }}
                    >
                      {" "}
                      <CardContent>
                        <Box className="cardcontent">
                          <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                          ></Typography>
                          <Typography
                            variant="h6"
                            component="div"
                            style={{ fontWeight: "900", fontSize: "17px" }}
                          >
                            Total Token Staked
                          </Typography>
                          <Typography
                            sx={{
                              mb: 1.5,
                              fontSize: "30px",
                              fontWeight: "900",
                            }}
                          >
                            0 GCex
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                  <Box sx={{ minWidth: 290 }}>
                    <Card
                      variant="outlined"
                      style={{
                        border: "none",
                        background: "#fff",
                        boxShadow: "0 4px 25px rgb(51 51 51 / 15%)",
                      }}
                    >
                      {" "}
                      <CardContent>
                        <Box className="cardcontent">
                          <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                          ></Typography>
                          <Typography
                            variant="h6"
                            component="div"
                            style={{ fontWeight: "900", fontSize: "17px" }}
                          >
                            Total Reward Distributed
                          </Typography>
                          <Typography
                            sx={{
                              mb: 1.5,
                              fontSize: "30px",
                              fontWeight: "900",
                            }}
                          >
                            0 GCex
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                  <Box sx={{ minWidth: 290 }}>
                    <Card
                      variant="outlined"
                      style={{
                        border: "none",
                        background: "#fff",
                        boxShadow: "0 4px 25px rgb(51 51 51 / 15%)",
                      }}
                    >
                      {" "}
                      <CardContent>
                        <Box className="cardcontent">
                          <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                          ></Typography>
                          <Typography
                            variant="h6"
                            component="div"
                            style={{ fontWeight: "900", fontSize: "17px" }}
                          >
                            Total Reward Pending
                          </Typography>
                          <Typography
                            sx={{
                              mb: 1.5,
                              fontSize: "30px",
                              fontWeight: "900",
                            }}
                          >
                            0 GCex
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
              </Grid>

              <Box style={{ marginTop: "50px" }}>
                <Box
                  style={{
                    padding: "20px 0px 40px",
                  }}
                >
                  <Typography
                    variant="h4"
                    style={{ fontSize: "25px", fontWeight: "500" }}
                  >
                    Staking Submission
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Box sx={{ maxWidth: 300 }}>
                      <Card
                        variant="outlined"
                        style={{
                          border: "none",
                          background: "#fff",
                          boxShadow: "0 4px 25px rgb(51 51 51 / 15%)",
                        }}
                      >
                        {" "}
                        <CardContent>
                          <Box className="cardcontent2">
                            <Typography
                              sx={{ fontSize: 14 }}
                              color="text.secondary"
                              gutterBottom
                            ></Typography>
                            <Typography
                              variant="h6"
                              component="div"
                              style={{ fontWeight: "900", fontSize: "17px" }}
                            >
                              30 Days
                            </Typography>
                            <Typography
                              sx={{
                                mb: 1.5,
                              }}
                            >
                              35% Apy
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Box sx={{ maxWidth: 300 }}>
                      <Card
                        variant="outlined"
                        style={{
                          border: "none",
                          background: "#fff",
                          boxShadow: "0 4px 25px rgb(51 51 51 / 15%)",
                        }}
                      >
                        {" "}
                        <CardContent>
                          <Box className="cardcontent2">
                            <Typography
                              sx={{ fontSize: 14 }}
                              color="text.secondary"
                              gutterBottom
                            ></Typography>
                            <Typography
                              variant="h6"
                              component="div"
                              style={{ fontWeight: "900", fontSize: "17px" }}
                            >
                              90 Days
                            </Typography>
                            <Typography
                              sx={{
                                mb: 1.5,
                              }}
                            >
                              75% APY
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Box sx={{ maxWidth: 300 }}>
                      <Card
                        variant="outlined"
                        style={{
                          border: "none",
                          background: "#fff",
                          boxShadow: "0 4px 25px rgb(51 51 51 / 15%)",
                        }}
                      >
                        {" "}
                        <CardContent>
                          <Box className="cardcontent2">
                            <Typography
                              sx={{ fontSize: 14 }}
                              color="text.secondary"
                              gutterBottom
                            ></Typography>
                            <Typography
                              variant="h6"
                              component="div"
                              style={{ fontWeight: "900", fontSize: "17px" }}
                            >
                              180 Days
                            </Typography>
                            <Typography
                              sx={{
                                mb: 1.5,
                              }}
                            >
                              90% Apy
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Box sx={{ maxWidth: 300 }}>
                      <Card
                        variant="outlined"
                        style={{
                          border: "none",
                          background: "#fff",
                          boxShadow: "0 4px 25px rgb(51 51 51 / 15%)",
                        }}
                      >
                        {" "}
                        <CardContent>
                          <Box className="cardcontent2">
                            <Typography
                              sx={{ fontSize: 14 }}
                              color="text.secondary"
                              gutterBottom
                            ></Typography>
                            <Typography
                              variant="h6"
                              component="div"
                              style={{ fontWeight: "900", fontSize: "17px" }}
                            >
                              365 Days
                            </Typography>
                            <Typography
                              sx={{
                                mb: 1.5,
                              }}
                            >
                              130% Apy
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box style={{ marginTop: "50px" }}>
                <div className="staking-area">
                  <div className="stakedsubmission my-5 py-4 position-relative">
                    <h4 className="ss-heading">Input Stake Amount:</h4>
                    <div className="d-grid">
                      <input
                        type="number"
                        placeholder="Enter amount"
                        className="stakedAmount"
                        value={0}
                      />
                    </div>
                  </div>
                </div>
              </Box>
            </Box>
          </Container>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
    </Container>
  );
}
