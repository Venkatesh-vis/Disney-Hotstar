import styled from "styled-components";
import { useState } from "react";
import "./Toast.css"; 

const Login = () => {
  const [visible, setVisible] = useState(false);

  const showToast = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 5000);
  };

  return (
    <Container>
      <Content>
        <CTA>
          <CTALogoOne src="/images/cta-logo-one.svg" alt="logo1" />
          <Signup onClick={showToast}>GET ALL THERE</Signup>
          <Description>
            Get Premier Access to all the Movies and series with a Disney+
            subscription. As of 25/07/2024, the price of Disney+ and The Disney
            Bundle will increase by ₹100.
          </Description>
          <CTALogoTwo src="/images/cta-logo-two.png" alt="logo2"></CTALogoTwo>
        </CTA>
        <BgImage />

        <div id="toast" className={`info ${visible ? "show" : ""}`}>
          <div id="icon-wrapper">
            <div id="icon"></div>
          </div>
          <div id="toast-message">
            <h4>Please Login / Continue as Guest</h4>
           
          </div>
          <button id="toast-close" onClick={() => setVisible(false)}></button>
          <div id="timer" className={visible ? "timer-animation" : ""}></div>
        </div>
      </Content>
    </Container>
  );
};

const Container = styled.section`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
`;

const Content = styled.div`
  margin-bottom: 10vw;
  width: 100%;
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 80px 40px;
  height: 100%;
`;

const BgImage = styled.div`
  height: 100%;
  background-position: top;
  background-image: url("/images/login-background.jpg");
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: -1;
  background-size: cover;
  background-repeat: no-repeat;
`;

const CTA = styled.div`
  max-width: 650px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CTALogoOne = styled.img`
  margin-bottom: 12px;
  max-width: 600px;
  min-height: 1px;
  display: block;
  width: 100%;
`;

const Signup = styled.a`
  font-weight: bold;
  color: #f9f9f9;
  background-color: #0063e5;
  margin-bottom: 12px;
  width: 100%;
  letter-spacing: 1.5px;
  font-size: 18px;
  padding: 16.5px;
  border: 1px solid transparent;
  border-radius: 4px;
  &:hover {
    background-color: #0483ee;
    cursor: pointer;
  }
`;

const Description = styled.p`
  color: hsl(0, 0%5.3%, 1);
  font-size: 11px;
  margin: 0 0 24px;
  line-height: 1.5;
  letter-spacing: 1.5px;
`;

const CTALogoTwo = styled.img`
  max-width: 600px;
  margin-bottom: 20px;
  display: inline-block;
  vertical-align: bottom;
  width: 100%;
`;

export default Login;
