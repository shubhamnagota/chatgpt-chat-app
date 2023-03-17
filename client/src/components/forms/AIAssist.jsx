import React, { useEffect, useState } from "react";

import MessageFormUI from "./MessageFormUI";

import { usePostAiAssistMutation } from "@/state/api";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const AIAssist = ({ props, activeChat }) => {
  const [message, setMessage] = useState("");
  const [appendText, setAppendText] = useState("");
  const [attachment, setAttachment] = useState("");
  const [trigger, result] = usePostAiAssistMutation();

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

  const debouncedMessage = useDebounce(message, 1000);

  useEffect(() => {
    if (debouncedMessage) {
      const form = { text: debouncedMessage };
      trigger(form);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedMessage]);

  useEffect(() => {
    if (result.data?.text) {
      setAppendText(result.data?.text);
    }
  }, [result]);

  return (
    <MessageFormUI
      message={message}
      setMessage={setMessage}
      appendText={appendText}
      setAppendText={setAppendText}
      setAttachment={setAttachment}
      handleSubmit={handleSubmit}
    />
  );
};

export default AIAssist;
