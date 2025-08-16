import React, { useState } from 'react';
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

function ChatInput({handleSendMsg}) {
    const [showEmoji, setShowEmoji] = useState(false);
    const [msg, setMsg] = useState("");

    const handleEmojiPickerHideShow = () => {
        setShowEmoji(!showEmoji);
    }

    const handleEmojiClick = (emojiObject) => {
        let message = msg;
        message += emojiObject.emoji;
        setMsg(message);
    }

    const sendChat = (event) => {
        event.preventDefault()
        if (msg.length > 0) {
            handleSendMsg(msg)
            setMsg("")
        }
    }

    return (
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
                    {showEmoji && <Picker style={emoji} onEmojiClick={handleEmojiClick} />}
                </div>
            </div>
            <form className="input-container" onSubmit={(e)=>sendChat(e)}>
                <input
                    type="text"
                    placeholder="Type your message here"
                    value={msg}
                    onChange={e => setMsg(e.target.value)}
                />
                <button className="submit">
                    <IoMdSend />
                </button>
            </form>
        </Container>
    );
}
const emoji = {
    position: "absolute",
    top: -500,
    backgroundColor: "#120e0bff",
    borderColor: "#f5b039"
}
const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #2a1d16; /* Deep dark brown */
  padding: 0 2rem;

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }

  .button-container {
    display: flex;
    align-items: center;
    color: #f5f2e7; /* Light cream text */
    gap: 1rem;

    .emoji {
      position: absolute;
      svg {
        font-size: 1.5rem;
        color: #f5b039; /* Gold accent for emoji icon */
        cursor: pointer;
      }

      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #120e0bff; /* Transparent rich brown */
        box-shadow: 0 5px 10px #a67c52; /* Warm brown shadow */
        border-color: #a67c52;

        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #120e0bff;
          width: 5px;
          &-thumb {
            background-color: #f5b039; /* Gold scrollbar */
          }
        }

        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }

        .emoji-search {
          background-color: transparent;
          border-color: #a67c52;
          color: #f5f2e7;
        }

        .emoji-group:before {
          background-color: #120e0bff;
        }
      }
    }
  }

  .input-container {
    width: 100%;
    height: 70%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #120e0bff; /* Transparent rich brown */
    border: 0.1rem solid #a67c52; /* Warm brown border */

    input {
      width: 90%;
      background-color: transparent;
      color: #f5f2e7; /* Light cream text */
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #f5b039; /* Gold selection */
        color: #1a1410; /* Dark text */
      }

      &:focus {
        outline: none;
        border: none;
      }
    }

    button {
      height: 100%;
      padding: 0.6rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #a67c52; /* Warm brown */
      border: none;
      cursor: pointer;
      transition: background-color 0.3s ease;

      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.6rem 1rem;
        svg {
          font-size: 1rem;
        }
      }

      svg {
        font-size: 2rem;
        color: #fff8dc; /* Off-white text */
      }

      &:hover {
        background-color: #f5b039; /* Gold hover */
        svg {
          color: #1a1410; /* Dark icon on gold */
        }
      }
    }
  }
@media screen and (max-width: 720px) {
  grid-template-columns: 10% 90%;
  padding: 0 1rem;

  .input-container {
    gap: 1rem;
    input {
      font-size: 1rem;
    }
    button {
      padding: 0.5rem 1rem;
      svg {
        font-size: 1.5rem;
      }
    }
  }
  
}
`;


export default ChatInput;
