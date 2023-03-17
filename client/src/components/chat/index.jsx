import React from "react";
import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
} from "react-chat-engine-advanced";

import Header from "@/components/common/Header";
import StandardMessageForm from "@/components/forms/StandardMessageForm";
import AIChat from "@/components/forms/AIChat";
import AICode from "@/components/forms/AICode";
import AIAssist from "@/components/forms/AIAssist";

const Chat = ({ user, secret }) => {
  const chatProps = useMultiChatLogic(
    import.meta.env.VITE_PROJECT_ID,
    user,
    secret
  );

  return (
    <div style={{ flexBasis: "100%" }}>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow
        {...chatProps}
        style={{ height: "100vh" }}
        renderChatHeader={(chat) => <Header chat={chat} />}
        renderMessageForm={(props) => {
          if (chatProps.chat?.title.includes("AIChat")) {
            return <AIChat props={props} activeChat={chatProps.chat} />;
          }

          if (chatProps.chat?.title.includes("AICode")) {
            return <AICode props={props} activeChat={chatProps.chat} />;
          }

          if (chatProps.chat?.title.includes("AIAssist")) {
            return <AIAssist props={props} activeChat={chatProps.chat} />;
          }

          return (
            <StandardMessageForm props={props} activeChat={chatProps.chat} />
          );
        }}
      />
    </div>
  );
};

export default Chat;
