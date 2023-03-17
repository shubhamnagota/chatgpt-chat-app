import axios from "axios";

const textController = async (req, res) => {
  try {
    const { text, activeChatId } = req.body;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: text,
      temperature: 0.5,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    await axios.post(
      `https://api.chatengine.io/chats/${activeChatId}/messages/`,
      {
        text: response.data.choices[0].text,
      },
      {
        headers: {
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": process.env.BOT_USER_NAME,
          "User-Secret": process.env.BOT_USER_SECRET,
        },
      },
    );

    return res.status(200).json({ text: response.data.choices[0].text });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const codeController = async (req, res) => {
  try {
    const { text, activeChatId } = req.body;

    const response = await openai.createCompletion({
      model: "code-davinci-002",
      prompt: text,
      temperature: 0.5,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
    console.log("🚀 ~ file: openai.controller.js:51 ~ codeController ~ response:", response);

    await axios.post(
      `https://api.chatengine.io/chats/${activeChatId}/messages/`,
      {
        text: response.data.choices[0].text,
      },
      {
        headers: {
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": process.env.BOT_USER_NAME,
          "User-Secret": process.env.BOT_USER_SECRET,
        },
      },
    );

    return res.status(200).json({ text: response.data.choices[0].text });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const assistController = async (req, res) => {
  try {
    const { text, activeChatId } = req.body;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Finish my thought: ${text}`,
      temperature: 0.5,
      max_tokens: 1024,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
    console.log("🚀 ~ file: openai.controller.js:51 ~ codeController ~ response:", response);

    return res.status(200).json({ text: response.data.choices[0].text });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export { textController, codeController, assistController };
