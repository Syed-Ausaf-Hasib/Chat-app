import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate("/");
    }
  }, [navigate]); // added navigate here

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      setLoading(true); // Set loading before API call
      const { email, username, password } = values;
      try {
        const { data } = await axios.post(registerRoute, {
          username,
          email,
          password,
        });

        if (data.status === false) {
          setLoading(false); // Only unset loading on error
          toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
          localStorage.setItem('chat-app-user', JSON.stringify(data.user));
          navigate("/");
        }
      } catch (err) {
        setLoading(false);
        toast.error("Server error. Please try again.", toastOptions);
      }
    }
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same.", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters.", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be equal or greater than 8 characters.", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <img draggable={false} src={Logo} alt="Logo" />
            <h1>Talksy</h1>
          </div>
          <input type="text" placeholder='Username' name='username' onChange={handleChange} />
          <input type="email" placeholder='Email' name='email' onChange={handleChange} />
          <input type="password" placeholder='Password' name='password' onChange={handleChange} />
          <input type="password" placeholder='Confirm Password' name='confirmPassword' onChange={handleChange} />
          <button disabled={loading} type='submit'>{loading? 'Creating...' : 'Create User'}</button>
          <span>Already have an account? <Link to="/login">Login</Link></span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #2a1d16; /* Deep dark brown */

  h1{
   cursor: default;
   user-select: none;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: #f5b039; /* Gold accent */
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #120e0bff; /* Transparent rich brown */
    border-radius: 2rem;
    padding: 3rem 5rem;
    padding-top: 2.5rem;
  }

  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #a67c52; /* Warm brown border */
    border-radius: 0.4rem;
    color: #f5f2e7; /* Light cream text */
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #f5b039; /* Gold focus */
      outline: none;
    }
    &:hover{
     border: 0.1rem solid #f5b039; /* Gold hover */
     transition: border-color 0.3s ease;
    }
  }

  button {
    background-color: #a67c52; /* Warm brown */
    color: #fff8dc; /* Off-white text */
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #f5b039; /* Gold hover */
      color: #1a1410; /* Dark text on gold */
    }
  }

  span {
    color: #f5f2e7; /* Light cream text */
    text-transform: uppercase;
    a {
      color: #f5b039; /* Gold accent links */
      text-decoration: none;
      font-weight: bold;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export default Register;
