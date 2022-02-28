import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";
import firebase from "../../../config/base";
import { useRouter } from "next/router";

const TopBarDark = ({ topClass, fluid }) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [name, setName] = useState('My Account');
  const firebaseLogout = () => {
    window.localStorage.removeItem('user-details');
    router.push("page/account/login");
  };
  useEffect(() => {
    let userData = window.localStorage.getItem('user-details');
    if(!!userData){
      setShow(true);
      let user = JSON.parse(userData);
      setName(user.firstname+' '+user.lastname)
    }
  },[])
  return (
    <div className={topClass}>
      <Container fluid={fluid}>
        <Row>
          <Col lg="6">
            <div className="header-contact">
              <ul>
                <li>Welcome to Our store Multikart</li>
                <li>
                  <i className="fa fa-phone" aria-hidden="true"></i>Call Us: 123
                  - 456 - 7890
                </li>
              </ul>
            </div>
          </Col>
          <Col lg="6" className="text-right">
            <ul className="header-dropdown">
              <li className="mobile-wishlist">
                <Link href="/page/account/wishlist">
                  <a>
                    <i className="fa fa-heart" aria-hidden="true"></i> wishlist
                  </a>
                </Link>
              </li>
              <li className="onhover-dropdown mobile-account">
                <i className="fa fa-user" aria-hidden="true"></i> {name}
                <ul className="onhover-show-div">
                  {!show && <><li>
                    <Link href={`/page/account/login`}>
                      <a>Login</a>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/page/account/register`}>
                      <a>Register</a>
                    </Link>
                  </li></>}
                  {show && <>
                    <li>
                      <Link href={`/page/account/dashboard`}>
                        <a>Dashboard</a>
                      </Link>
                    </li>
                    <li onClick={() => firebaseLogout()}>
                      Logout
                    </li>
                  </>}
                </ul>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopBarDark;
