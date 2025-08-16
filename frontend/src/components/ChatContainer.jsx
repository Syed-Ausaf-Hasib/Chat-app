import React, { useState, useEffect, useRef } from 'react'
import styled from "styled-components"
import Logout from "./Logout"
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes"
import ChatInput from './ChatInput';
import axios from "axios"
import { v4 as uuidv4 } from "uuid"

function ChatContainer({ currentChat, currentUser, socket }) {
    const [messages, setMessages] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const scrollRef = useRef()

    useEffect(() => {
        const runThis = async () => {
            if (currentChat) {
                const response = await axios.post(getAllMessagesRoute, {
                    from: currentUser._id,
                    to: currentChat._id,
                })
                setMessages(response.data)
            }
        }
        runThis()
    }, [currentChat, currentUser._id])
    const handleSendMsg = async (msg) => {
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg
        })
        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: currentUser._id,
            message: msg,
        })
        const msgs = [...messages]
        msgs.push({ fromSelf: true, message: msg })
        setMessages(msgs)
    }

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg })
            })
        }
    }, [socket])

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: "smooth" })
    }, [messages])
    return (
        <Container>
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                        <img draggable={false} src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="Avatar" />
                    </div>
                    <div className="username">
                        <h3>
                            {currentChat.username}
                        </h3>
                    </div>
                </div>
                <Logout />
            </div>
            <div className="chat-messages">
                {messages.map((message) => {
                    return (
                        <div ref={scrollRef} key={uuidv4()}>
                            <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
                                <div className="content">
                                    <p>
                                        {message.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
    )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  background-color: rgba(59, 40, 30, 0.3); /* Deep dark brown, slightly transparent */

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 2rem;
    background-color: #120e0bff; /* Transparent rich brown */
    border-bottom: 0.1rem solid #a67c52; /* Warm brown border */
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: #f5b039; /* Gold accent */
        }
      }
    }
  }

  .chat-messages {
    margin-top: 0.5rem;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #f5b03980; /* Gold scrollbar */
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 80%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #f5f2e7; /* Light cream text */
        border: 0.1rem solid #120e0bff; /* Warm brown border */
      }
    }

    .sended {
      justify-content: flex-end;
      .content {
        background-color: #120e0bff; /* Warm brown */
        color: #fff8dc; /* Off-white text */
        &:hover {
          background-color: #2d231bff; /* Gold hover */
          // color: #1a1410; /* Dark text */
          transition: background-color 0.3s ease;
        }
      }
    }

    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #2d231bff; /* Warm brown */
        color: #fff8dc; /* Off-white text */
        &:hover {
          background-color: #120e0bff; /* Gold hover */
          // color: #1a1410; /* Dark text */
          transition: background-color 0.3s ease;
        }
      }
  }
@media screen and (max-width: 720px) {
  .chat-header {
    padding: 1rem;
    .user-details {
      gap: 0.5rem;
      .avatar img {
        height: 2.5rem;
      }
      .username h3 {
        font-size: 1rem;
      }
    }
  }
}
`;


export default ChatContainer
