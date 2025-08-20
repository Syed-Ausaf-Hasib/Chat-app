import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Buffer } from "buffer";
import { setAvatarRoute } from "../utils/APIRoutes";
import { RefreshCcw } from "lucide-react";

function SetAvatar() {
  const api = "https://api.dicebear.com/7.x/bottts/svg?seed=";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const [refresher, setRefresher] = useState(false);

  const toastOptions = useMemo(() => ({
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  }), []);

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  }, [navigate]);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = JSON.parse(localStorage.getItem("chat-app-user"));

      try {
        const { data } = await axios.post(
          `${setAvatarRoute}/${user._id}`,
          { image: avatars[selectedAvatar] }
        );

        if (data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
          localStorage.setItem("chat-app-user", JSON.stringify(user));
          navigate("/");
        } else {
          toast.error("Error setting avatar. Please try again.", toastOptions);
        }
      } catch (err) {
        toast.error("Server error. Please try again.", toastOptions);
      }
    }
  };

  useEffect(() => {
    const fetchAvatars = async () => {
      const data = [];
      for (let i = 0; i < 5; i++) {
        const response = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
        const buffer = Buffer.from(response.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    };

    fetchAvatars();
  }, [refresher]);

  return (
    <>
      {
        isLoading ? (
          <Container>
            <div className="chat-loader">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </Container>
        ) : (
          <Container>
            <div className="title-container">
              <h1>
                Pick an Avatar as your profile picture
              </h1>
              {/* <br /> */}
              {/* <h3>Refresh for more options</h3> */}
            </div>
            <div className="avatars">
              {
                avatars.map((avatar, index) => {
                  return (
                    <div
                      key={index}
                      className={`avatar ${
                        selectedAvatar === index ? "selected" : ""
                      }`}
                    >
                      <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={() => setSelectedAvatar(index)} />
                    </div>
                  )
                })
              }
            </div>
            <div className="actions">
              <RefreshCcw className='refresh' onClick={()=>setRefresher(!refresher)}/> 
              <button className='submit-btn' onClick={setProfilePicture}>Set as Profile Picture</button>
            </div>
          </Container>
        )
      }
      <ToastContainer />
    </>
  )
}

export default SetAvatar;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #2a1d16; /* Deep dark brown */
  height: 100vh;
  width: 100vw;

  .chat-loader {
    display: flex;
    gap: 5rem;
  }

  .chat-loader span {
    display: block;
    width: 80px;
    height: 80px;
    background-color: #f5b039;
    border-radius: 50%;
    animation: bounce 0.6s infinite alternate;
  }

  .chat-loader span:nth-child(2) {
    animation-delay: 0.2s;
  }

  .chat-loader span:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes bounce {
    to {
      opacity: 0.3;
      transform: translateY(-6px);
    }
  }

  .title-container {
   display : flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1 {
      color: #f5b039; /* Gold accent */
      user-select: none;
      cursor: default;
    }
      h3{
      color: #f5b039; /* Gold accent */
      user-select: none;
      cursor: default;
      margin-bottom: -1rem;
      }
  }

  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: border-color 0.3s ease, transform 0.3s ease;
      cursor: pointer;

      img {
        height: 6rem;
        transition: transform 0.3s ease;
      }

      &:hover {
        border: 0.4rem solid #f5b039; /* Gold hover border */
        transform: scale(1.05); /* Slight zoom on hover */
      }
    }

    .selected {
      border: 0.4rem solid #f5b039; /* Gold selected border */
    }
  }
    .actions{
      display: flex;
      gap: 1rem;
    }
  .refresh{
    width: 3rem;
    height: 3rem;
    font-size: 1rem;
    background-color: #a67c52; /* Warm brown */
    color: #fff8dc; /* Off-white text */
    border: none;
    padding: 0.4rem;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    text-transform: uppercase;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
      background-color: #f5b039; /* Gold hover */
      color: #1a1410; /* Dark text on gold */
    }
  }

  .submit-btn {
    background-color: #a67c52; /* Warm brown */
    color: #fff8dc; /* Off-white text */
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
      background-color: #f5b039; /* Gold hover */
      color: #1a1410; /* Dark text on gold */
    }
  }
`;
