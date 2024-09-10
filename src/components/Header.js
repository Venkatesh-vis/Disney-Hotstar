import React, { useEffect, useState } from "react";
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

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector(selectUserName);
  const userphoto = useSelector(selectUserPhoto);
  const [guestMode, setGuestMode] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        navigate("/home");
      }
    });
    return () => unsubscribe(); 
  }, [username, navigate]);

  const handleAuth = () => {
    if (!username) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          setUser(result.user);
          console.log(result);
        })
        .catch((error) => {
          console.error("Error signing in with Google:", error);
        });
    } else {
      auth.signOut().then(() => {
        dispatch(SetSignOutState());
        navigate("/");
      }).catch((err) => alert(err.message));
    }
  };

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  const guest = () => {
    setGuestMode(true);
    navigate("/home");
  };

  return (
    <Nav>
      <Logo>
        <img src="/images/logo.svg" alt="logo" />
      </Logo>
      <NavMenu>
        {/* Hide "Continue as Guest" if user is logged in or guest mode is active */}
        {!guestMode && !username && (
          <ContinueAsGuest onClick={guest}>Continue as Guest</ContinueAsGuest>
        )}

        {/* Hide "Login" button if the user is already logged in */}
        {!username && (
          <Login onClick={handleAuth}>Login</Login>
        )}

        {username && (
          <>
            <SignOut
              onMouseEnter={() => setDropdownVisible(true)}
              onMouseLeave={() => setDropdownVisible(false)}
            >
              <UserImg src={userphoto} alt={username} />
              {isDropdownVisible && (
                <Dropdown>
                  <span onClick={handleAuth}>Sign Out</span>
                </Dropdown>
              )}
            </SignOut>
            <h1 style={{ letterSpacing: "2px" }}>{username}</h1>
          </>
        )}
      </NavMenu>
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
  justify-content: flex-start;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-left: 25px;
`;

const ContinueAsGuest = styled.button`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  margin-right: 10px;
  cursor: pointer;
  color: #f9f9f9;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const Login = styled.button`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  cursor: pointer;
  color: #f9f9f9;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const UserImg = styled.img`
  height: 50%;
  border-radius: 50%;
`;

const SignOut = styled.div`
  position: relative;
  text-align: center;
  height: 40px;
  width: 40px;
  font-weight: bold;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 40px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgba(0 0 0 / 50%) 0px 0px 10px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 0px;
  width: 100px; // Default width
`;

export default Header;
