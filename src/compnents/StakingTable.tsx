import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Container } from "@mui/system";
import { Box, Typography } from "@mui/material";

//.......STAKER'S DETAIL..........

const columns: GridColDef[] = [
  { field: "sno", headerName: "SNO.", width: 70, align: "center" },
  {
    field: "wallet address",
    headerName: "Wallet Address",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "username",
    headerName: "Username",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "referral id",
    headerName: "Referral ID",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "tx hash",
    headerName: "Tx Hash",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "timestamp of stake",
    headerName: "Timestamp of stake",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "fperiod of staking",
    headerName: "Period of staking",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "no. of tokens staked",
    headerName: "No. of tokens staked",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "level of staker",
    headerName: "Level of staker",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "apy(%)",
    headerName: "APY(%)",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "pending reward",
    headerName: "Pending Reward",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "claimed reward",
    headerName: "Claimed Reward",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "no. of referrals",
    headerName: "NO. of Referrals",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

// .......REFFER DETAILS...........

const columns2: GridColDef[] = [
  { field: "sno", headerName: "SNO.", width: 70 },

  {
    field: "referrer id",
    headerName: "Referrer ID",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "tx hash",
    headerName: "Tx Hash",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "time of stake",
    headerName: "Time of Stake",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "no. of tokens staked",
    headerName: "No. of tokens staked",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "length of stake",
    headerName: "Length of Stake",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "apy",
    headerName: "APY",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "referrer bonus",
    headerName: "Referrer Bonus",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "no. of in bonus",
    headerName: "No. of Token In Bonus",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "due date",
    headerName: "Due Date",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "action",
    headerName: "Action",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
];
const rows2 = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
];

export default function StakingTable() {
  return (
    <>
      <Container maxWidth="lg">
        <Box style={{ width: "100%", marginTop: "50px" }}>
          <Typography variant="h4">Staker's Detail</Typography>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "50px" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      </Container>
      <Container maxWidth="lg">
        <Box style={{ width: "100%", marginTop: "50px" }}>
          <Typography variant="h4">Referrer Detail</Typography>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "50px" }}>
          <DataGrid
            rows={rows2}
            columns={columns2}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      </Container>
    </>
  );
}
