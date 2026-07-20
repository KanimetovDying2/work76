import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import { Card, CardContent, Typography } from "@mui/material";
import type { Message } from "../types";

dayjs.extend(calendar);

interface Props {
  message: Message;
}

const MessageItem = ({ message }: Props) => {
  const formattedDate = dayjs(message.datetime).calendar(null, {
    sameDay: "[Today at] HH:mm",
    nextDay: "[Tomorrow]",
    nextWeek: "dddd",
    lastDay: "[Yesterday at] HH:mm",
    lastWeek: "DD.MM.YYYY",
    sameElse: "DD.MM.YYYY",
  });
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6" color="primary">
          {message.author}
        </Typography>
        <Typography variant="body1">{message.message}</Typography>
        <Typography variant="caption" color="text.secondary">
          {formattedDate}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MessageItem;
