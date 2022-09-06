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
import { OrderIDdata,GetPendingRewards } from "../Web3/Web3";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

// const url = "https://refer.ap.ngrok.io";
const url = "http://localhost:3030";
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
    label: "Tx Hash",
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
    label: "APY(%)",
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
    label: "Claimed Reward",
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
const renderRows = (rowsInfo, index) => {
  return (
    <>
      <TableRow key={index}>
        <TableCell>{rowsInfo.tablecell}</TableCell>
        <TableCell>{rowsInfo.walletaddress}</TableCell>
      
        <TableCell>
          {" "}
          <Link to="/">{rowsInfo.referralid}</Link>
        </TableCell>
        <TableCell>{rowsInfo.txhash}</TableCell>
        <TableCell>{rowsInfo.timeofstake}</TableCell>
        <TableCell>{rowsInfo.periodofstaking}</TableCell>
        <TableCell>{rowsInfo.levelofstaker}</TableCell>
        <TableCell>{rowsInfo.APY}</TableCell>
        <TableCell>{rowsInfo.pendingreward}</TableCell>
        <TableCell>{rowsInfo.claimedreward}</TableCell>
        <TableCell>{rowsInfo.noofreferrals}</TableCell>
      </TableRow>
    </>
  );
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

export default function StakingTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [user, setUser] = useState([])

  const handleChangePage = (e: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  useEffect(() => {
    const events = []
    const data = Object();
    axios.get(`${url}/users`).then(async(res)=>{
      for(let i = 0; i < res.data.length; i++){
        const length  = res.data[i].IDs.length
        for(let x = 0; x < Number(length); i++){
          
          // const data = await OrderIDdata(res.data[i].IDs[x]);
          // const pending  = await GetPendingRewards(res.data[i].IDs[x])
          // data.pending = pending
          // events.push(data)
        }
      }
      console.log("events",events)
    })
  }, [])
  


  const copytext = (text)=>{
    navigator.clipboard.writeText(text)
    notify("Copied")
  }

  const slicewallet = (add) => {
    const first = add.slice(0, 6);
    const second = add.slice(35);
    return first + "..." + second;
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Container maxWidth="lg">
        <AdminNav />
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
            <TableBody>{rowsInfo.map(renderRows)}</TableBody>
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
