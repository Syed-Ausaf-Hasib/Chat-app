import React from 'react'
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { BiPowerOff } from "react-icons/bi"

function Logout() {
    const navigate = useNavigate();
    const handleClick = async ()=>{
        localStorage.clear()
        navigate("/login")
    }
    return (
        <Button onClick={handleClick}>
            <BiPowerOff/>
        </Button>    
    )
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #2a1d16;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #f5b039;
  }
    &:hover{
      background-color: #f5b039;
      svg {
        color: #2a1d16;
      }
      transition: background-color 0.3s ease, color 0.3s ease-in-out;
    }
`;

export default Logout
