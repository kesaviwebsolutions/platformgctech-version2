import React,{useState, useEffect} from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import AdminNav from "./AdminNav";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Container } from "@mui/system";
import { OrderIDdata,GetPendingRewards,StakeBalace,balanceofreferral, balanceofstake, transfertoken, orderIDofReferal, PendingRewards } from "../Web3/Web3";
import { Link } from "react-router-dom";
import { AiOutlineCopy } from 'react-icons/ai'
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const url = "https://refer.ap.ngrok.io";
// const url = "http://localhost:3030";

const notify = (msg) => toast.success(msg);

const columns = [
  { id: "name", label: "SNO.", minWidth: 170, align: "center" },
  { id: "code", label: "Wallet Address", minWidth: 170, align: "center" },
  {
    id: "population",
    label: "Referral ID",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Amount",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Timestamp of stake",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "density",
    label: "Period of staking",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "density",
    label: "Level of staker",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "density",
    label: "Estimated APY(%)",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "density",
    label: "Required refferals",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "density",
    label: "Pending Reward",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "density",
    label: "Number of Staked pool",
    minWidth: 200,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "density",
    label: "NO. of Referrals",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "density",
    label: "Time Left",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

export default function StakingTable({ account, aday1, aday2, aday3, aday4 }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [user, setUser] = useState()

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const copytext = (text)=>{
    navigator.clipboard.writeText(text)
    notify("Copied")
  }
  
  const slicewallet = (add) => {
    const first = add.slice(0, 6);
    const second = add.slice(35);
    return first + "..." + second;
  };

    useEffect(() => {
    const init =async()=>{
       axios.get(`${url}/users`).then(async(res)=>{
        const staker = []
        for(let i = 0; i < res.data.length; i++){
          const data = res.data[i]
          const pending = await PendingRewards(res.data[i].poolID, res.data[i].user)
          data.pending = pending
          console.log(data)
          staker.push(data)
        }
        setUser(staker)
    })
    }
    init()
  }, [account])
  console.log(user)

  const countdown =(tab)=>{
    var now = new Date().getTime();
    const time = (tab*1000) + (2592000*1000)
    var distance = time - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return days +"D " + hours + "H " + minutes + "M " + seconds + "S "
    }





  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Container maxWidth="lg">
        <AdminNav account={account} />
        <TableContainer sx={{ maxHeight: 440 }}>
         {user ?  <Table stickyHeader aria-label="sticky table">
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
              {user && user.map((rowsInfo, index)=>{
                return <TableRow key={index}>
                <TableCell>{user.indexOf(rowsInfo)+1}</TableCell>
                <TableCell>{slicewallet(rowsInfo.user)}<AiOutlineCopy style={{cursor:'pointer'}} onClick={()=>copytext(rowsInfo.user)}/></TableCell>
                <TableCell>
                  {" "}
                  <Link to={`/admin/referral-id/${rowsInfo.user}`}>{slicewallet(rowsInfo.user)}</Link>
                </TableCell>
                <TableCell>{rowsInfo.amount}</TableCell>
                <TableCell>{new Date(rowsInfo.time).toLocaleString()}</TableCell>
                <TableCell>{rowsInfo.Duration}</TableCell>
                <TableCell>{rowsInfo.level == 3 ? "Entry Level" : rowsInfo.level == 2 ? "Level 2" : "Level 1"}</TableCell>
                <TableCell>{rowsInfo.APY}</TableCell>
                <TableCell>{rowsInfo.level == 1 ? rowsInfo.rewardforlevelthree : rowsInfo.level == 2 ? rowsInfo.bonusforlevelthree : "0"}</TableCell>
                <TableCell>{Number(rowsInfo.pending).toFixed(2)}</TableCell>
                <TableCell>{rowsInfo.stakedpool.length}</TableCell>
                <TableCell>{rowsInfo.refferals.length}</TableCell>
                <TableCell>{rowsInfo.level == 3 ? "NOT APPLICABLE" : countdown(rowsInfo.time)}</TableCell>
            </TableRow>
              })}
            </TableBody>
          </Table> : <Skeleton count={10} height='40' width='100'/>}
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
      <Toaster/>
    </Paper>
  );
}


