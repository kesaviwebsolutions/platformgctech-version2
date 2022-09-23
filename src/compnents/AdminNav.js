import React, { useEffect, useState } from "react";
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
import { Link } from "react-router-dom";
import { getOwner } from "../Web3/Web3";

export default function AdminNav({account}) {
  const [showBasic, setShowBasic] = useState(false);
  const [active, setActive] = useState();

  useEffect(()=>{
    const init=async()=>{
      const own = await getOwner()
      setActive(own)
    }
    init()
  },[])

  // console.log(account, active, active == account)
 
  return (
    <MDBNavbar expand="lg" light bgColor="transparent" className="adminnav">
      <MDBContainer>
        {/* <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler> */}

        <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
          <>
            <Link
              id="link"
              to="/admin/staker's-detail"
              className={
                window.location.pathname === "/admin/staker's-detail"
                  ? "active"
                  : ""
              }
            >
              Staker's Details
            </Link>
           
            <Link
              id="link"
              to="/admin/create-level"
              className={
                window.location.pathname === "/admin/create-level"
                  ? "active"
                  : ""
              }
            >
              Create Level
            </Link>
            <Link
              id="link"
              to="/admin/see-level"
              className={
                window.location.pathname === "/admin/see-level"
                  ? "active"
                  : ""
              }
            >
              See Level
            </Link>
      { active && active == account ? <Link
              id="link"
              to="/admin/pool"
              className={
                window.location.pathname === "/admin/referral-id"
                  ? "active"
                  : ""
              }
            >
             Add Pool
            </Link> : ''}
          </>
        </MDBNavbarNav>
      </MDBContainer>
    </MDBNavbar>
  );
}
