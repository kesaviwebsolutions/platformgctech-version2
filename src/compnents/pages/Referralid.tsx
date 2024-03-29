import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Container } from "@mui/system";
import AdminNav from "../AdminNav";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  orderIDofReferal,
  balanceofstake,
  OrderIDdata,
  transfertoken,
} from "../../Web3/Web3";
import toast, { Toaster } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Grid, Typography, Button } from "@mui/material";

const url = "https://refer.ap.ngrok.io";
// const url = "http://localhost:3030";

const notify = (msg) => toast.success(msg);
interface Column {
  id: "name" | "code" | "population" | "size" | "density";
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {
    id: "size",
    label: "SNO.",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Wallet Address",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "density",
    label: "ID",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "density",
    label: "Staked amount",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "density",
    label: "TX",
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
    label: "Plan",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "density",
    label: "NO. of Referrals",
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

function createData(
  name: string,
  code: string,
  population: number,
  size: number
): Data {
  const density = population / size;
  return { name, code, population, size, density };
}

// FOR ROW MAPPING

const rowsInfo = [
  {
    tablecell: "1",
    Referrallink: "002...324",
    txhash: "#121...22233",
    timeofstake: "20 min ago",
    nooftokenstaked: "10",
    lengthofstake: "1",
    APY: "50%",
    referrerbonus: "23",
    nooftokensinbonus: "10",
    duedate: "12-09-2022",
  },
  {
    tablecell: "2",
    Referrallink: "002...324",
    txhash: "#121...22233",
    timeofstake: "60 min ago",
    nooftokenstaked: "40",
    lengthofstake: "2",
    APY: "20%",
    referrerbonus: "23",
    nooftokensinbonus: "5",
    duedate: "20-09-2022",
  },
  {
    tablecell: "3",
    Referrallink: "002...324",
    txhash: "#121...22233",
    timeofstake: "90 min ago",
    nooftokenstaked: "40",
    lengthofstake: "3",
    APY: "70%",
    referrerbonus: "23",
    nooftokensinbonus: "20",
    duedate: "15-09-2022",
  },
  {
    tablecell: "4",
    Referrallink: "002...324",
    txhash: "#121...22233",
    timeofstake: "120 min ago",
    nooftokenstaked: "40",
    lengthofstake: "4",
    APY: "50%",
    referrerbonus: "23",
    nooftokensinbonus: "10",
    duedate: "12-09-2022",
  },
  {
    tablecell: "5",
    Referrallink: "002...324",
    txhash: "#121...22233",
    timeofstake: "1 day ag0",
    nooftokenstaked: "10",
    lengthofstake: "5",
    APY: "50%",
    referrerbonus: "23",
    nooftokensinbonus: "10",
    duedate: "12-09-2022",
  },
];

const copytext = (text) => {
  navigator.clipboard.writeText(text);
};

const slicewallet = (add) => {
  const first = add.slice(0, 6);
  const second = add.slice(35);
  return first + "..." + second;
};

const rows = [
  createData("India", "IN", 1324171354, 1),
  createData("China", "CN", 1403500365, 2),
  createData("Italy", "IT", 60483973, 3),
  createData("United States", "US", 327167434, 4),
  createData("Canada", "CA", 37602103, 5),
  createData("Australia", "AU", 25475400, 6),
  createData("Germany", "DE", 83019200, 7),
  createData("Ireland", "IE", 4857000, 8),
  createData("Mexico", "MX", 126577691, 9),
  createData("Japan", "JP", 126317000, 10),
  createData("France", "FR", 67022000, 11),
  createData("United Kingdom", "GB", 67545757, 12),
  createData("Russia", "RU", 146793744, 13),
  createData("Nigeria", "NG", 200962417, 14),
  createData("Brazil", "BR", 210147125, 15),
];

export default function StakingTable({ account, aday1, aday2, aday3, aday4 }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { ref } = useParams();
  const { poodid } = useParams();
  const [referrer, setRef] = React.useState(0);
  const [start, setStart] = React.useState(0);
  const [levels, setLevel] = React.useState(0);
  const [referrals, setReferrals] = React.useState(undefined);
  const [paidbouns, setPaidbonus] = React.useState(0)
  const [paidReward, setPaidreward] = React.useState(0)
  const [refAmount, setRefAmount] = React.useState(0)
  const [APY, setAPY] = React.useState(0)
  const [duration, setDuration] = React.useState(0)
  const [token, setToken] = React.useState('')

  React.useEffect(() => {
    const init = async () => {
      await getRef();
    };
    init();
  }, []);

  const trasferReward = async (reciver, amount, token) => {
    const data = await transfertoken(reciver, Number(amount).toFixed(5), token);
    if (data.status) {
      notify("Transfer Successfully");
      axios
        .post(`${url}/makereward`, {
          user: reciver.toLowerCase(),
          poolID: poodid,
          reward: amount+paidReward
        })
        .then((res) => {
          console.log("done");
        });
    }
  };

  const trasferBonus = async (reciver, amount, token) => {
    console.log(reciver.toLowerCase(),poodid)
    const data = await transfertoken(reciver, Number(amount).toFixed(5), token);
    if (data.status) {
      notify("Transfer Successfully");
      axios
        .post(`${url}/makebonus`, {
          user: reciver.toLowerCase(),
          poolID: poodid,
          bonus: amount+paidbouns
        })
        .then((res) => {
          console.log("done");
        });
    }
  };

  const renderRows = (rowsInfo, index) => {
    return (
      <>
        <TableRow key={index}>
          <TableCell sx={{ textAlign: "center" }}>{index + 1}</TableCell>
          <TableCell sx={{ textAlign: "center" }}>{rowsInfo.user}</TableCell>
          <TableCell sx={{ textAlign: "center" }}>
            <Link to={`/admin/referral-second/${rowsInfo.user}`}>
              {slicewallet(rowsInfo.user)}
            </Link>
          </TableCell>
          <TableCell sx={{ textAlign: "center" }}>
            {rowsInfo.amount} {rowsInfo.assertSymbol}
          </TableCell>
          <TableCell sx={{ textAlign: "center" }}>{rowsInfo.txs}</TableCell>
          <TableCell sx={{ textAlign: "center" }}>
            {rowsInfo.level == 3
              ? "Entry Level"
              : rowsInfo.level == 2
              ? "2"
              : "1"}
          </TableCell>
          <TableCell sx={{ textAlign: "center" }}>
            {rowsInfo.planName}
          </TableCell>
          <TableCell sx={{ textAlign: "center" }}>
            {rowsInfo.refferals.length}
          </TableCell>
          <TableCell sx={{ textAlign: "center" }}>
            {(rowsInfo.amount * rowsInfo.APY) /
              ((36500 * rowsInfo.Duration * 2.5) / 100)}
          </TableCell>
          <TableCell sx={{ textAlign: "center" }}>
            {rowsInfo.amount / 100}
          </TableCell>
        </TableRow>
      </>
    );
  };

  const getRef = async () => {
    axios
      .post(`${url}/isuserpoolid`, {
        user: ref.toLowerCase(),
        poolID: poodid,
      })
      .then(async (res) => {
        const event = [];
        if (res.data[0]) {
          setRef(res.data[0].refferals.length);
          setStart(res.data[0].time);
          setLevel(res.data[0].level);
          setPaidreward(res.data[0].paidReward)
          setPaidbonus(res.data[0].paidBonus)
          setRefAmount(res.data[0].amount)
          setDuration(res.data[0].Duration)
          setAPY(res.data[0].APY)
          setToken(res.data[0].lptoken)
          console.log(res)
          for (let x = 0; x < res.data[0].refferals.length; x++) {
            const level = await axios
              .post(`${url}/isuser`, {
                user: res.data[0].refferals[x].wallet,
              })
              .then((response) => {
                return response.data[0];
              });
            level.txs = res.data[0].refferals[x].tx;
            event.push(level);
          }
        }
        setReferrals(event);
      })
      .catch(console.error);
  };

  console.log("Refferals", referrals);
  const handleChangePage = (e: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  const countdown = (tab) => {
    var now = new Date().getTime();
    const time = tab * 1000 + 2592000 * 1000;
    var distance = time - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return days + "D " + hours + "H " + minutes + "M " + seconds + "S ";
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Container maxWidth="lg">
        <AdminNav account={account} />
        <p>{"Stakers Details > Referral Details"}</p>

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
            width: "100%",
            overflow: "hidden",
          }}
        >
          <span>Level: {levels == 3 ? "Entry Level" : levels}</span>
          <br />
          {levels == 3 ? (
            "Entry level is not eligible for bonus or reward"
          ) : (
            <span>
              {10 - referrer < 0 ? (
                <Typography className="">Eligible</Typography>
              ) : (
                <Typography className="">
                  {countdown(start)} remaining to get{" "}
                  {isNaN(10 - referrer) ? "0" : 10 - referrer} more referrers
                </Typography>
              )}
            </span>
          )}
        </Grid>

        {referrer > 0 && levels != 3 ? <Grid
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
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Typography style={{ color: "#7c7c7c" }}>
                Paid Bonus : {paidbouns}
              </Typography>
              <br />
              <Typography>Total Bonus : {refAmount/100}</Typography>
              <br />
              <Button
                style={{
                  backgroundColor: "#0064f0",
                  color: "white",
                  marginBottom: "1rem",
                }}
                onClick={()=>trasferBonus(ref,(refAmount/100)-paidbouns,token)}
              >
                Pay Bonus
              </Button>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Typography style={{ color: "#7c7c7c" }}>
                Paid Reward : {paidReward}
              </Typography>
              <br />
              <Typography>Total Reward : {(refAmount * APY) /
                    ((36500 * duration * 2.5) / 100)}</Typography>
              <br />
              <Button style={{ backgroundColor: "#0064f0", color: "white" }}
              onClick={()=>trasferReward(ref,(((refAmount * APY) /
              ((36500 * duration * 2.5) / 100))-paidReward),token)}
              >
                Pay Reward
              </Button>
            </Grid>
          </Grid>
        </Grid> : ""}

        <TableContainer sx={{ maxHeight: 440 }}>
          {referrals ? (
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      sx={{ textAlign: "center" }}
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
                {referrals.map((item) =>
                  renderRows(item, referrals.indexOf(item))
                )}
              </TableBody>
            </Table>
          ) : (
            <Skeleton count={5} />
          )}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
      <Toaster />
    </Paper>
  );
}
