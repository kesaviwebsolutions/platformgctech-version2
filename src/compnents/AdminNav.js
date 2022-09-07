import React, { useState } from "react";
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

export default function AdminNav() {
  const [showBasic, setShowBasic] = useState(false);
  const [active, setActive] = useState(1);

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
              onClick={() => setActive(1)}
              to="/admin/staker's-detail"
              className={
                window.location.pathname === "/admin/staker's-detail"
                  ? "active"
                  : ""
              }
            >
              Staker's Details
            </Link>
            {/* <Link
              id="link"
              onClick={() => setActive(1)}
              to="/admin/referral-id"
              className={
                window.location.pathname === "/admin/referral-id"
                  ? "active"
                  : ""
              }
            >
              Referral Details
            </Link> */}
            <Link
              id="link"
              onClick={() => setActive(1)}
              to="/admin/create-level"
              className={
                window.location.pathname === "/admin/create-level"
                  ? "active"
                  : ""
              }
            >
              Create Level
            </Link>
          </>
        </MDBNavbarNav>
      </MDBContainer>
    </MDBNavbar>
  );
}
