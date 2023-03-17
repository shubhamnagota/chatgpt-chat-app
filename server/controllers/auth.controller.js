import axios from "axios";

const signupController = async (req, res) => {
  try {
    const { username, password: secret } = req.body;

    const { data } = await axios.post(
      `https://api.chatengine.io/users/`,
      {
        username,
        secret,
      },
      {
        headers: {
          "Private-Key": process.env.PROJECT_PRIVATE_KEY,
        },
      },
    );

    return res.status(200).json({ response: data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const loginController = async (req, res) => {
  try {
    const { username, password: secret } = req.body;

    const { data } = await axios.post(
      `https://api.chatengine.io/users/me`,
      {
        username,
        secret,
      },
      {
        headers: {
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": username,
          "User-Secret": secret,
        },
      },
    );

    return res.status(200).json({ response: data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export { signupController, loginController };
