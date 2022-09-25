import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBCardImage,
} from "mdb-react-ui-kit";
import meta from "../images/meta.png";
import connect from "../images/connect.svg";
import logo from "../images/e2bc39a2d59c627c24ff83406d75d1a6.png";
import { getAdmin } from "../Web3/Web3";
import { Link } from "react-router-dom";

export default function App({ Metamask, account, contractadmin }) {
  const [showBasic, setShowBasic] = useState(false);
  const [active, setActive] = useState(1);

  const slicewallet = (add) => {
    const first = add.slice(0, 5);
    const second = add.slice(37);
    return first + "..." + second;
  };

  return (
    <MDBNavbar expand="lg" light bgColor="transparent">
      <MDBContainer fluid>
        <MDBNavbarBrand href="#">
          <img src={logo} style={{ width: "90px" }} />
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0 justify-content-center">
            {/* <MDBNavbarItem onClick={() => setActive(1)}>
              <MDBNavbarLink
                aria-current="page"
                href="/"
                className={window.location.pathname == "/" ? "active" : ""}
              >
                HOME
              </MDBNavbarLink>
            </MDBNavbarItem> */}
            <>
              <Link
                id="link"
                onClick={() => setActive(1)}
                to="/"
                className={window.location.pathname === "/" ? "active" : ""}
              >
                HOME
              </Link>

              {(account && account != contractadmin) ||
              account != "0xD9E0f712652589584B035Db1cb44A79F2eA2389F" ||
              account != "0x149b65e2EB31c196F9C2407E0A88a9cF1F71bd35" ||
              account != "0xdBd21416Da1207Bfb66BDf3baBE16538f112b706" ||
              account != "0x9929BbE55e79cAC1003Dc4c9cD2e911CbaAd532D" ? (
                <>
                  <Link
                    onClick={() => setActive(2)}
                    id="link"
                    to="/admin"
                    className={
                      window.location.pathname === "/admin" ? "active" : ""
                    }
                  >
                    ADMIN
                  </Link>
                  <Link
                    id="link"
                    onClick={() => setActive(3)}
                    to="/staking"
                    className={
                      window.location.pathname === "/staking" ? "active" : ""
                    }
                  >
                    STAKING
                  </Link>
                </>
              ) : (
                ""
              )}
            </>
          </MDBNavbarNav>
          <button
            type="button"
            className="connectButton mx-3"
            onClick={() => Metamask()}
          >
            {account ? slicewallet(account) : "Connect Wallet"}
          </button>
          <button className="connectButton" type="button">
            BUY GCS
          </button>

          {/* <div className="dropdown">
            <button
              className="dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              xaddd..tr
            </button>
            <ul
              className="dropdown-menu disconnect"
              aria-labelledby="dropdownMenuButton"
            >
              <li>Disconnect</li>
            </ul>
          </div> */}
        </MDBCollapse>
      </MDBContainer>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className=" modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title ms-auto fw-bold"
                id="exampleModalLabel"
              >
                Please Connect Your Wallet
              </h5>
              <button
                type="button"
                className="btn-close"
                data-mdb-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body d-flex justify-content-evenly align-items-center">
              <MDBCardImage
                src={meta}
                position="top"
                alt="..."
                style={{ width: "100px", cursor: "pointer" }}
              />
              <MDBCardImage
                src={connect}
                position="top"
                alt="..."
                style={{ width: "70px", cursor: "pointer" }}
              />
            </div>
            {/* <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-mdb-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </MDBNavbar>
  );
}
