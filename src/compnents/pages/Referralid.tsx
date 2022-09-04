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
import { Link } from "react-router-dom";

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
    label: "Referrer ID",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toFixed(2),
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
    label: "Time of Stake",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "density",
    label: "NO. of Tokens Staked",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "density",
    label: "Length of Stake",
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
    label: "Referrer Bonus",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "density",
    label: "No. of Tokens in Bonus",
    minWidth: 200,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "density",
    label: "Due Date",
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

const renderRows = (rowsInfo, index) => {
  return (
    <>
      <TableRow key={index}>
        <TableCell>{rowsInfo.tablecell}</TableCell>
        <TableCell>
          <Link to="/">{rowsInfo.Referrallink}</Link>
        </TableCell>
        <TableCell>{rowsInfo.txhash}</TableCell>
        <TableCell>{rowsInfo.timeofstake}</TableCell>
        <TableCell>{rowsInfo.nooftokenstaked}</TableCell>
        <TableCell>{rowsInfo.lengthofstake}</TableCell>
        <TableCell>{rowsInfo.APY}</TableCell>
        <TableCell>{rowsInfo.referrerbonus}</TableCell>
        <TableCell>{rowsInfo.nooftokensinbonus}</TableCell>
        <TableCell>{rowsInfo.duedate}</TableCell>
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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
    </Paper>
  );
}
