import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Grid } from "@mui/material";
import { MDBBadge } from "mdb-react-ui-kit";
import { BiLineChartDown, BiLineChart } from "react-icons/bi";
import { Container } from "@mui/system";

export default function Main({
  gcsmaketcap,
  gcstousd,
  gcsusdm,
  xaustousd,
  xausmk,
  usdmtousdt,
  usdmmarketcap,
  xaustogcs,
  xaustousdm,
}) {
  return (
    <>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          sx={{ marginTop: "20px", padding: "10px 20px" }}
        >
          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>GCS Market Cap</MDBCardTitle>
                <h4
                  style={{
                    fontWeight: " 500",
                    color: "#000000",
                    fontSize: "20px",
                  }}
                >
                  ${gcsmaketcap}
                  <MDBBadge color="success" className="mx-2">
                    {/* <MDBIcon fas icon="chart-line" /> 70.32% */}
                  </MDBBadge>
                </h4>
              </MDBCardBody>
            </MDBCard>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>USDM Market Cap</MDBCardTitle>{" "}
                <h4
                  style={{
                    fontWeight: " 500",
                    color: "#000000",
                    fontSize: "20px",
                  }}
                >
                  ${Number(usdmmarketcap).toFixed(0)}
                  <MDBBadge color="danger" className="mx-2">
                    {/* <MDBIcon fas icon="chart-line" /> 27.02% */}
                  </MDBBadge>
                </h4>
              </MDBCardBody>
            </MDBCard>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>XAUS Market Cap</MDBCardTitle>
                <h4
                  style={{
                    fontWeight: " 500",
                    color: "#000000",
                    fontSize: "20px",
                  }}
                >
                  ${xausmk}
                  <MDBBadge color="danger" className="mx-2">
                    {/* <MDBIcon fas icon="chart-line" /> 9.00% */}
                  </MDBBadge>
                </h4>
              </MDBCardBody>
            </MDBCard>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>USDM TO GCS</MDBCardTitle>
                <h4
                  style={{
                    fontWeight: " 500",
                    color: "#000000",
                    fontSize: "20px",
                  }}
                >
                  {Number(1/gcsusdm).toFixed(5)}
                  <MDBBadge color="success" className="mx-2">
                    {/* <MDBIcon fas icon="chart-line" /> 70.32% */}
                  </MDBBadge>
                </h4>
              </MDBCardBody>
            </MDBCard>
          </Grid>

        </Grid>
        <Grid
          container
          spacing={2}
          sx={{ marginTop: "20px", padding: "10px 20px" }}
        >
          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>XAUS TO USDT</MDBCardTitle>{" "}
                <h4
                  style={{
                    fontWeight: " 500",
                    color: "#000000",
                    fontSize: "20px",
                  }}
                >
                  ${xaustousd}
                  <MDBBadge color="success" className="mx-2">
                    {/* <BiLineChart size={20}/> 59.32% */}
                  </MDBBadge>
                </h4>
              </MDBCardBody>
            </MDBCard>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>USDM TO USDT</MDBCardTitle>
                <h4
                  style={{
                    fontWeight: " 500",
                    color: "#000000",
                    fontSize: "20px",
                  }}
                >
                  ${usdmtousdt}
                  <MDBBadge color="success" className="mx-2">
                    {/* <BiLineChart size={20}/> 70.32% */}
                  </MDBBadge>
                </h4>
              </MDBCardBody>
            </MDBCard>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>GCS TO USDT</MDBCardTitle>
                <h4
                  style={{
                    fontWeight: " 500",
                    color: "#000000",
                    fontSize: "20px",
                  }}
                >
                  ${gcstousd}
                  <MDBBadge color="danger" className="mx-2">
                    {/* <BiLineChartDown size={20}/> 27.02% */}
                  </MDBBadge>
                </h4>
              </MDBCardBody>
            </MDBCard>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>XAUS TO GCS</MDBCardTitle>{" "}
                <h4
                  style={{
                    fontWeight: " 500",
                    color: "#000000",
                    fontSize: "20px",
                  }}
                >
                  {Number(xaustogcs).toFixed(5)}
                  <MDBBadge color="success" className="mx-2">
                    {/* <BiLineChart size={20}/> 70.32% */}
                  </MDBBadge>
                </h4>
              </MDBCardBody>
            </MDBCard>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{ marginTop: "20px", padding: "10px 20px" }}
        >
          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>GCS TO USDM</MDBCardTitle>{" "}
                <h4
                  style={{
                    fontWeight: " 500",
                    color: "#000000",
                    fontSize: "20px",
                  }}
                >
                  {Number(gcsusdm).toFixed(5)}
                  <MDBBadge color="success" className="mx-2">
                    {/* <BiLineChart size={20}/> 59.32% */}
                  </MDBBadge>
                </h4>
              </MDBCardBody>
            </MDBCard>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>GCS TO XAUS</MDBCardTitle>{" "}
                <h4
                  style={{
                    fontWeight: " 500",
                    color: "#000000",
                    fontSize: "20px",
                  }}
                >
                  {Number(1 / xaustogcs).toFixed(5)}
                  <MDBBadge color="success" className="mx-2">
                    {/* <BiLineChart size={20}/> 70.32% */}
                  </MDBBadge>
                </h4>
              </MDBCardBody>
            </MDBCard>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>USDM TO XAUS</MDBCardTitle>
                <h4
                  style={{
                    fontWeight: " 500",
                    color: "#000000",
                    fontSize: "20px",
                  }}
                >
                  {Number(1 / xaustousdm).toFixed(5)}
                  <MDBBadge color="danger" className="mx-2">
                    {/* <BiLineChartDown size={20}/> 27.02% */}
                  </MDBBadge>
                </h4>
              </MDBCardBody>
            </MDBCard>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>XAUS TO USDM</MDBCardTitle>
                <h4
                  style={{
                    fontWeight: " 500",
                    color: "#000000",
                    fontSize: "20px",
                  }}
                >
                  {Number(xaustousdm).toFixed(5)}
                  <MDBBadge color="danger" className="mx-2">
                    {/* <BiLineChartDown size={20}/> 27.02% */}
                  </MDBBadge>
                </h4>
              </MDBCardBody>
            </MDBCard>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
