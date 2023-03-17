import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Chat from "@/components/chat";
import Login from "@/components/login";

function App() {
  const [user, setUser] = useState("");
  const [secret, setSecret] = useState("");

  const isAuth = Boolean(user) && Boolean(secret);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isAuth ? (
                <Navigate to="/chat" />
              ) : (
                <Login setUser={setUser} setSecret={setSecret} />
              )
            }
          />
          <Route
            path="/chat"
            element={
              isAuth ? (
                <Chat user={user} secret={secret} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
