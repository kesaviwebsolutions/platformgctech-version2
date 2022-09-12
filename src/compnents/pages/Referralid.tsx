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
import { orderIDofReferal, balanceofstake, OrderIDdata, transfertoken } from "../../Web3/Web3";
import toast, { Toaster } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

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
    label: "Time of staked",
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
  {
    id: "density",
    label: "Pay Reward",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },

  {
    id: "density",
    label: "Pay Bonus",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
  // {
  //   id: "density",
  //   label: "APY(%)",
  //   minWidth: 170,
  //   align: "center",
  //   format: (value: number) => value.toFixed(2),
  // },
  // {
  //   id: "density",
  //   label: "Referrer Bonus",
  //   minWidth: 170,
  //   align: "center",
  //   format: (value: number) => value.toFixed(2),
  // },
  // {
  //   id: "density",
  //   label: "No. of Tokens in Bonus",
  //   minWidth: 200,
  //   align: "center",
  //   format: (value: number) => value.toFixed(2),
  // },
  // {
  //   id: "density",
  //   label: "Due Date",
  //   minWidth: 170,
  //   align: "center",
  //   format: (value: number) => value.toFixed(2),
  // },
  // {
  //   id: "density",
  //   label: "Action",
  //   minWidth: 170,
  //   align: "center",
  //   format: (value: number) => value.toFixed(2),
  // },
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

const copytext = (text)=>{
  navigator.clipboard.writeText(text)
  
}

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

export default function StakingTable({account, aday1, aday2, aday3, aday4}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const {ref} = useParams();
  
  const [referrals, setReferrals] = React.useState(undefined);

  React.useEffect(()=>{
      const init =async()=>{
        await getRef()
      }
      init();
  },[])

  const trasferReward = async(reciver, amount)=>{
    const data = await transfertoken(reciver, Number(amount).toFixed(5));
    if(data.status){
      notify("Transfer Successfully");
      axios.post(`${url}/makereward`,{
        user:account.toLowerCase()
      }).then((res)=>{
        console.log("done")
      })
    }
  }

  const trasferBonus = async(reciver, amount)=>{
    const data = await transfertoken(reciver, Number(amount).toFixed(5));
    if(data.status){
      notify("Transfer Successfully");
      axios.post(`${url}/makebonus`,{
        user:account.toLowerCase()
      }).then((res)=>{
        console.log("done")
      })
    }
  }

  const renderRows = (rowsInfo, index) => {
    return (
      <>
        <TableRow key={index}>
          <TableCell>{index}</TableCell>
          <TableCell>{rowsInfo.wallet}</TableCell>
          <TableCell>
          <Link to={`/admin/referral-second/${rowsInfo.wallet}`}>{slicewallet(rowsInfo.wallet)}</Link>
            </TableCell>
          <TableCell>{rowsInfo.stakeamount/10**18}</TableCell>
          <TableCell>{rowsInfo.numberofstake}</TableCell>
          <TableCell>{(rowsInfo.stakeamount/10**18) * (rowsInfo.duration  == 1 ? aday1 : rowsInfo.duration  == 2 ? aday2 : rowsInfo.duration  == 3 ? aday3 : aday4)/36500 * rowsInfo.duration * 2.5/100}</TableCell>
          <TableCell>{(rowsInfo.stakeamount/10**18)/100}</TableCell>
          <TableCell><button disabled={rowsInfo.paidReward ? true : false} onClick={()=>trasferReward(rowsInfo.wallet,(rowsInfo.stakeamount/10**18) * (rowsInfo.duration  == 1 ? aday1 : rowsInfo.duration  == 2 ? aday2 : rowsInfo.duration  == 3 ? aday3 : aday4)/36500 * rowsInfo.duration * 2.5/100)}>Pay Reward</button></TableCell>
          <TableCell><button disabled={rowsInfo.paidBonus ? true : false} onClick={()=>trasferBonus(rowsInfo.wallet,(rowsInfo.stakeamount/10**18)/100)}>Pay Bonus</button></TableCell>
        </TableRow>
      </>
    );
  };

  const getRef =async()=>{
    axios.post(`${url}/isuser`,{
      user:ref.toLowerCase()
    }).then(async(res)=>{
      const event = []
      if(res.data[0]){  
        for(let x = 0; x < res.data[0].refferals.length; x++){
          const user1 = Object();
          const ids = await orderIDofReferal(res.data[0].refferals[x])
          const bal = await OrderIDdata(ids[0])
          user1.wallet = res.data[0].refferals[x]
          user1.stakeamount = bal[1]
          user1.duration = bal[2]
          user1.numberofstake = ids.length
          
          event.push(user1)
        }
      }
      setReferrals(event)
    }).catch(console.error)
  }

  // console.log("Refferals",referrals)
  const handleChangePage = (e: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Container maxWidth="lg">
        <AdminNav account={account}/>
        <p>{"Stakers Details > Referral Details"}</p>
        <TableContainer sx={{ maxHeight: 440 }}>
          {referrals ? <Table stickyHeader aria-label="sticky table">
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
            <TableBody>{referrals.map((item)=>renderRows(item, referrals.indexOf(item)))}</TableBody>
          </Table> : <Skeleton count={5} />}
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
