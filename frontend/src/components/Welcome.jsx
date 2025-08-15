import React from 'react'
import styled from "styled-components"
import Robot from "../assets/robot.gif"

function Welcome({ currentUser }) {
  console.log("Welcome component received currentUser:", currentUser);

  return (
    <Container>
        <img src={Robot} alt="Robot" />
        {currentUser ? (
          <>
            <h1>
              Welcome, <span>{currentUser.username}</span>
            </h1>
            <h3>Please select a chat</h3>
          </>
        ) : (
          <h1>Loading...</h1>
        )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  background-color: rgba(59, 40, 30, 0.3); /* Deep dark brown, slightly transparent */
  img {
    height: 20rem;
  }
  span {
    color: #f5b039;
  }
`;

export default Welcome;
