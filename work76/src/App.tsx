import { useEffect, useState, useRef } from "react";
import type { Message } from "./types";
import axiosApi from "./axiosApi";
import MessageList from "./components/MessageList";

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
      <MessageList messages={allMessages} />
    </div>
  );
};

export default App;
