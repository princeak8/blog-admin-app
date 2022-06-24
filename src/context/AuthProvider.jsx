import { createContext, useCallback, useEffect, useState } from "react";

let logoutTimer;

const AuthContext = createContext({
  token: "",
  name: "",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjustedExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjustedExpirationTime - currentTime;

  return remainingDuration;
};

const reteriveStoredToken = () => {
  const storedName = localStorage.getItem("name");
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 60000) {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return { name: storedName, token: storedToken, duration: remainingTime };
};

export const AuthProvider = (props) => {
  const tokenData = reteriveStoredToken();
  let initialToken;
  let initialName;
  if (tokenData) {
    initialToken = tokenData.token;
    initialName = tokenData.name;
  }
  const [token, setToken] = useState(initialToken);
  const [name, setName] = useState(initialName);

  const userIsLoggedIn = !!token;

  const handleLogout = useCallback(() => {
    setToken(null);
    setName("");
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const handleLogin = (name, token, expirationTime) => {
    setToken(token);
    setName(name);
    localStorage.setItem("name", name);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(handleLogout, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(handleLogout, tokenData.duration);
    }
  }, [tokenData, handleLogout]);

  const contextValue = {
    token: token,
    name: name,
    isLoggedIn: userIsLoggedIn,
    login: handleLogin,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
