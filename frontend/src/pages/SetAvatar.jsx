import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";

function SetAvatar() {
  // const api = "https://api.multiavatar.com";
  const navigate = useNavigate();
  // const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const selectedAvatar = undefined;

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
    if (selectedAvatar !== undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = JSON.parse(localStorage.getItem("chat-app-user"));

      try {
        const { data } = await axios.post(
          `${setAvatarRoute}/${user._id}`,
          { image: "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgZmlsbD0ibm9uZSI+PHBhdGggZmlsbD0iI0IyMEYwMyIgZD0iTTE2IDNhMTMgMTMgMCAxIDAgMTMgMTNBMTMuMDE1IDEzLjAxNSAwIDAgMCAxNiAzbTAgMjRhMTEgMTEgMCAxIDEgMTEtMTEgMTEuMDEgMTEuMDEgMCAwIDEtMTEgMTEiLz48cGF0aCBmaWxsPSIjQjIwRjAzIiBkPSJNMTcuMDM4IDE4LjYxNUgxNC44N0wxNC41NjMgOS41aDIuNzgzem0tMS4wODQgMS40MjdxLjY2IDAgMS4wNTcuMzg4LjQwNy4zODkuNDA3Ljk5NCAwIC41OTYtLjQwNy45ODQtLjM5Ny4zOS0xLjA1Ny4zODktLjY1IDAtMS4wNTYtLjM4OS0uMzk4LS4zODktLjM5OC0uOTg0IDAtLjU5Ny4zOTgtLjk4NS40MDYtLjM5NyAxLjA1Ni0uMzk3Ii8+PC9zdmc+" }
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

  // useEffect(() => { 
  //   const fetchAvatars = async () => { 
  //     try{
  //       const data = []; 
  //       for (let i = 0; i < 4; i++) { 
  //         const image = await axios.get(
  //           `${api}/${Math.round(Math.random() * 1000)}`,
  //           { responseType: 'arraybuffer', }
  //         ); 
  //         const buffer = Buffer.from(image.data); 
  //         data.push(buffer.toString('base64')); 
  //         await new Promise(resolve => setTimeout(resolve, 1000)); 
  //       } 
  //       setAvatars(data);
  //     }
  //     catch(error) {
  //       toast.error("Failed to load avatars. Please try again later.", toastOptions);
  //     }
  //     finally {
  //       setIsLoading(false);
  //     }
  //   }
  //  fetchAvatars();  
  // }, [api, toastOptions]); // added api as dependency

  setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>

          {/* This never runs because avatars is empty due to depricated api */}
          {/* <div className="avatars">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`avatar ${
                  selectedAvatar === index ? "selected" : ""
                }`}
                onClick={() => setSelectedAvatar(index)}
              >
                <img
                  src=""
                  alt="avatar"
                />
              </div>
            ))}
          </div> */}

          {/* Loader */}
          <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginTop: "-10px",
                marginLeft: "auto",
                marginRight: "auto",
                color: "#4b5563" // gray-600
              }}
            >
              <span
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  border: "4px solid #4e0eff",
                  borderTop: "3px solid transparent",
                  animation: "spin 1s linear infinite",
                  display: "inline-block"
                }}
              ></span>

              {/* Add keyframes in a <style> tag */}
              <style>
                {`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}
              </style>
            </div>

          <button onClick={setProfilePicture} className="submit-btn">
            Continue without setting avatar
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

export default SetAvatar;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
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
      transition: 0.5s ease-in-out;
      cursor: pointer;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
