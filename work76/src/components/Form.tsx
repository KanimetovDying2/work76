import { useState, type ChangeEvent, type FormEvent } from "react";
import { TextField, Button, Box } from "@mui/material";
import type { MessageMutation } from "../types";
import axiosApi from "../axiosApi";

const Form = () => {
  const [formState, setFormState] = useState<MessageMutation>({
    author: "",
    message: "",
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!formState.author.trim() || !formState.message.trim()) {
      alert("Please fill in both fields!");
      return;
    }

    try {
      await axiosApi.post("/messages", formState);
      setFormState({ author: "", message: "" });
    } catch (e) {
      console.error("Error sending message:", e);
      alert("Error. Fail to send message. Check your data and try again.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={submitHandler}
      sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}
    >
      <TextField
        label="Author"
        name="author"
        value={formState.author}
        onChange={changeHandler}
        required
        fullWidth
      />
      <TextField
        label="Message"
        name="message"
        value={formState.message}
        onChange={changeHandler}
        required
        fullWidth
        multiline
        rows={3}
      />
      <Button type="submit" variant="contained" color="primary">
        Send
      </Button>
    </Box>
  );
};

export default Form;
