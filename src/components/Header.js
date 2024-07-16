// src/components/Header.js

import React, { useEffect } from "react";
import styled from "styled-components";
import { auth, provider } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectUserName,
  selectUserPhoto,
  SetSignOutState,
  setUserLoginDetails,
} from "../features/user/userSlice";

const Header = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector(selectUserName);
  const userphoto = useSelector(selectUserPhoto);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        navigate("/home");
      }
    });
  }, [username]);

  const handleAuth = () => {
    if(!username){
    auth
      .signInWithPopup(provider)
      .then((result) => {
        setUser(result.user);
        console.log(result);
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
      });
  }
  else if (username){
    auth.signOut().then(() => {
      dispatch(SetSignOutState())
      navigate("/")
    }
  )
.catch((err)=> alert(err.message))}
}

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  return (
    <Nav>
      <Logo>
        <img src="/images/logo.svg" alt="logo" />
      </Logo>
      {!username ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
        <h1 style={{letterSpacing:"2px"}}>Welcome {username} </h1>
          <SignOut>
            <UserImg src={userphoto} alt={username} />
            <Dropdown>
              <span onClick={handleAuth}>Sign Out</span>
            </Dropdown>
          </SignOut>
        </>
      )}
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;
`;

const NavItem = styled.a`
  display: flex;
  align-items: center;
  padding: 0 12px;

  img {
    height: 20px;
    min-width: 20px;
    width: 20px;
  }

  span {
    color: rgb(249, 249, 249);
    font-size: 13px;
    letter-spacing: 1.42px;
    line-height: 1.08;
    padding: 2px 0px;
    white-space: nowrap;
    position: relative;
    margin-top: 5px;
    margin-left: 3px;
  }
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
    cursor: pointer;
  }
`;

const UserImg = styled.img`
  height: 50%;
  border-radius: 50%;
`;

const Dropdown = styled.div`
position: absolute;
top: 40px;
right: 0px;
background: rgb(19,19,19);
border: 1px solid rgba(151, 151, 151, 0.34 );
border-radius: 4px;
box-shadow: rgba(0 0 0 / 50%) 0px 0px 10px 0px;
padding: 10px;
font-size: 14px;
letter-spacing: 0px;
width: 100px;
opacity: 0;
text-align: center;
`;

const SignOut = styled.div`
position: relative;
height: 40px;
width: 40px;
cursor: pointer;
align-items: center;
justify-content: center;
display: flex;

${UserImg} {
  border-radius: 50%;
  width: 100%;
  height: 100%;
}
&:hover {
  ${Dropdown} {
    opacity: 1;
    transition-duration: 1s;
    background-color: white;
    color: black;
    font-weight: bold;
    font-size: 15px;
  }
}
`;

export default Header;
