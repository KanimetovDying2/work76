import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import { Card, CardContent, Typography } from "@mui/material";
import type { Message } from "../types";

dayjs.extend(calendar);

interface Props {
  message: Message;
}

const MessageItem = ({ message }: Props) => {
  const date = dayjs(message.datetime);
  const now = dayjs();

  const formatTemplate = date.year() === now.year() ? "DD.MM HH:mm" : "DD.MM.YYYY HH:mm";
  const formattedDate = dayjs(message.datetime).calendar(null, {
    sameDay: "[Today at] HH:mm",
    nextDay: "[Tomorrow]",
    nextWeek: "dddd",
    lastDay: "[Yesterday at] HH:mm",
    lastWeek: formatTemplate,
    sameElse: formatTemplate,
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
