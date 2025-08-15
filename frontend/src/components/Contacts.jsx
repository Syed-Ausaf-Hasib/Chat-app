
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";

export default function Contacts({ contacts, currentUser, changeChat }) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage)
            setCurrentUserName(currentUser.username)
        }
        // const runThis = async ()=>{
        //     console.log(contacts)
        //     const data = await JSON.parse(
        //         localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        //     );
        //     setCurrentUserName(data.username);
        //     setCurrentUserImage(data.avatarImage);
        // }
        // runThis()
    }, [currentUser]);
    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };
    return (
        <>
            {
                changeCurrentChat && currentUserName && (
                    <Container>
                        <div className="brand">
                            <img draggable={false} src={Logo} alt="logo"/>
                            <h3>Talksy</h3>
                        </div>
                        <div className="contacts">
                            {contacts.map((contact, index) => {
                                return (
                                    <div
                                        key={contact._id}
                                        className={`contact ${index === currentSelected ? "selected" : ""
                                            }`}
                                        onClick={() => changeCurrentChat(index, contact)}
                                    >
                                        <div className="avatar">
                                            <img
                                                draggable={false}
                                                src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                                alt="avatar"
                                            />
                                        </div>
                                        <div className="username">
                                            <h3>{contact.username}</h3>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="current-user">
                            <div className="avatar">
                                <img draggable={false} src={`data:image/svg+xml;base64,${currentUserImage}`} alt="Avatar" />
                            </div>
                            <div className="username">
                                <h2>{currentUserName}</h2>
                            </div>
                        </div>
                    </Container>
                )
            }
        </>
    );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #2a1d16; /* Deep dark brown */

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 2.5rem;
    }

    h3 {
      color: #f5b039; /* Gold accent */
      text-transform: uppercase;
      cursor: default;
      user-select: none;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;

    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #a67c52; /* Warm brown scrollbar */
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .contact {
      background-color: #120e0bff; /* Transparent rich brown */
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.4rem;
      padding: 0.4rem;
      padding-left: 1rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: border-color 0.3s ease, background-color 0.3s ease;

      &:hover {
        background-color: #2a1d16; /* Gold hover */
      }

      .avatar {
        img {
          height: 3rem;
        }
      }

      .username {
        h3 {
          color: #f5f2e7; /* Light cream text */
        }
      }
    }

    .selected {
      background-color: #2a1d16; /* Warm brown selection */
]    }
  }

  .current-user {
    background-color: #120e0bff; /* Transparent rich brown */
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    border-top: 0.1rem solid #a67c52; /* Warm brown divider */

    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
        border-radius: 0.4rem;
      }
    }

    .username {
      h2 {
        color: #f5f2e7; /* Light cream text */
      }
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
