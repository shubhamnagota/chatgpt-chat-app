import { usePostLoginMutation, usePostSignUpMutation } from "@/state/api";
import React, { useEffect, useState } from "react";

const Login = ({ setUser, setSecret }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [triggerLogin, resultLogin] = usePostLoginMutation();
  const [triggerSignUp] = usePostSignUpMutation();

  const handleLogin = () => {
    triggerLogin({ username, password });
  };

  const handleSignUp = () => {
    triggerSignUp({ username, password });
  };

  useEffect(() => {
    if (resultLogin.data?.response) {
      setUser(username);
      setSecret(password);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultLogin.data]);

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="title">CHAT GPT Chat App</h2>
        <p
          className="register-change"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Already a user?" : "Are you a new user?"}
        </p>

        <div>
          <input
            type="text"
            className="login-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="login-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="login-actions">
          {isRegister ? (
            <button className="button" onClick={handleSignUp}>
              Register
            </button>
          ) : (
            <button className="button" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
