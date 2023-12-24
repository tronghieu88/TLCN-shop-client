import React, { useEffect } from "react";
import { useState } from "react";
import { AiFillMessage } from "react-icons/ai";
import logo from "../assets/images/logo.svg";
import { MdKeyboardArrowDown } from "react-icons/md";
// import { GoPrimitiveDot } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";
import { DefaultAvt } from "../constants/userConstants";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Server } from "../apis/Api";
import io from "socket.io-client";
import { toDate, toDateNow } from "../utils/format";

var socket;

const Chat = () => {
  const [open, setOpen] = useState(false);
  const { logout, userInfo } = useSelector((state) => state.userLogin);
  // console.log(userInfo?.data?.user?._id);

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [selectedChat, setSelectedChat] = useState("");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo?.data?.access_token}`,
    },
  };
  useEffect(() => {
    // socket = io(`${Server}`)
    // if (userInfo) {
    //   socket.emit('setup', userInfo?.data?.user)
    //   socket.on('connected', () => setSocketConnected(true))
    //   socket.on('typing', () => {
    //     setIsTyping(true)
    //   })
    //   socket.on('stop typing', () => setIsTyping(false))
    // }
  }, [userInfo]);

  // Fetch chat
  useEffect(() => {
    // const fetchChats = async () => {
    //   try {
    //     const { data } = await axios.get(
    //       `${Server}/api/chats/fetchChat`,
    //       config
    //     );
    //     setSelectedChat(await data);
    //     setMessages(await data?.messages);
    //     await socket.emit("join chat", data?.chatId);
    //   } catch (error) {
    //     toast.error("Lỗi Server rồi!", {
    //       position: "top-right",
    //       autoClose: 800,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "light",
    //     });
    //   }
    // };
    // if (userInfo) {
    //   fetchChats();
    // }
  }, []);

  // Send messages
  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat?.chatId);
      try {
        const { data } = await axios.post(
          `${Server}/api/messages`,
          {
            content: newMessage,
            chatId: selectedChat?.chatId,
          },
          config
        );
        setNewMessage("");
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast.error("Lỗi Server rồi bạn ơi!", {
          position: "top-right",
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  //Recieve messages
  useEffect(() => {
    // socket.on("message recieved", (newMessageRecieved) => {
    //   console.log(newMessageRecieved);
    //   setMessages([...messages, newMessageRecieved]);
    // });
  });

  // Typing
  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const handleOpen = () => {
    if (logout) {
      toast.warn("Vui lòng đăng nhập!", {
        position: "top-right",
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  console.log(messages);
  return (
    <>
      {open ? (
        <div class="fixed bottom-0 right-0 top-0 left-0 md:bottom-12 md:right-6 md:left-auto md:top-auto z-20">
          <div class="flex flex-col flex-grow w-full h-screen md:h-auto   md:max-w-2xl md:min-w-[300px] bg-white shadow-xl rounded-lg overflow-hidden">
            {/* Header */}
            <header className="bg-primary-600 px-4 py-2 flex justify-between items-center ">
              <div className="flex items-center ">
                <img src={logo} alt="avt" className="w-10 h-10 mr-2 " />
                <h3 className="text-white">Admin NLH</h3>
              </div>
              <MdKeyboardArrowDown
                className="w-8 h-8 text-white cursor-pointer"
                onClick={() => setOpen(!open)}
              ></MdKeyboardArrowDown>
            </header>
            {/* Content */}
            <div class="flex flex-col flex-grow h-auto md:max-h-[360px] p-4 overflow-auto">
              {messages?.map((mess, i) =>
                mess?.sender?._id !== userInfo?.data?.user?._id ? (
                  <div class="flex w-full mt-2 space-x-3 max-w-xs" key={i}>
                    {/* <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div> */}
                    <img
                      src={
                        mess?.sender?.avatar ? mess?.sender?.avatar?.url : logo
                      }
                      alt="avt"
                      className="w-10 h-10  ring-1 ring-primary-600 rounded-full "
                    />
                    <div>
                      <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                        <p class="text-sm">{mess?.content}</p>
                      </div>
                      <span class="text-xs text-gray-500 leading-none">
                        {toDateNow(mess?.updatedAt)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div
                    class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end"
                    key={i}
                  >
                    <div>
                      <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                        <p class="text-sm">{mess?.content}</p>
                      </div>
                      <span class="text-xs text-gray-500 leading-none">
                        {toDateNow(mess?.updatedAt)}
                      </span>
                    </div>
                    {/* <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div> */}
                    <img
                      src={
                        mess?.sender?.avatar
                          ? mess?.sender?.avatar?.url
                          : DefaultAvt
                      }
                      alt="avt"
                      className="w-10 h-10  ring-1 ring-primary-600 rounded-full "
                    />
                  </div>
                )
              )}
              {istyping && (
                <div className="flex space-x-3 items-center animate-pulse ">
                  {/* <FaUserCircle className="w-6 h-6" /> */}
                  {/* <GoPrimitiveDot className="w-4 h-4  " />
                  <GoPrimitiveDot className="w-4 h-4 " />
                  <GoPrimitiveDot className="w-4 h-4 " />
                  <GoPrimitiveDot className="w-4 h-4" /> */}
                </div>
              )}
            </div>

            {/*Input */}
            <div class="bg-gray-200 p-4 border-t border-gray-400 relative">
              <input
                onKeyDown={sendMessage}
                onChange={typingHandler}
                class="flex items-center h-10 w-full rounded px-3 text-sm "
                type="text"
                placeholder="Nhập tin nhắn…"
                value={newMessage}
              />
              {/* <BsFillSendFill className="absolute top-6 right-6 w-6 h-6 text-primary-600 cursor-pointer"></BsFillSendFill> */}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="fixed bottom-12 right-3 md:right-6 cursor-pointer"
          onClick={handleOpen}
        >
          <AiFillMessage className="text-primary-500 bg-white w-14 h-14 rounded-full p-1 border border-primary-300"></AiFillMessage>
        </div>
      )}
    </>
  );
};

// export default Chat;
