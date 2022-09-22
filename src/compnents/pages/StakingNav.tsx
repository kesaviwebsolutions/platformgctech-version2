import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Container, Box } from "@mui/system";
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
  Backdrop,
  CircularProgress,
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
  orderIDReferrals,
  OrderIDdata,
  totalstakedinContract,
  orderID,
  poeldata1,
  poeldata2,
  poeldata3,
  poeldata4,
  assetSymbol,
  getallTokenBalancegcs,
  totallocked
} from "../../Web3/Web3";
import { AiOutlineCopy } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// const url = "https://refer.ap.ngrok.io";
const url = "http://localhost:3030";

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
  align: "center";
  format?: (value: number) => string;
}
interface Column2 {
  id: "name" | "code" | "population" | "size" | "density";
  label: string;
  minWidth?: number;
  align: "center";
  format?: (value: number) => string;
}
const columns: readonly Column[] = [
  {
    id: "size",
    label: "Pool ID",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Token",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  { id: "name", label: "Staking Date", minWidth: 170, align: "center" },
  {
    id: "density",
    label: "Amount",
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
    label: "Level",
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
];

const columns2: readonly Column2[] = [
  {
    id: "size",
    label: "S.N0",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Wallet",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },

  {
    id: "density",
    label: "Amount",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "density",
    label: "Started at",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "density",
    label: "Ending at",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "density",
    label: "Reward",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "density",
    label: "Bonus",
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

export default function AdminNav({ account, aday1, aday2, aday3, aday4 }) {
  const { ID } = useParams();
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
  const [referal, setReferals] = useState();
  const [showID, setShowID] = useState(false);
  const [loading, setLoading] = useState(false);
  const [day1, setDay1] = useState(0);
  const [day2, setDay2] = useState(0);
  const [day3, setDay3] = useState(0);
  const [day4, setDay4] = useState(0);
  const [active, setActive] = useState(1);
  const [returns, setReturns] = useState(0);
  const [level, setLevel] = useState();


  const [plans, setPlans] = useState([])
  const [lptoken, setLPToken] = useState()
  const [symbol, setSymbol] = useState();
  const [payout, setPayout] = useState();
  const [minStakelevel1, setMinStakeLevel1] = useState(0);
  const [minStakelevel2, setMinStakeLevel2] = useState(0);
  const [minStakelevel3, setMinStakeLevel3] = useState(0);
  const [bonuslevel1, setBonuslevel1] = useState(0);
  const [bonuslevel2, setBonuslevel2] = useState(0);
  const [bonuslevel3, setBonuslevel3] = useState(0);
  const [rewardlevel1, setRewardlevel1] = useState(0);
  const [rewardlevel2, setRewardlevel2] = useState(0);
  const [rewardlevel3, setRewardlevel3] = useState(0);
  const [indexID, setIndexID] = useState(0);
  const [penalty, setpenalty] = useState(0);
  const [totaktokenlocked, setTotaltokenlocked] = useState(0);

  useEffect(()=>{
    const init = async()=>{
      axios.get(`${url}/levels`).then(async(res)=>{
        // console.log(res);
        let item = []
        for(let x = 0; x < res.data.length; x++){
          const data = res.data[x];
          const symbol = await assetSymbol(res.data[x].assertName)
          data.symbol = symbol
          item.push(data)
        }
        // console.log(item)
        setPlans(item)
      }).catch((e)=>{
        console.log(e)
      })
    }
    init();
  },[])

  useEffect(() => {
    const init = async () => {
      getReferrals();
      
      const locked = await totallocked()
      setTotaltokenlocked(locked)
      const ds = await tokenDistribute();
      setDistribute(ds);
      const rewards = await totakRewardEarned();
      setRewards(rewards);
      // const event = await getDetails();
      // setEvents(event);
      // const myst = await StakeBalace();
      // setMystake(myst);
      const fday = await poeldata1();
      setDay1(fday);
      const sday = await poeldata2();
      setDay2(sday);
      const tday = await poeldata3();
      setDay3(tday);
      const frday = await poeldata4();
      setDay4(frday);
    };
    init();
  }, [account]);

  const totakStakefromDB =()=>{
   
  }
 

  // this methods only fetchs the refferals and stakes in all pools of currently loged in user.
  const getReferrals = async () => { 
    let ref = [];
    await axios.get(`${url}/totalamount`).then((res)=>{
        setStakeTotal(res.data)
        // console.log("total amount",res.data)
    }).catch((error)=>console.log(error))

    await axios.post(`${url}/mystaketotal`,{
      user: account.toLowerCase()
    }).then((res)=>{
      setMystake(res.data)
      console.log("total amount",res.data)
  }).catch((error)=>console.log(error))


    await axios
      .post(`${url}/isuser`, {
        user: account.toLowerCase(),
      })
      .then(async (res) => {
        setEvents(res.data)
        if (res.data.length > 0) {
          setShowID(true);
        } else {
          setShowID(false);
        }
        // setReferals(undefined);
        if (res.data[0] && res.data[0].refferals.length > 0) {
          for (let i = 0; i < res.data[0].refferals.length; i++) {
              const events = await axios.post(`${url}/isuser`, {
                user: res.data[0].refferals[i],
              }).then((response)=>{
                return response.data[0];
              })
            ref.push(events);
          }
          setReferals(ref);
        }
        
      })
      .catch((e) => {
        console.log(e);
      });
  };


  const StakingToken = async () => {
    try {
      setLoading(true);
      const data = await Stake(amount, indexID, lptoken);
      if (data.status) {
        notify("Stake Successfully");
        await addReferralUser("Ox00000000000000oO", amount);
      }
    } catch (error) {
      setLoading(false);
    }
  };
 

  const addReferralUser = async (hash, amount) => {
    if (ID) {
      await axios
        .post(`${url}/addreferrals`, {
          user: ID.toLowerCase(),
          wallet: account.toLowerCase(),
        })
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
      const isuser = await axios  // check if user eixts in database or not
        .post(`${url}/isuser`, {
          user: account.toLowerCase(),
        })
        .then((res) => {
          const dat = res.data[0]
          console.log("Current user length ",dat);
          return res.data;
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });

      if (isuser.length <= 0) { 
     
        await axios
          .post(`${url}/user`, {
            user: account.toLowerCase(),
            expire: new Date(time + duration * 86400000).getTime() / 1000,
            Tx: hash,
            level: (Number(amount) < minStakelevel3 ? 3 : Number(amount) >= minStakelevel3 && Number(amount) < minStakelevel2 ? 2 : 1 ),
            Duration: duration,
            APY: apy,
            amount: amount,
            stakedpool:[indexID],
            poolID:indexID,
            isrewardPaid: false,
            isbonusPaid: false,
            time: new Date().getTime() / 1000,
            refferals: [],
            assertSymbol:symbol,
            penalty:penalty,
            lptoken:lptoken,
            payout:payout,
            leveloneMinAmount:minStakelevel1,
            bonusforlevelone:bonuslevel1,
            rewardforlevelone:rewardlevel1,
            leveltwoMinAmount:minStakelevel2,
            bonusforleveltwo:bonuslevel2,
            rewardforleveltwo:rewardlevel2,
            levelthreeMinAmount:minStakelevel3,
            bonusforlevelthree:bonuslevel3,
            rewardforlevelthree:rewardlevel3,
          })
          .then((res) => {
            console.log("you are fresh staker",res);
            getReferrals();
          })
          .catch((e) => {
            console.log(e);
            setLoading(false);
          });
      } else if(!isuser[0].stakedpool.includes(indexID)){
        const pool = isuser[0].stakedpool
        pool.push(indexID)
        await axios
        .post(`${url}/user`, {
          user: account.toLowerCase(),
          expire: new Date(time + duration * 86400000).getTime() / 1000,
          Tx: hash,
          level: (Number(amount) < minStakelevel3 ? 3 : Number(amount) >= minStakelevel3 && Number(amount) < minStakelevel2 ? 2 : 1 ),
          Duration: duration,
          APY: apy,
          amount: amount,
          stakedpool:pool,
          poolID:indexID,
          isrewardPaid: false,
          isbonusPaid: false,
          time: new Date().getTime() / 1000,
          refferals: [],
          assertSymbol:symbol,
          penalty:penalty,
          lptoken:lptoken,
          payout:payout,
          leveloneMinAmount:minStakelevel1,
          bonusforlevelone:bonuslevel1,
          rewardforlevelone:rewardlevel1,
          leveltwoMinAmount:minStakelevel2,
          bonusforleveltwo:bonuslevel2,
          rewardforleveltwo:rewardlevel2,
          levelthreeMinAmount:minStakelevel3,
          bonusforlevelthree:bonuslevel3,
          rewardforlevelthree:rewardlevel3,
        })
        .then((res) => {
          console.log("you are old staker for new ID",res);
          getReferrals();
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
      } 
      else{
        console.log("Pool ID already exists",indexID,account.toLowerCase())
        await axios
          .post(`${url}/updateuser`, {
            user: account.toLowerCase(),
            poolID:indexID,
            amount: amount,
            level: (Number(amount) < minStakelevel3 ? 3 : Number(amount) >= minStakelevel3 && Number(amount) < minStakelevel2 ? 2 : 1 ),
          })
          .then((res) => {
            console.log(res);
            getReferrals()
          })
          .catch((e) => {
            console.log(e);
            setLoading(false);
          });
      }
    } 
    else {
      const isuser = await axios  // check if user eixts in database or not
        .post(`${url}/isuser`, {
          user: account.toLowerCase(),
        })
        .then((res) => {
          const dat = res.data[0]
          console.log("Current user length ",dat);
          return res.data;
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });

      if (isuser.length <= 0) { 
     
        await axios
          .post(`${url}/user`, {
            user: account.toLowerCase(),
            expire: new Date(time + duration * 86400000).getTime() / 1000,
            Tx: hash,
            level: (Number(amount) < minStakelevel3 ? 3 : Number(amount) >= minStakelevel3 && Number(amount) < minStakelevel2 ? 2 : 1 ),
            Duration: duration,
            APY: apy,
            amount: amount,
            stakedpool:[indexID],
            poolID:indexID,
            isrewardPaid: false,
            isbonusPaid: false,
            time: new Date().getTime() / 1000,
            refferals: [],
            assertSymbol:symbol,
            penalty:penalty,
            lptoken:lptoken,
            payout:payout,
            leveloneMinAmount:minStakelevel1,
            bonusforlevelone:bonuslevel1,
            rewardforlevelone:rewardlevel1,
            leveltwoMinAmount:minStakelevel2,
            bonusforleveltwo:bonuslevel2,
            rewardforleveltwo:rewardlevel2,
            levelthreeMinAmount:minStakelevel3,
            bonusforlevelthree:bonuslevel3,
            rewardforlevelthree:rewardlevel3,
          })
          .then((res) => {
            console.log("you are fresh staker",res);
            getReferrals();
          })
          .catch((e) => {
            console.log(e);
            setLoading(false);
          });
      } else if(!isuser[0].stakedpool.includes(indexID)){
        const pool = isuser[0].stakedpool
        pool.push(indexID)
        await axios
        .post(`${url}/user`, {
          user: account.toLowerCase(),
          expire: new Date(time + duration * 86400000).getTime() / 1000,
          Tx: hash,
          level: (Number(amount) < minStakelevel3 ? 3 : Number(amount) >= minStakelevel3 && Number(amount) < minStakelevel2 ? 2 : 1 ),
          Duration: duration,
          APY: apy,
          amount: amount,
          stakedpool:pool,
          poolID:indexID,
          isrewardPaid: false,
          isbonusPaid: false,
          time: new Date().getTime() / 1000,
          refferals: [],
          assertSymbol:symbol,
          penalty:penalty,
          lptoken:lptoken,
          payout:payout,
          leveloneMinAmount:minStakelevel1,
          bonusforlevelone:bonuslevel1,
          rewardforlevelone:rewardlevel1,
          leveltwoMinAmount:minStakelevel2,
          bonusforleveltwo:bonuslevel2,
          rewardforleveltwo:rewardlevel2,
          levelthreeMinAmount:minStakelevel3,
          bonusforlevelthree:bonuslevel3,
          rewardforlevelthree:rewardlevel3,
        })
        .then((res) => {
          console.log("you are old staker for new ID",res);
          getReferrals();
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
      } 
      else{
        console.log("Pool ID already exists",indexID,account.toLowerCase())
        await axios
          .post(`${url}/updateuser`, {
            user: account.toLowerCase(),
            poolID:indexID,
            amount: amount,
            level: (Number(amount) < minStakelevel3 ? 3 : Number(amount) >= minStakelevel3 && Number(amount) < minStakelevel2 ? 2 : 1 ),
          })
          .then((res) => {
            console.log(res);
            getReferrals()
          })
          .catch((e) => {
            console.log(e);
            setLoading(false);
          });
      }
    }
    setLoading(false);
  };

  // const countdown = (tab) => {
  //   var now = new Date().getTime();
  //   const time = tab * 1000 + 2592000 * 1000;
  //   var distance = time - now;

  //   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  //   var hours = Math.floor(
  //     (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  //   );
  //   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //   var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  //   return days + " Days " + hours + " Hours " + minutes + " Minutes " + seconds + " Seconds ";
  // };

  const copytext = (text) => {
    navigator.clipboard.writeText(text);
    notify("Copied");
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

  const gettokenbalance =async(token)=>{
    const balance = await getallTokenBalancegcs(token)
    setBalance(balance)
  } 

  const unStakeAmount = async (id: any, end: any) => {
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

  const upcommingDate = (time: number) => {
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
  const EmergencyUnstake = async (id: any) => {
    const data = await emergencyaction(id);
    if (data.status) {
      notify("Unstake Successfully");
    }
  };

  const slicewallet = (add) => {
    const first = add.slice(0, 6);
    const second = add.slice(35);
    return first + "..." + second;
  };

  const renderRows = (rowsInfo, index) => {
    return (
      <>
        <TableRow key={index}>
          <TableCell>{rowsInfo.poolID}</TableCell>
          <TableCell>{rowsInfo.assertSymbol}</TableCell>
          <TableCell>
            {new Date(Number(rowsInfo.time) * 1000).toLocaleDateString()}
          </TableCell>
          <TableCell>{rowsInfo.amount}</TableCell>
          <TableCell>
            {new Date(Number(rowsInfo.expire) * 1000).toLocaleDateString()}
          </TableCell>
          <TableCell>{rowsInfo.level}</TableCell>
          {Number(rowsInfo.expire) < new Date().getTime()/1000 ? !rowsInfo.claimed ? <TableCell  onClick={() => unStakeAmount(rowsInfo.poolID,rowsInfo.expire )} >UNSTAKE</TableCell> : <TableCell>UNSTAKED</TableCell> : <TableCell>{upcommingDate(rowsInfo.expire)}</TableCell>}
          {/* {!rowsInfo.claimed && Number(rowsInfo.expire) < new Date().getTime()/1000 ? (
            <TableCell
              className=""
              onClick={() => unStakeAmount(rowsInfo.poolID)}
            >
              {upcommingDate(rowsInfo.endtime)}
            </TableCell>
          ) : (
            <TableCell>UNSTAKE NOT AVAILABLE</TableCell>
          )} */}
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
            <Tab label="GCS Stake" {...a11yProps(0)} />
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
              {showID ? (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  className="reff-id"
                  sx={{
                    fontSize: "1rem",
                    marginBottom: "3rem",
                    textAlign: "center",
                    fontWeight: 800,
                    overflow:"hidden"
                  }}
                >
                  <span >
                    <span className="Refferal">Refferal-id: </span>
                    <span className="Refferal">{`https://gc-staking.netlify.app/staking/${account}`}</span>
                    <span>
                      <AiOutlineCopy
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          copytext(
                            `https://gc-staking.netlify.app/staking/${account}`
                          )
                        }
                      />
                    </span>
                  </span>
                </Grid>
              ) : (
                ""
              )}
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
                            {Number(stakeTotal).toFixed(0)} GCS
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
                            Total token locked
                          </Typography>
                          <Typography
                            sx={{
                              mb: 1.5,
                              fontSize: "30px",
                              fontWeight: "900",
                            }}
                          >
                            {Number(totaktokenlocked).toFixed(0)}
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
                            0
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
                  {plans.map((item)=>{
                    return <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box
                      sx={{ maxWidth: 500,alignItems:"center",margin:"0 auto" }}
                      onClick={() => {
                        setDuration(item.Duration);
                        setAPY(item.APY);
                        setReturns(item.APY);
                        setLPToken(item.assertName)
                        setSymbol(item.symbol)
                        setPayout(item.payout)
                        setMinStakeLevel1(item.leveloneMinAmount)
                        setMinStakeLevel2(item.leveltwoMinAmount)
                        setMinStakeLevel3(item.levelthreeMinAmount)
                        setBonuslevel1(item.bonusforlevelone)
                        setBonuslevel2(item.bonusforleveltwo)
                        setBonuslevel3(item.bonusforlevelthree)
                        setRewardlevel1(item.rewardforlevelone)
                        setRewardlevel2(item.rewardforleveltwo)
                        setRewardlevel3(item.rewardforlevelthree)
                        setIndexID(plans.indexOf(item))
                        setpenalty(item.penalty)
                        gettokenbalance(item.assertName);
                      }}
                    >
                      <Card
                        variant="outlined"
                        className={active == plans.indexOf(item) ? "active" : ""}
                        onClick={() => setActive(plans.indexOf(item))}  style={{boxShadow:"rgb(51 51 51 / 15%) 0px 4px 25px"}}
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
                              {item.Duration} Days
                            </Typography>
                            <Typography
                              sx={{
                                mb: 1.5,
                              }}
                            >
                              {item.APY}% ESTIMATED APY
                            </Typography>
                            <Typography
                              sx={{
                                mb: 1.5,
                              }}
                              variant='h5'
                            >
                              {item.symbol}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Box>
                  </Grid>
                  })}
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
                      <h4 className="srpayBalance">
                        Your Balance : {balance}{" "}{symbol}
                      </h4>
                    </div>
                    <a href="https://www.gcex.lt/" target="_black">
                      <button
                        className="d-block m-auto stake-btton"
                        style={{ marginTop: "2rem !important" }}
                      >
                        {" "}
                        BUY GCS
                      </button>
                    </a>
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
                        <p>Estimated APY</p>
                        <p className="ssc">:</p>
                        <p className="sc">{apy}%</p>
                      </div>
                      <div className="summary-content">
                        <p>Staked Amount</p>
                        <p className="ssc">:</p>
                        <p className="sc">{amount} GCS</p>
                      </div>
                      <div className="summary-content">
                        <p>Estimated Return</p>
                        <p className="ssc2">:</p>
                        <p className="sc">
                          {(Number(amount) + Number(amount) * apy * duration )/(365*1000)}{" "}
                          GCS
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
              {/* <Typography style={{ textAlign: "center", marginBottom: "2rem" }}>
                <span className="levels">
                  {mystake < 1000
                    ? "Entry Level"
                    : mystake >= 1000 && mystake < 3000
                    ? "Level 2"
                    : "Level 1"}
                </span>
              </Typography> */}
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
                            {Number(mystake).toFixed(0)} GCS
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
                            {0}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
              </Grid>
              <Container maxWidth="xl">
                <TableContainer
                  sx={{
                    maxHeight: 440,
                    textAlign: "center",
                    marginTop: "3rem",
                  }}
                >
                  {events && events.length > 0 ? (
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow sx={{ textAlign: "center" }}>
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
                        {events.map((item) => renderRows(item))}
                      </TableBody>
                    </Table>
                  ) : (
                    <Skeleton
                      count={5}
                      width="100%"
                      style={{ paddingTop: "10px" }}
                    />
                  )}
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
            {showID ? (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  className="reff-id"
                  sx={{
                    fontSize: "1rem",
                    marginBottom: "3rem",
                    textAlign: "center",
                    fontWeight: 800,
                    width:"100%",
               overflow:"hidden"

                  }}
                >
                  <span >
                    <span className="">Refferal-id: </span>
                    <Typography className="" >{`https://gc-staking.netlify.app/staking/${account}`}</Typography>
                    <span>
                      <AiOutlineCopy
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          copytext(
                            `https://gc-staking.netlify.app/staking/${account}`
                          )
                        }
                      />
                    </span>
                  </span>
                </Grid>
              ) : (
                ""
              )}
              {/* <Typography style={{ textAlign: "center", marginBottom: "2rem" }} className="reff-id">
                <span className="">
                 { events[0] && <span >{countdown(Number(events[0].starttime))}</span>}
                 <br/><br/>
                  <span >to get 10 or more referrals of level {level} to qualify for 1% direct bonus and 2.5% rewards</span>
                </span>
              </Typography> */}
              <TableContainer sx={{ maxHeight: 440 }}>
                {referal ? (
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
                    <TableBody>
                      {referal.map((item) => {
                        return (
                          <TableRow>
                            <TableCell>{referal.indexOf(item)}</TableCell>
                            <TableCell>
                              {slicewallet(item.user)}{" "}
                              <AiOutlineCopy
                                style={{ cursor: "pointer" }}
                                onClick={() => copytext(item[0])}
                              />
                            </TableCell>
                            <TableCell>
                              {Number(item.amount)}
                            </TableCell>
                            <TableCell>
                              {new Date(item.time * 1000).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              {new Date(item.expire * 1000).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              {(item.amount*item.APY) / ((36500 * item.Duration * 2.5)/100)}
                            </TableCell>
                            <TableCell>
                              {Number(item.amount) / 100}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                ) : (
                  <Skeleton
                    count={5}
                    width="100"
                    style={{ paddingTop: "10px" }}
                  />
                )}
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}
