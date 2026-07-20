import { Box } from "@mui/material";
import type { Message } from "../types";
import MessageItem from "./MessageItem";

interface Props {
  messages: Message[];
}

const MessageList = ({ messages }: Props) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </Box>
  );
};

export default MessageList;
