import React,{useState, useEffect} from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Container } from "@mui/system";
import AdminNav from "./AdminNav";
import axios from "axios";
import { OrderIDdata,GetPendingRewards,StakeBalace,balanceofreferral, balanceofstake, transfertoken, orderIDofReferal, PendingRewards } from "../Web3/Web3";
import { Link } from "react-router-dom";
import { AiOutlineCopy } from 'react-icons/ai'
import toast, { Toaster } from "react-hot-toast";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

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
  { id: "name", label: "Wallet Address", minWidth: 170 },
 
  {
    id: "population",
    label: "Referral ID",
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
    label: "Timestamp of stake",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "density",
    label: "Period of staking",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "density",
    label: "Level of staker",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "density",
    label: "Estimated APY(%)",
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
    label: "Required refferals",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "density",
    label: "Pending Reward",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "density",
    label: "Number of Staked pool",
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
    label: "Time Left",
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

const rowsInfo = [
  {
    tablecell: "1",
    walletaddress: "0xawe...2121",
   
    referralid: "002...324",
    txhash: "#121...22233",
    timeofstake: "120 min ago",
    periodofstaking: "2",
    levelofstaker: "50%",
    APY: "50%",
    pendingreward: "2",
    claimedreward: "10",
    noofreferrals: "7",
  },
  {
    tablecell: "2",
    walletaddress: "0xawe...2134",
   
    referralid: "002...324",
    txhash: "#121...22233",
    timeofstake: "120 min ago",
    periodofstaking: "2",
    levelofstaker: "50%",
    APY: "50%",
    pendingreward: "2",
    claimedreward: "10",
    noofreferrals: "7",
  },
  {
    tablecell: "3",
    walletaddress: "0xawe...2145",
   
    referralid: "002...324",
    txhash: "#121...22233",
    timeofstake: "120 min ago",
    periodofstaking: "2",
    levelofstaker: "50%",
    APY: "50%",
    pendingreward: "2",
    claimedreward: "10",
    noofreferrals: "7",
  },
  {
    tablecell: "4",
    walletaddress: "0xawe...2110",
   
    referralid: "002...324",
    txhash: "#121...22233",
    timeofstake: "120 min ago",
    periodofstaking: "2",
    levelofstaker: "50%",
    APY: "50%",
    pendingreward: "2",
    claimedreward: "10",
    noofreferrals: "7",
  },
  {
    tablecell: "5",
    walletaddress: "0xawe...2103",
    
    referralid: "002...324",
    txhash: "#121...22233",
    timeofstake: "120 min ago",
    periodofstaking: "2",
    levelofstaker: "50%",
    APY: "50%",
    pendingreward: "2",
    claimedreward: "10",
    noofreferrals: "7",
  },
];
const copytext = (text)=>{
  navigator.clipboard.writeText(text)
  notify("Copied")
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

export default function StakingTable({account, aday1, aday2, aday3, aday4 }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [user, setUser] = useState()
  const [stakebalance, setStakeBalance] = useState(0)
  const [level1amount, setLevel1amount] = useState(0)
  const [level2amount, setLevel2amount] = useState(0)
  const [level3amount, setLevel3amount] = useState(0)

  const handleChangePage = (e: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  useEffect(()=>{
    const init =async()=>{
      const stakebal = await StakeBalace();
      setStakeBalance(stakebal)
    }
    init();
  },[account])

  const getRefera =async(arra)=>{
    let a = 0;
    // console.log(arra)
    const stakebal = await StakeBalace();
    for(let x = 0; x < arra.length; x++){
      const id = await orderIDofReferal(arra[x])
     const userdata = await OrderIDdata(id[0]);
     if(userdata[1]/10**18>1000){
      a++
     }
    }
    return a;
  }
  
  // useEffect(()=>{
  //   const init =async()=>{
  //     axios.get(`${url}/levels`).then((res)=>{
  //       console.log(res.data)
  //       setLevel1amount(res.data[0].NoRefReq)
  //       setLevel2amount(res.data[1].NoRefReq)
  //       setLevel3amount(res.data[2].NoRefReq)
  //       console.log(res.data[0].NoRefReq)
  //       console.log(res.data[1].NoRefReq)
  //       console.log(res.data[2].NoRefReq)
  //     })
  //   }
  //   init()
  // })

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




  const renderRows = (rowsInfo, index) => {
    return (
      <>
        <TableRow key={index}>
          <TableCell>{user.indexOf(rowsInfo)+1}</TableCell>
          <TableCell>{slicewallet(rowsInfo.user)}<AiOutlineCopy style={{cursor:'pointer'}} onClick={()=>copytext(rowsInfo.beneficiary)}/></TableCell>
          <TableCell>
            {" "}
            <Link to={`/admin/referral-id/${rowsInfo.user}`}>{slicewallet(rowsInfo.user)}</Link>
          </TableCell>
          <TableCell>{rowsInfo.amount}</TableCell>
          <TableCell>{new Date(rowsInfo.time*1000).toLocaleString()}</TableCell>
          <TableCell>{rowsInfo.Duration}</TableCell>
          <TableCell>{rowsInfo.level == 3 ? "Entry Level" : rowsInfo.level == 2 ? "Level 2" : "Level 1"}</TableCell>
          <TableCell>{rowsInfo.APY}</TableCell>
          <TableCell>{rowsInfo.planName}</TableCell>
          <TableCell>{rowsInfo.level == 1 ? rowsInfo.rewardforlevelthree : rowsInfo.level == 2 ? rowsInfo.bonusforlevelthree : "0"}</TableCell>
          <TableCell>{Number(rowsInfo.pending).toFixed(2)}</TableCell>
          <TableCell>{rowsInfo.stakedpool.length}</TableCell>
          <TableCell>{rowsInfo.refferals.length}</TableCell>
          <TableCell>{rowsInfo.level == 3 ? "NOT APPLICABLE" : countdown(rowsInfo.time)}</TableCell>
        </TableRow>
      </>
    );
  };

  // console.log("events",user)

 

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Container maxWidth="lg">
        <AdminNav account={account}/>
        <p>Stakers Details</p>
        <TableContainer sx={{ maxHeight: 440 }}>
         { user ? <Table stickyHeader aria-label="sticky table">
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
            <TableBody>{user.map((res)=>renderRows(res, user.indexOf(res)))}</TableBody>
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
      <Toaster />
    </Paper>
  );
}
