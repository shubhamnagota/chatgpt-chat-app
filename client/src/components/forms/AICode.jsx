import React, { useState } from "react";

import MessageFormUI from "./MessageFormUI";

import { usePostAiCodeMutation } from "@/state/api";

const AICode = ({ props, activeChat }) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState("");
  const [trigger] = usePostAiCodeMutation();

  const handleSubmit = async () => {
    const date = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);

    const att = attachment ? [{ blob: attachment, file: attachment.name }] : [];
    const form = {
      attachments: att,
      created: date,
      sender_username: props.username,
      text: message,
      activeChatId: activeChat.id,
    };

    props.onSubmit(form);
    trigger(form);
    setMessage("");
    setAttachment("");
  };

  return (
    <MessageFormUI
      message={message}
      setMessage={setMessage}
      setAttachment={setAttachment}
      handleSubmit={handleSubmit}
    />
  );
};

export default AICode;
