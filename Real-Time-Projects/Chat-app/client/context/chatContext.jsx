import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios"
import toast, { Toaster } from "react-hot-toast";
import { io } from "socket.io-client"
import { AuthContext } from "./authContext";


export const chatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [unseenMessages, setUnseenMessages] = useState({})

    const { socket, axios } = useContext(AuthContext);

    //Get all users for sidebar
    const getUsers = async () => {
        try {
            const { data } = await axios.get("/api/messages/users");
            if (data.success) {
                setUsers(data.users);
                setUnseenMessages(data.unseenMessages);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //Get messages for selected user
    const getMessages = async (userId) => {
        try {
            const {data}=await axios.get(`/api/messages/${userId}`);
            if (data.success) {
                setMessages(data.messages)
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //To send message to selected user
    const sendMessages = async (messageData) => {
        try {
            const { data } = await axios.post(`/api/messages/send/${selectedUser._id}`, messageData);
            if (data.success) {
                setMessages((prevMessages) => [...prevMessages, data.newMessage])
            } 
        } catch (error) {
            toast.error(error.message);

        }
    }

    //To subscribe to messages for selected user
    const subscribeToMessages = async () => {
        if (!socket) {
            return;
        }
        socket.on("newMessage", (newMessage) => {
            if (selectedUser && newMessage.senderId == selectedUser._id) {
                newMessage.seen = true;
                setMessages((prev) => [...prev, newMessage])
                axios.put(`/api/messages/mark/${newMessage._id}`);
            } else {
                setUnseenMessages((prevUnseenMessages) => ({
                    ...prevUnseenMessages, [newMessage.senderId]: prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages[newMessage.senderId] + 1 : 1
                }))
            }
        })
    }

    //To unsubscribe from messages
    const unsubscribeFromMessages = () => {
        if (socket) socket.off("newMessage");

    }

    useEffect(() => {
        subscribeToMessages();
        return () => unsubscribeFromMessages();
    }, [socket, selectedUser])

    const value = {
        messages, users, selectedUser, getUsers,sendMessages, setSelectedUser, unseenMessages, setUnseenMessages,getMessages
    }
    return (<chatContext.Provider value={value}>
        {children}
    </chatContext.Provider>
    )
}