import React from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { Container } from "@material-ui/core";

export default function Staking() {
  return (
    <>
      <Container maxWidth="xl">
        <MDBTable align="middle">
          <MDBTableHead>
            <tr>
              <th scope="col">Serial no</th>
              <th scope="col">Wallet address</th>
              <th scope="col">Transaction #</th>
              <th scope="col">No. of Token Staking</th>
              <th scope="col">Period of Staking</th>
              <th scope="col">APY Annual</th>
              <th scope="col">Pending reward</th>
              <th scope="col">Claim reward</th>
              <th scope="col">No. of Bonus</th>
              <th scope="col">Referral bonus</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                    alt=""
                    style={{ width: "45px", height: "45px" }}
                    className="rounded-circle"
                  />
                  <div className="ms-3">
                    <p className="fw-bold mb-1">John Doe</p>
                    <p className="text-muted mb-0">john.doe@gmail.com</p>
                  </div>
                </div>
              </td>
              <td>
                <p className="fw-normal mb-1">Software engineer</p>
                <p className="text-muted mb-0">IT department</p>
              </td>
              <td>
                <MDBBadge color="success" pill>
                  Active
                </MDBBadge>
              </td>
              <td>Senior</td>
              <td>
                <MDBBtn color="link" rounded size="sm">
                  Edit
                </MDBBtn>
              </td>
              <td>
                <MDBBtn color="link" rounded size="sm">
                  Edit
                </MDBBtn>
              </td>
              <td>
                <MDBBtn color="link" rounded size="sm">
                  Edit
                </MDBBtn>
              </td>
              <td>
                <MDBBtn color="link" rounded size="sm">
                  Edit
                </MDBBtn>
              </td>
              <td>
                <MDBBtn color="link" rounded size="sm">
                  Edit
                </MDBBtn>
              </td>
              <td>
                <MDBBtn color="link" rounded size="sm">
                  Edit
                </MDBBtn>
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src="https://mdbootstrap.com/img/new/avatars/6.jpg"
                    alt=""
                    style={{ width: "45px", height: "45px" }}
                    className="rounded-circle"
                  />
                  <div className="ms-3">
                    <p className="fw-bold mb-1">Alex Ray</p>
                    <p className="text-muted mb-0">alex.ray@gmail.com</p>
                  </div>
                </div>
              </td>
              <td>
                <p className="fw-normal mb-1">Consultant</p>
                <p className="text-muted mb-0">Finance</p>
              </td>
              <td>
                <MDBBadge color="primary" pill>
                  Onboarding
                </MDBBadge>
              </td>
              <td>Junior</td>
              <td>
                <MDBBtn color="link" rounded size="sm">
                  Edit
                </MDBBtn>
              </td>
              <td>
                <MDBBtn color="link" rounded size="sm">
                  Edit
                </MDBBtn>
              </td>
              <td>
                <MDBBtn color="link" rounded size="sm">
                  Edit
                </MDBBtn>
              </td>
              <td>
                <MDBBtn color="link" rounded size="sm">
                  Edit
                </MDBBtn>
              </td>
              <td>
                <MDBBtn color="link" rounded size="sm">
                  Edit
                </MDBBtn>
              </td>
              <td>
                <MDBBtn color="link" rounded size="sm">
                  Edit
                </MDBBtn>
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src="https://mdbootstrap.com/img/new/avatars/7.jpg"
                    alt=""
                    style={{ width: "45px", height: "45px" }}
                    className="rounded-circle"
                  />
                  <div className="ms-3">
                    <p className="fw-bold mb-1">Kate Hunington</p>
                    <p className="text-muted mb-0">kate.hunington@gmail.com</p>
                  </div>
                </div>
              </td>
              <td>
                <p className="fw-normal mb-1">Designer</p>
                <p className="text-muted mb-0">UI/UX</p>
              </td>
              <td>
                <MDBBadge color="warning" pill>
                  Awaiting
                </MDBBadge>
              </td>
              <td>Senior</td>
              <td>
                <MDBBtn color="link" rounded size="sm">
                  Edit
                </MDBBtn>
              </td>
              <td>
                <MDBBadge color="warning" pill>
                  Awaiting
                </MDBBadge>
              </td>
              <td>
                <MDBBadge color="warning" pill>
                  Awaiting
                </MDBBadge>
              </td>
              <td>
                <MDBBadge color="warning" pill>
                  Awaiting
                </MDBBadge>
              </td>
              <td>
                <MDBBadge color="warning" pill>
                  Awaiting
                </MDBBadge>
              </td>
              <td>
                <MDBBadge color="warning" pill>
                  Awaiting
                </MDBBadge>
              </td>
            </tr>
          </MDBTableBody>
        </MDBTable>
      </Container>
    </>
  );
}
