import {
  PaperAirplaneIcon,
  PaperClipIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import Dropzone from "react-dropzone";

const MessageFormUI = ({
  setAttachment,
  message,
  setMessage,
  appendText,
  setAppendText,
  handleSubmit,
}) => {
  const [preview, setPreview] = useState("");

  return (
    <div className="message-form-container">
      {preview && (
        <div className="message-form-preview">
          <img
            src={preview}
            alt="message-form"
            className="message-form-preview-image"
            onLoad={() => URL.revokeObjectURL(preview)}
          />
          <XMarkIcon
            className="message-form-icon-x"
            onClick={() => {
              setPreview("");
              setAttachment("");
            }}
          />
        </div>
      )}

      <div className="message-form">
        <div className="message-form-input-container">
          <input
            type="text"
            className="message-form-input"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                e.preventDefault();
                setMessage(`${message} ${appendText}`);
                setAppendText("");
              }

              if (e.key === "Enter") {
                setPreview("");
                handleSubmit();
              }
            }}
            placeholder="Send a message..."
          />
          {appendText && (
            <input
              className="message-form-assist"
              type={"text"}
              disabled
              value={`${message} ${appendText}`}
            />
          )}
        </div>

        <div className="message-form-icons">
          <Dropzone
            onDropAccepted={".jpg,.jpeg,.png"}
            multiple={false}
            noClick={true}
            onDrop={(attachments) => {
              setAttachment(attachments[0]);
              setPreview(URL.createObjectURL(attachments[0]));
            }}
          >
            {({ getRootProps, getInputProps, open }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <PaperClipIcon
                  className="message-form-icon-clip"
                  onClick={open}
                />
              </div>
            )}
          </Dropzone>

          <hr className="vertical-line" />
          <PaperAirplaneIcon
            className="message-form-icon-airplane"
            onClick={() => {
              setPreview("");
              handleSubmit();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MessageFormUI;
