import { useEffect, useState, useRef } from "react";
import type { Message } from "./types";
import { Box } from "@mui/material";
import axiosApi from "./axiosApi";
import MessageList from "./components/MessageList";
import Form from "./components/Form";

const App = () => {
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const messagesRef = useRef<Message[]>([]);

  useEffect(() => {
    messagesRef.current = allMessages;
  }, [allMessages]);

  useEffect(() => {
    const fetchData = async () => {
      const currentMessages = messagesRef.current;
      const lastMessage = currentMessages[currentMessages.length - 1];
      const url = lastMessage
        ? `/messages?datetime=${lastMessage.datetime}`
        : "/messages";

      const response = await axiosApi.get<Message[]>(url);

      if (response.data.length > 0) {
        setAllMessages((prev) =>
          lastMessage ? [...prev, ...response.data] : response.data,
        );
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          backgroundColor: "white",
          padding: 2,
          zIndex: 1000,
          borderTop: "1px solid #ccc",
        }}
      >
        <Form />
      </Box>
      <MessageList messages={allMessages} />
    </div>
  );
};

export default App;
