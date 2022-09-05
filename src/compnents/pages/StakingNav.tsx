import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Container, Box } from "@mui/system";
import { AiOutlineCopy } from "react-icons/ai";
import {
  Grid,
  Card,
  Typography,
  CardContent,
  Stack,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TablePagination,
  useScrollTrigger,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import axios from "axios";
import {
  Stake,
  StakingtokenBalance,
  StakeBalace,
  tokenDistribute,
  totakRewardEarned,
  getDetails,
  emergencyaction,
  unstake,
} from "./../../Web3/Web3";

const url = "http://localhost:3030/isuser";

const time = new Date().getTime();

const notify = (msg) => toast.success(msg);
const warning = (msg) => toast.error(msg);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface Column {
  id: "name" | "code" | "population" | "size" | "density";
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
}
interface Column2 {
  id: "name" | "code" | "population" | "size" | "density";
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
}
const columns: readonly Column[] = [
  {
    id: "size",
    label: "Order ID",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  { id: "name", label: "Staking Date", minWidth: 170, align: "center" },
  {
    id: "density",
    label: "Token Amount",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "density",
    label: "Staking End",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "density",
    label: "Action",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "density",
    label: "Emergency",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
];
const columns2: readonly Column2[] = [
  {
    id: "size",
    label: "SN0.",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "All Referral Record",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },

  {
    id: "density",
    label: "Valid Upto",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "density",
    label: "UnValid Upto",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
];
interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

function createData2(
  name: string,
  code: string,
  population: number,
  size: number
): Data {
  const density = population / size;
  return { name, code, population, size, density };
}
function createData3(
  name: string,
  code: string,
  population: number,
  size: number
): Data {
  const density = population / size;
  return { name, code, population, size, density };
}
const rowsInfo = [
  {
    OrderID: "1",
    StakingDate: "20-09-2022",
    TokenAmount: "25000",
    StakedEnd: "25000",
    Action: "25000",
    Emergency: "25000",
  },
];
const rowsInfo2 = [
  {
    SNO: "1",
    AllReferralReward: "1",
    Validupto: "20-09-2022",
    Unvalidupto: "25000",
  },
];

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

const rows2 = [createData2("India", "IN", 1324171354, 1)];

const rows3 = [createData3("India", "IN", 1324171354, 1)];

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

export default function AdminNav({ account }) {
  const [value, setValue] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [duration, setDuration] = useState(0);
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [apy, setAPY] = useState(0);
  const [stakeTotal, setStakeTotal] = useState(0);
  const [distributed, setDistribute] = useState(0);
  const [mystake, setMystake] = useState(0);
  const [reward, setRewards] = useState(0);
  const [events, setEvents] = useState([]);

  const getUserReferrals = async () => {};

  useEffect(() => {
    const init = async () => {
      await axios
        .post(url, {
          user: account,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
      // const bal = await StakingtokenBalance();
      // setBalance(bal);
      // const ts = await StakeBalace();
      // setStakeTotal(ts);
      // const ds = await tokenDistribute()
      // setDistribute(ds);
      // const rewards = await totakRewardEarned();
      // setRewards(rewards)
      // const event = await getDetails();
      // setEvents(event)
    };
    init();
  }, [account]);

  const StakingToken = async () => {
    const data = await Stake(duration, amount);
    if (data.status) {
      notify("Stake Successfully");
      const ts = await StakeBalace();
      setStakeTotal(ts);
      const bal = await StakingtokenBalance();
      setBalance(bal);
    }
  };

  const handleChangePage = (e: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeRowsPerPage2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  const unStakeAmount = async (id, end) => {
    console.log(Number(new Date().getTime() / 1000).toFixed(0), Number(end));
    if (new Date().getTime() / 1000 < Number(end)) {
      warning("Can not unstake before end time");
      return true;
    }
    const data = await unstake(id);
    if (data.status) {
      notify("Staked Successfully");
      const rewards = await totakRewardEarned();
      setRewards(rewards);
      const event = await getDetails();
      setEvents(event);
    }
  };

  const upcommingDate = (time) => {
    var current = Math.round(new Date().getTime() / 1000);
    var seconds = time - current;
    if (seconds > 0) {
      const days = Math.floor(seconds / 86400);
      const hour = Math.floor(seconds / 3600) % 24;
      const min = Math.floor(seconds / 60) % 60;
      const sec = seconds % 60;
      // return days+"D :"+hour+"H :"+min+"M :"+sec+"S"
      return days + "D " + hour + "H";
    } else {
      return "UNSTAKE";
    }
  };
  const EmergencyUnstake = async (id) => {
    const data = await emergencyaction(id);
    if (data.status) {
      notify("Unstake Successfully");
    }
  };

  const renderRows = (rowsInfo, index) => {
    return (
      <>
        <TableRow key={index}>
          <TableCell>{rowsInfo.id}</TableCell>
          <TableCell>
            {new Date(Number(rowsInfo.starttime) * 1000).toLocaleDateString()}
          </TableCell>
          <TableCell>{rowsInfo.amount / 10 ** 18}</TableCell>
          <TableCell>
            {new Date(Number(rowsInfo.endtime) * 1000).toLocaleDateString()}
          </TableCell>
          {!rowsInfo.claimed ? (
            <TableCell
              className=""
              onClick={() => unStakeAmount(rowsInfo.id, rowsInfo.endtime)}
            >
              {upcommingDate(rowsInfo.endtime)}
            </TableCell>
          ) : (
            <TableCell>UNSTAKED</TableCell>
          )}
          {!rowsInfo.claimed ? (
            <TableCell>
              <p
                className="emergency"
                data-tip="hello world"
                onClick={() => EmergencyUnstake(rowsInfo.id)}
              >
                Emergency Withdraw &nbsp;&nbsp;
                <span
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="10% fee will be charged"
                >
                  <FaQuestionCircle size={20} />
                </span>
              </p>
            </TableCell>
          ) : (
            <TableCell>
              <p>NOT AVAILABLE</p>
            </TableCell>
          )}
        </TableRow>
      </>
    );
  };
  const renderRows2 = (rowsInfo, index) => {
    return (
      <>
        <TableRow key={index}>
          <TableCell>{rowsInfo.SNO}</TableCell>
          <TableCell>{rowsInfo.AllReferralReward}</TableCell>
          <TableCell>{rowsInfo.Validupto}</TableCell>
          <TableCell>{rowsInfo.Unvalidupto}</TableCell>
        </TableRow>
      </>
    );
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
                padding: "50px 20px 60px",
              }}
            >
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                sx={{
                  fontSize: "1.5rem",
                  marginBottom: "3rem",
                  textAlign: "center",
                  fontWeight: 800,
                }}
              >
                <span className="reff-id">
                  <span className="Refferal">Refferal-id </span>
                  <span>
                    <AiOutlineCopy />
                  </span>
                </span>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                  <Box sx={{}}>
                    <Card
                      variant="outlined"
                      style={{
                        border: "none",

                        background: "#fff",
                        boxShadow: "0 4px 25px rgb(51 51 51 / 15%)",
                        width: "90%",
                        margin: "0 auto",
                      }}
                    >
                      {" "}
                      <CardContent>
                        <Box className="cardcontent">
                          <Typography
                            sx={{ fontSize: 14, minWidth: "0px" }}
                            color="text.secondary"
                            gutterBottom
                          ></Typography>
                          <Typography
                            variant="h6"
                            component="div"
                            style={{
                              fontWeight: "900",
                              fontSize: "17px",
                              minWidth: "0px",
                            }}
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
                            {stakeTotal} GCex
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                  <Box sx={{}}>
                    <Card
                      variant="outlined"
                      style={{
                        border: "none",
                        background: "#fff",
                        boxShadow: "0 4px 25px rgb(51 51 51 / 15%)",
                        width: "90%",
                        margin: "0 auto",
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
                            {distributed} GCex
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                  <Box sx={{}}>
                    <Card
                      variant="outlined"
                      style={{
                        border: "none",
                        background: "#fff",
                        boxShadow: "0 4px 25px rgb(51 51 51 / 15%)",
                        width: "90%",
                        margin: "0 auto",
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
                          <Box
                            className="cardcontent2"
                            onClick={() => {
                              setDuration(30);
                              setAPY(35);
                            }}
                          >
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
                          <Box
                            className="cardcontent2"
                            onClick={() => {
                              setDuration(90);
                              setAPY(75);
                            }}
                          >
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
                          <Box
                            className="cardcontent2"
                            onClick={() => {
                              setDuration(180);
                              setAPY(90);
                            }}
                          >
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
                    <Box
                      sx={{ maxWidth: 300 }}
                      onClick={() => {
                        setDuration(365);
                        setAPY(130);
                      }}
                    >
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
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="stakedAmount"
                        value={amount}
                      />
                    </div>
                  </div>
                </div>
              </Box>
              <Box>
                <div className="container" style={{ marginTop: "3rem" }}>
                  <div className="stake-summary-content">
                    <div className="stake">
                      <h4 className="srpayBalance">Your Balance : SRPAY</h4>
                    </div>
                    <button
                      className="d-block m-auto stake-btton"
                      style={{ marginTop: "2rem !important" }}
                    >
                      {" "}
                      BUY GCex
                    </button>
                    <div className="stake">
                      <h3 className="stakingSummary">Staking Details</h3>
                    </div>
                    <div className="stake">
                      <div className="summary-content">
                        <p>Duration</p>
                        <p className="ssc4">:</p>
                        <p className="sc">{duration} Days</p>
                      </div>
                      <div className="summary-content">
                        <p>APY</p>
                        <p className="ssc5">:</p>
                        <p className="sc">{apy} %</p>
                      </div>
                      <div className="summary-content">
                        <p>Staked Amount</p>
                        <p className="ssc">:</p>
                        <p className="sc">{amount} SRPAY</p>
                      </div>
                      <div className="summary-content">
                        <p>Estimated Return</p>
                        <p className="ssc2">:</p>
                        <p className="sc">
                          {duration == 30
                            ? `${amount * 1.0292}`
                            : duration == 90
                            ? `${amount * 1.1875}`
                            : duration == 180
                            ? `${amount * 1.45}`
                            : `${amount * 2.3}`}{" "}
                          SRPAY
                        </p>
                      </div>
                      <div className="summary-content">
                        <p>Start Date</p>
                        <p className="ssc3">:</p>
                        <p className="sc">{new Date().toLocaleString()}</p>
                      </div>
                      <div className="summary-content">
                        <p>End Date</p>
                        <p className="ssc4">:</p>
                        <p className="sc">
                          {new Date(
                            time + duration * 86400000
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <button
                      className="d-block m-auto stake-btton"
                      onClick={() => StakingToken()}
                    >
                      {" "}
                      STAKE NOW
                    </button>
                    <br />
                  </div>
                </div>
              </Box>
            </Box>
          </Container>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Container maxWidth="xl">
            <Box
              style={{
                boxShadow: "0 4px 25px rgb(51 51 51 / 15%)",
                padding: "60px 20px 60px",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Box sx={{}}>
                    <Card
                      variant="outlined"
                      style={{
                        border: "none",

                        background: "#fff",
                        boxShadow: "0 4px 25px rgb(51 51 51 / 15%)",
                        width: "90%",
                        margin: "0 auto",
                      }}
                    >
                      {" "}
                      <CardContent>
                        <Box className="cardcontent">
                          <Typography
                            sx={{ fontSize: 14, minWidth: "0px" }}
                            color="text.secondary"
                            gutterBottom
                          ></Typography>
                          <Typography
                            variant="h6"
                            component="div"
                            style={{
                              fontWeight: "900",
                              fontSize: "17px",
                              minWidth: "0px",
                            }}
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
                            {stakeTotal} GCex
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Box sx={{}}>
                    <Card
                      variant="outlined"
                      style={{
                        border: "none",
                        background: "#fff",
                        boxShadow: "0 4px 25px rgb(51 51 51 / 15%)",
                        width: "90%",
                        margin: "0 auto",
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
                            Total Earn
                          </Typography>
                          <Typography
                            sx={{
                              mb: 1.5,
                              fontSize: "30px",
                              fontWeight: "900",
                            }}
                          >
                            {reward} GCex
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
              </Grid>
              <Container maxWidth="xl">
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {events && events.map((item) => renderRows(item))}
                    </TableBody>
                    {/* <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody> */}
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={rows2.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Container>
            </Box>
          </Container>
        </TabPanel>

        {/* MY REFERRAL */}

        <TabPanel value={value} index={2}>
          <Container maxWidth="xl">
            <Container maxWidth="xl">
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns2.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>{rowsInfo2.map(renderRows2)}</TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows3.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage2}
              />
            </Container>
          </Container>
        </TabPanel>
      </Box>
      <Toaster />
    </Container>
  );
}
